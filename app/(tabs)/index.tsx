import Banner from '@/components/layout/Banner'
import CategoryQuickEntry from '@/components/layout/CategoryQuickEntry'
import GuessYouLikeList from '@/components/layout/GuessYouLikeList'
import HotTags from '@/components/layout/HotTags'
import ProductCard from '@/components/product/ProductCard'
import NoteCard from '@/components/ui/NoteCard'
import MasonryList from '@react-native-seoul/masonry-list'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import Navbar from '../../components/layout/Navbar'

// 僅保留首頁 header 所需假資料
  const banners = [
    { id: '1', image: require('../../assets/images/react-logo.png') },
    { id: '2', image: require('../../assets/images/partial-react-logo.png') },
    { id: '3', image: require('../../assets/images/splash-icon.png') },
  ]
  const categories = [
    { id: '1', name: '多肉植物', icon: require('../../assets/images/icon.png') },
    { id: '2', name: '景觀植物', icon: require('../../assets/images/adaptive-icon.png') },
  { id: '3', name: '觀花植物', icon: require('../../assets/images/favicon.png') },
    { id: '4', name: '盆器', icon: require('../../assets/images/splash-icon.png') },
  { id: '5', name: '觀葉植物', icon: require('../../assets/images/react-logo.png') },
    { id: '6', name: '香草', icon: require('../../assets/images/partial-react-logo.png') },
    { id: '7', name: '仙人掌', icon: require('../../assets/images/icon.png') },
    { id: '8', name: '特殊品種', icon: require('../../assets/images/adaptive-icon.png') },
    { id: '9', name: '工具', icon: require('../../assets/images/favicon.png') },
  { id: '10', name: '可以吃', icon: require('../../assets/images/splash-icon.png') },
    { id: '11', name: '種子', icon: require('../../assets/images/react-logo.png') },
  { id: '12', name: '養不死', icon: require('../../assets/images/partial-react-logo.png') },
  ]
  const tags = [
    { id: '1', label: '熱門', active: true },
    { id: '2', label: '新上架' },
    { id: '3', label: '特價' },
    { id: '4', label: '稀有' },
  ]
  const guessYouLike = [
  { id: '1', title: '猜你喜歡1', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6', price: 100, seller: { name: '小綠', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' } },
  { id: '2', title: '猜你喜歡2', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99', price: 200, seller: { name: '花花', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' } },
  { id: '3', title: '猜你喜歡3', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe', price: 300, seller: { name: '阿盆', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' } },
  { id: '4', title: '猜你喜歡4', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', price: 400, seller: { name: '陶陶', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' } },
  { id: '5', title: '猜你喜歡5', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b', price: 500, seller: { name: '小新', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' } },
]

// 筆記假資料
const notes = [
  {
    id: 'n1',
    type: 'note',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    nickname: '花花',
    cover: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80',
    content: '今天的多肉超美，陽光剛剛好！',
    height: 220,
  },
  {
    id: 'n2',
    type: 'note',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    nickname: '阿盆',
    cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    content: '新入手的花盆，超級療癒。',
    height: 200,
  },
  {
    id: 'n3',
    type: 'note',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    nickname: '陶陶',
    cover: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    content: '陽台花園改造完成，歡迎來參觀！',
    height: 240,
  },
]
// 產品卡片假資料
const productCards = [
  {
    id: 'p1',
    type: 'product',
    title: '療癒小盆栽',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: 180,
    seller: { name: '小明', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    height: 200,
  },
  {
    id: 'p2',
    type: 'product',
    title: '多肉植物組合',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    price: 250,
    seller: { name: '小明', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    height: 220,
  },
  {
    id: 'p3',
    type: 'product',
    title: '陽台花園套組',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 320,
    seller: { name: '小明', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    height: 240,
  },
]
// 混合並隨機排序
const mixedFeed: Array<
  | (typeof notes[number])
  | (typeof productCards[number])
> = [...notes, ...productCards].sort(() => Math.random() - 0.5)

// 30張植物圖片 Unsplash
const plantImages = [
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
]

// 產生 100 筆混合假資料（隨機筆記/產品卡片）
const heights = [200, 220, 240, 180, 260, 210, 230, 250]
function generateFeed(total: number) {
  const feed = []
  for (let i = 0; i < total; i++) {
    if (Math.random() > 0.5) {
      // 筆記卡片
      feed.push({
        id: `n${i}`,
        type: 'note',
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${10 + (i % 80)}.jpg`,
        nickname: `用戶${i + 1}`,
        cover: plantImages[i % plantImages.length] + '?auto=format&fit=crop&w=400&q=80',
        content: `這是第${i + 1}則植物筆記，內容豐富有趣。`,
        height: heights[Math.floor(Math.random() * heights.length)],
      })
    } else {
      // 產品卡片
      feed.push({
        id: `p${i}`,
        type: 'product',
        title: `植物商品${i + 1}`,
        image: plantImages[(i + 5) % plantImages.length] + '?auto=format&fit=crop&w=400&q=80',
        price: 100 + Math.floor(Math.random() * 500),
        seller: { name: `賣家${i + 1}`, avatar: `https://randomuser.me/api/portraits/men/${20 + (i % 60)}.jpg` },
        height: heights[Math.floor(Math.random() * heights.length)],
      })
    }
  }
  return feed
}

const PAGE_SIZE = 25
const TOTAL = 100

// 定義 FeedItem 型別，避免 any
interface FeedItem {
  id: string
  type: 'note' | 'product'
  [key: string]: any
}

export default function HomeScreen() {
  const router = useRouter()
  // 分頁狀態
  const [allFeed] = useState(generateFeed(TOTAL))
  const [displayFeed, setDisplayFeed] = useState(allFeed.slice(0, PAGE_SIZE))
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // 滾動到底時載入更多
  const loadMore = useCallback(() => {
    if (loading) return
    if (displayFeed.length >= allFeed.length) return
    setLoading(true)
    setTimeout(() => {
      const nextPage = page + 1
      setDisplayFeed(allFeed.slice(0, nextPage * PAGE_SIZE))
      setPage(nextPage)
      setLoading(false)
    }, 500)
  }, [loading, displayFeed, allFeed, page])

  // 包裝分類資料，點擊時跳轉到 /market?category=xxx
  const categoriesWithOnPress = categories.map(cat => ({
    ...cat,
    onPress: () => router.push(`/market?category=${cat.id}`)
  }))

  // debug: 輸出目前顯示資料
  console.log('displayFeed', displayFeed)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 導覽列，固定在最上方 */}
      <Navbar />
      <MasonryList
        data={displayFeed}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item, i }) => {
          const feedItem = item as FeedItem
          if (feedItem.type === 'note') {
            return (
              <NoteCard
                avatar={feedItem.avatar}
                nickname={feedItem.nickname}
                cover={feedItem.cover}
                content={feedItem.content}
                borderRadius={0}
              />
            )
          } else {
            return (
              <ProductCard
                id={feedItem.id}
                title={feedItem.title}
                image={feedItem.image}
                price={feedItem.price}
                seller={feedItem.seller}
                height={feedItem.height}
                onClick={() => router.push(`/marketplace/${feedItem.id}`)}
                borderRadius={0}
              />
            )
          }
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View>
            <Banner banners={banners} />
            <CategoryQuickEntry categories={categoriesWithOnPress} />
            <GuessYouLikeList data={guessYouLike} onItemPress={(id: string) => router.push(`/marketplace/${id}`)} />
            <HotTags tags={tags} />
          </View>
        }
      />
    </SafeAreaView>
  )
}
