import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { getAuthTokens, removeAuthTokens } from "./auth";
import api from "./api";
import { ENDPOINTS } from "./config";
import { User, Message, Friend, Request, Search } from "./types";
import { get, set, del } from 'idb-keyval';
import NetInfo from '@react-native-community/netinfo';

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, 'has been retrieved');
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, 'with value', value, 'has been saved');
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, 'has been deleted');
    await del(name);
  },
};

interface AuthState {
  user: User | null;
  isLogged: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchUser: () => Promise<void>;
  refetch: () => Promise<void>;
}

interface SocketState {
  socket: WebSocket | null;
  socketConnect: () => Promise<void>;
  socketClose: () => void;
}

interface MessageState {
  messagesList: Message[];
  messagesNext: string | null;
  messagesTyping: string | null;
  messagesFriendId: string | null;
  messageList: (connectionId: string, page?: number) => void;
  messageSend: (connectionId: string, message: string) => void;
  messageType: (userId: string) => void;
}

interface FriendState {
  friendList: Friend[] | null;
  requestList: Request[] | null;
  searchList: Search[] | null;
  searchUsers: (query: string) => void;
  requestAccept: (userId: string) => void;
  requestConnect: (userId: string) => void;
}

interface GlobalStore extends AuthState, SocketState, MessageState, FriendState {
  uploadThumbnail: (file: { base64: string; fileName: string }) => void;
}

// Create the global store
export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      // Auth State
      user: null,
      isLogged: false,
      loading: true,
      setLoading: (loading) => set({ loading }),
      fetchUser: async () => {
        try {
          set({ loading: true });
          const { access } = await getAuthTokens();
          if (!access) {
            set({ user: null, isLogged: false });
            return;
          }
          const response = await api.get(ENDPOINTS.USER_PROFILE);
          set({ user: response.data, isLogged: true });
        } catch (error) {
          console.error("Error fetching user:", error);
          await removeAuthTokens();
          set({ user: null, isLogged: false });
        } finally {
          set({ loading: false });
        }
      },
      refetch: async () => {
        await get().fetchUser();
      },

      // Socket State
      socket: null,
      socketConnect: async () => {
        try {
          const tokens = await getAuthTokens();
          if (!tokens?.access) {
            console.error("Missing access token for WebSocket");
            return;
          }

          const url = `wss://${ENDPOINTS.WS_URL}/ws/chat/?token=${tokens.access}`;
          const socket = new WebSocket(url);

          socket.onopen = () => {
            console.log("WebSocket connected");
            socket.send(JSON.stringify({ source: "request.list" }));
            socket.send(JSON.stringify({ source: "friend.list" }));
          };

          socket.onmessage = (event) => {
            const parsed = JSON.parse(event.data);
            const responses: { [key: string]: (data: any) => void } = {
              "friend.list": (data) => set({ friendList: data }),
              "message.list": (data) =>
                set({
                  messagesList: [...get().messagesList, ...data.messages],
                  messagesNext: data.next,
                  messagesFriendId: data.friend.id,
                }),
              "message.send": (data) => {
                if (data.friend.id !== get().messagesFriendId) return;
                set({ messagesList: [data.message, ...get().messagesList], messagesTyping: null });
              },
              "message.type": (data) => set({ messagesTyping: data.userId }),
              "request.list": (data) => set({ requestList: data }),
              search: (data) => set({ searchList: data }),
              thumbnail: (data) => set({ user: data }),
            };

            const handler = responses[parsed.source];
            if (handler) handler(parsed.data);
          };

          socket.onerror = (e) => console.error("WebSocket error:", e);
          socket.onclose = () => {
            console.log("WebSocket connection closed");
            set({ socket: null });
          };

          set({ socket });

          // Add network listener for WebSocket reconnection
          NetInfo.addEventListener(state => {
            if (state.isConnected && !get().socket) {
              get().socketConnect();
            }
          });
        } catch (error) {
          console.error("WebSocket connection failed:", error);
          set({ socket: null });
        }
      },
      socketClose: () => {
        const socket = get().socket;
        if (socket) {
          socket.close();
          set({ socket: null });
        }
      },

      // Message State
      messagesList: [],
      messagesNext: null,
      messagesTyping: null,
      messagesFriendId: null,
      messageList: (connectionId, page = 0) => {
        if (page === 0) {
          set({ messagesList: [], messagesNext: null, messagesTyping: null, messagesFriendId: null });
        } else {
          set({ messagesNext: null });
        }
        get().socket?.send(JSON.stringify({ source: "message.list", connectionId, page }));
      },
      messageSend: (connectionId, message) => {
        get().socket?.send(JSON.stringify({ source: "message.send", connectionId, message }));
      },
      messageType: (userId) => {
        get().socket?.send(JSON.stringify({ source: "message.type", userId }));
      },

      // Friend State
      friendList: null,
      requestList: null,
      searchList: null,
      searchUsers: (query) => {
        if (query) {
          get().socket?.send(JSON.stringify({ source: "search", query }));
        } else {
          set({ searchList: null });
        }
      },
      requestAccept: (userId) => {
        get().socket?.send(JSON.stringify({ source: "request.accept", userId }));
      },
      requestConnect: (userId) => {
        get().socket?.send(JSON.stringify({ source: "request.connect", userId }));
      },

      // Thumbnail Upload
      uploadThumbnail: (file) => {
        get().socket?.send(JSON.stringify({ source: "thumbnail", base64: file.base64, filename: file.fileName }));
      },
    }),
    {
      name: "PainFXStorage",
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        user: state.user || null,
        isLogged: state.isLogged || false,
        loading: state.loading || false,
      }),
    },
  ),
);