import { Post } from '@/lib/types/post'

export type Category = '全部' | '多肉' | '陽台' | '推薦' | '經驗' | '分享'

export const fakePosts: (Post & { category: Category })[] = [
  {
    id: '1',
    type: 'post',
    author: { id: 'u1', name: '小綠', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    title: '新手入坑多肉植物心得',
    content: '這是我第一盆多肉，超級療癒！歡迎大家留言交流～',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6'],
    tags: ['多肉', '新手'],
    createdAt: '2024-06-10T10:00:00Z',
    likes: 12,
    comments: 3,
    category: '多肉',
  },
  {
    id: '2',
    type: 'note',
    author: { id: 'u2', name: '花花', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    title: '陽台花園改造紀錄',
    content: '改造前後對比，種植心得分享。',
    images: ['https://images.unsplash.com/photo-1519125323398-675f0ddb6308'],
    tags: ['陽台', '改造'],
    createdAt: '2024-06-09T15:30:00Z',
    likes: 8,
    comments: 2,
    category: '陽台',
  },
  {
    id: '3',
    type: 'share',
    author: { id: 'u3', name: '陶陶', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    title: '我的最愛植物TOP3',
    content: '分享一下我最愛的三種植物，歡迎補充！',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    ],
    tags: ['分享', '推薦'],
    createdAt: '2024-06-08T20:10:00Z',
    likes: 20,
    comments: 5,
    category: '推薦',
  },
  // 更多假資料...
] 