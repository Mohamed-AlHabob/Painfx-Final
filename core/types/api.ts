export interface UserProfileSerializer {
    id: number
    phone_number: string
    address: string
    gender: string
    avatar: string | null
    longitude: number
    latitude: number
  }
  
  export interface UserSerializer {
    id: number
    email: string
    role: string
    first_name: string
    last_name: string
    username: string
    is_active: boolean
    last_login: string
    profile: UserProfileSerializer
  }
  
  export interface SearchSerializer extends UserSerializer {
    status: "pending-them" | "pending-me" | "connected" | "no-connection"
  }
  
  export interface RequestSerializer {
    id: number
    sender: UserSerializer
    receiver: UserSerializer
    created_at: string
  }
  
  export interface FriendSerializer {
    id: number
    friend: UserSerializer
    preview: string
    updated_at: string
  }
  
  export interface MessageSerializer {
    id: number
    is_me: boolean
    text: string
    unread: boolean
    user: UserSerializer
    created_at: string
  }
  
  