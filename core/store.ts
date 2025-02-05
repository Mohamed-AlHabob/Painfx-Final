import { create } from "zustand";
import { getAuthTokens, removeAuthTokens } from "./auth";
import api from "./api";
import { ENDPOINTS } from "./config";

interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  role: string;
  profile: {
    avatar: string;
  };
}

interface GlobalStore {
  user: User | null;
  loading: boolean;
  isLogged: boolean;
  fetchUser: () => Promise<void>;
  refetch: () => Promise<void>;
  friendList: any[] | null;
  requestList: any[] | null;
  searchList: any[] | null;
  messagesList: any[];
  messagesNext: any | null;
  messagesTyping: any | null;
  messagesUsername: string | null;
  socket: WebSocket | null;
  socketConnect: () => Promise<void>;
  socketClose: () => void;
  searchUsers: (query: string) => void;
  requestAccept: (username: string) => void;
  requestConnect: (username: string) => void;
  messageList: (connectionId: string, page?: number) => void;
  messageSend: (connectionId: string, message: string) => void;
  messageType: (username: string) => void;
  uploadThumbnail: (file: { base64: string; fileName: string }) => void;
}

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  user: null,
  loading: true,
  isLogged: false,
  friendList: null,
  requestList: null,
  searchList: null,
  messagesList: [],
  messagesNext: null,
  messagesTyping: null,
  messagesUsername: null,
  socket: null,

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
        const responses = {
          "friend.list": (data: any) => set({ friendList: data }),
          "message.list": (data: any) => set({
            messagesList: [...get().messagesList, ...data.messages],
            messagesNext: data.next,
            messagesUsername: data.friend.username,
          }),
          "message.send": (data: any) => {
            if (data.friend.username !== get().messagesUsername) return;
            set({ messagesList: [data.message, ...get().messagesList], messagesTyping: null });
          },
          "message.type": () => set({ messagesTyping: new Date() }),
          "request.list": (data: any) => set({ requestList: data }),
          "search": (data: any) => set({ searchList: data }),
          "thumbnail": (data: any) => set({ user: data }),
        };

        const handler = responses[parsed.source];
        if (handler) handler(parsed.data);
      };

      socket.onerror = (e) => console.error("WebSocket error:", e.message);
      socket.onclose = () => {
        console.log("WebSocket connection closed");
        set({ socket: null });
      };

      set({ socket });
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

  searchUsers: (query) => {
    if (query) {
      get().socket?.send(JSON.stringify({ source: "search", query }));
    } else {
      set({ searchList: null });
    }
  },

  requestAccept: (username) => {
    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({ source: "request.accept", username }));
    }
  },

  requestConnect: (username) => {
    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({ source: "request.connect", username }));
    }
  },

  messageList: (connectionId, page = 0) => {
    if (page === 0) {
      set({ messagesList: [], messagesNext: null, messagesTyping: null, messagesUsername: null });
    } else {
      set({ messagesNext: null });
    }
    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({ source: "message.list", connectionId, page }));
    }
  },

  messageSend: (connectionId, message) => {
    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({ source: "message.send", connectionId, message }));
    }
  },

  messageType: (username) => {
    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({ source: "message.type", username }));
    }
  },

  uploadThumbnail: (file) => {
    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({ source: "thumbnail", base64: file.base64, filename: file.fileName }));
    }
  },
}));
