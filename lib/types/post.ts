// 社群/討論/筆記/分享通用型別
export type Post = {
  id: string
  type: 'post' | 'note' | 'share'
  author: { id: string; name: string; avatar: string }
  title: string
  content: string
  images?: string[]
  tags?: string[]
  createdAt: string
  likes: number
  comments: number
} 