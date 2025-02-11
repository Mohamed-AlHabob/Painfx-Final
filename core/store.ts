import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getAuthTokens, removeAuthTokens } from "./auth"
import api from "./api"
import { ENDPOINTS } from "./config"

interface User {
  id: string
  username: string
  first_name: string
  last_name?: string
  email: string
  role: string
  profile: {
    avatar: string
  }
}

interface GlobalStore {
  user: User | null
  loading: boolean
  isLogged: boolean
  friendList: any[] | null
  requestList: any[] | null
  searchList: any[] | null
  messagesList: any[]
  messagesNext: any | null
  messagesTyping: any | null
  messagesFriendId: string | null
  socket: WebSocket | null
  fetchUser: () => Promise<void>
  refetch: () => Promise<void>
  socketConnect: () => Promise<void>
  socketClose: () => void
  searchUsers: (query: string) => void
  requestAccept: (userId: string) => void
  requestConnect: (userId: string) => void
  messageList: (connectionId: string, page?: number) => void
  messageSend: (connectionId: string, message: string) => void
  messageType: (userId: string) => void
  uploadThumbnail: (file: { base64: string; fileName: string }) => void
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      isLogged: false,
      friendList: null,
      requestList: null,
      searchList: null,
      messagesList: [],
      messagesNext: null,
      messagesTyping: null,
      messagesFriendId: null,
      socket: null,

      fetchUser: async () => {
        try {
          set({ loading: true })
          const { access } = await getAuthTokens()
          if (!access) {
            set({ user: null, isLogged: false })
            return
          }
          const response = await api.get(ENDPOINTS.USER_PROFILE)
          set({ user: response.data, isLogged: true })
        } catch (error) {
          console.error("Error fetching user:", error)
          await removeAuthTokens()
          set({ user: null, isLogged: false })
        } finally {
          set({ loading: false })
        }
      },

      refetch: async () => {
        await get().fetchUser()
      },

      socketConnect: async () => {
        try {
          const tokens = await getAuthTokens()
          if (!tokens?.access) {
            console.error("Missing access token for WebSocket")
            return
          }

          const url = `wss://${ENDPOINTS.WS_URL}/ws/chat/?token=${tokens.access}`
          const socket = new WebSocket(url)

          socket.onopen = () => {
            console.log("WebSocket connected")
            socket.send(JSON.stringify({ source: "request.list" }))
            socket.send(JSON.stringify({ source: "friend.list" }))
          }

          socket.onmessage = (event) => {
            const parsed = JSON.parse(event.data)
            const responses: { [key: string]: (data: any) => void } = {
              "friend.list": (data) => set({ friendList: data }),
              "message.list": (data) =>
                set({
                  messagesList: [...get().messagesList, ...data.messages],
                  messagesNext: data.next,
                  messagesFriendId: data.friend.id,
                }),
              "message.send": (data) => {
                if (data.friend.id !== get().messagesFriendId) return
                set({ messagesList: [data.message, ...get().messagesList], messagesTyping: null })
              },
              "message.type": (data) => set({ messagesTyping: data.userId }),
              "request.list": (data) => set({ requestList: data }),
              search: (data) => set({ searchList: data }),
              thumbnail: (data) => set({ user: data }),
            }

            const handler = responses[parsed.source]
            if (handler) handler(parsed.data)
          }

          socket.onerror = (e) => console.error("WebSocket error:", e)
          socket.onclose = () => {
            console.log("WebSocket connection closed")
            set({ socket: null })
          }

          set({ socket })
        } catch (error) {
          console.error("WebSocket connection failed:", error)
          set({ socket: null })
        }
      },

      socketClose: () => {
        const socket = get().socket
        if (socket) {
          socket.close()
          set({ socket: null })
        }
      },

      searchUsers: (query) => {
        if (query) {
          get().socket?.send(JSON.stringify({ source: "search", query }))
        } else {
          set({ searchList: null })
        }
      },

      requestAccept: (userId) => {
        get().socket?.send(JSON.stringify({ source: "request.accept", userId }))
      },

      requestConnect: (userId) => {
        get().socket?.send(JSON.stringify({ source: "request.connect", userId }))
      },

      messageList: (connectionId, page = 0) => {
        if (page === 0) {
          set({ messagesList: [], messagesNext: null, messagesTyping: null, messagesFriendId: null })
        } else {
          set({ messagesNext: null })
        }
        get().socket?.send(JSON.stringify({ source: "message.list", connectionId, page }))
      },

      messageSend: (connectionId, message) => {
        get().socket?.send(JSON.stringify({ source: "message.send", connectionId, message }))
      },

      messageType: (userId) => {
        get().socket?.send(JSON.stringify({ source: "message.type", userId }))
      },

      uploadThumbnail: (file) => {
        get().socket?.send(JSON.stringify({ source: "thumbnail", base64: file.base64, filename: file.fileName }))
      },
    }),
    {
      name: "chat-app-storage",
      getStorage: () => localStorage,
    },
  ),
)

