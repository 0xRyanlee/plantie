export interface UserProfile {
  id: string
  email: string
  name: string
  avatar_url?: string
  bio?: string
  created_at: string
}

export interface Product {
  id: string
  title: string
  description: string
  image_url: string
  price: number
  seller_id: string
  created_at: string
}

export interface Order {
  id: string
  buyer_id: string
  product_id: string
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  created_at: string
}

export interface ChatMessage {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}

export interface Post {
  id: string
  author_id: string
  title: string
  content: string
  created_at: string
} 