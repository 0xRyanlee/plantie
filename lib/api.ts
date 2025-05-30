import { supabase } from './supabase'

// 用戶
export async function fetchUserProfile(id: string) {
  return supabase.from('profiles').select('*').eq('id', id).single()
}

// 商品
export async function fetchProducts() {
  return supabase.from('products').select('*').order('created_at', { ascending: false })
}

// 訂單
export async function fetchOrders(userId: string) {
  return supabase.from('orders').select('*').or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
}

// 聊天
export async function fetchChatMessages(userId: string, peerId: string) {
  return supabase.from('messages').select('*').or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
}

// 貼文
export async function fetchPosts() {
  return supabase.from('posts').select('*').order('created_at', { ascending: false })
} 