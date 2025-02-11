export interface UserProfile {
    phone_number: string
    address: string
    gender: string
    avatar: string | null
    longitude: number
    latitude: number
  }
  
  export interface User {
    id: string
    email: string
    role: string
    first_name: string
    last_name: string
    username: string
    is_active: boolean
    last_login: string
    profile: UserProfile
  }
  
  export interface Search extends User {
    status: "pending-them" | "pending-me" | "connected" | "no-connection"
  }
  
  export interface Request {
    id: string
    sender: User
    receiver: User
    created_at: string
  }
  
  export interface Friend {
    id: string
    friend: User
    preview: string
    updated_at: string
  }
  
  export interface Message {
    id: string
    is_me: boolean
    text: string
    unread: boolean
    user: User
    created_at: string
  }
  
  