import SideCategoryBar from '@/components/layout/SideCategoryBar'
import ProductCard from '@/components/product/ProductCard'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import Navbar from '../../components/layout/Navbar'

// 分類 id 對應名稱
const CATEGORY_MAP: Record<string, string> = {
  '1': '多肉植物',
  '2': '景觀植物',
  '3': '觀花植物',
  '4': '盆器',
  '5': '觀葉植物',
  '6': '香草',
  '7': '仙人掌',
  '8': '特殊品種',
  '9': '工具',
  '10': '可以吃',
  '11': '種子',
  '12': '養不死',
}

// 與首頁一致的分類資料
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

// 產生 100 筆混合假資料（隨機筆記/產品卡片，含分類 id）
const heights = [200, 220, 240, 180, 260, 210, 230, 250]
function generateFeed(total: number) {
  const feed = []
  for (let i = 0; i < total; i++) {
    // 隨機分配分類 id
    const categoryId = categories[Math.floor(Math.random() * categories.length)].id
    if (Math.random() > 0.5) {
      // 筆記卡片
      feed.push({
        id: `n${i}`,
        type: 'note',
        categoryId,
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
        categoryId,
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
const CARD_WIDTH = undefined // 讓 flex:1 自適應
const CARD_HEIGHT = 140

export default function MarketScreen() {
  // 取得網址參數 category
  const params = useLocalSearchParams()
  const router = useRouter()
  // 狀態：當前選中分類，預設第一個
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)
  const categoryName = CATEGORY_MAP[selectedCategory] || '全部分類'

  // 點擊分類時用 setSelectedCategory 切換
  const categoriesWithOnPress = categories.map(cat => ({
    ...cat,
    onPress: () => setSelectedCategory(cat.id)
  }))

  // 產生全部假資料
  const [allFeed] = useState(generateFeed(TOTAL))
  // 只顯示產品卡片
  const filteredFeed = useMemo(
    () =>
      selectedCategory
        ? allFeed.filter(item => item.categoryId === selectedCategory && item.type === 'product')
        : allFeed.filter(item => item.type === 'product'),
    [allFeed, selectedCategory]
  )
  // 分頁狀態
  const [displayFeed, setDisplayFeed] = useState(filteredFeed.slice(0, PAGE_SIZE))
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // 分類切換時自動刷新內容
  React.useEffect(() => {
    setDisplayFeed(filteredFeed.slice(0, PAGE_SIZE))
    setPage(1)
  }, [filteredFeed])

  // 滾動到底時載入更多
  const loadMore = useCallback(() => {
    if (loading) return
    if (displayFeed.length >= filteredFeed.length) return
    setLoading(true)
    setTimeout(() => {
      const nextPage = page + 1
      setDisplayFeed(filteredFeed.slice(0, nextPage * PAGE_SIZE))
      setPage(nextPage)
      setLoading(false)
    }, 500)
  }, [loading, displayFeed, filteredFeed, page])

  // FlatList 渲染卡片，僅產品，統一尺寸，無圓角，邊距縮小
  // 商品牆區塊：顯示當前分類下的所有商品，兩欄排列，支援分批載入
  // - CARD_WIDTH/CARD_HEIGHT 控制卡片尺寸
  // - renderItem 只渲染產品卡片
  // - filteredFeed 只包含 type='product' 的資料
  // - FlatList numColumns=2，確保兩欄自適應
  // - contentContainerStyle 控制整體邊界與底部留白
  // - ListHeaderComponent 顯示分類標題
  // - onEndReached 實現無限滾動
  const renderItem = ({ item }: { item: any }) => (
    <View style={{
      flex: 1,
      minWidth: 0,
      margin: 4,
      overflow: 'hidden',
      backgroundColor: '#fff',
      alignSelf: 'stretch',
    }}>
      <ProductCard
        id={item.id}
        title={item.title}
        image={item.image}
        price={item.price}
        seller={item.seller}
        onClick={() => router.push(`/marketplace/${item.id}`)}
        borderRadius={12}
      />
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Navbar title="分類" />
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* 左側側邊欄 */}
        <SideCategoryBar
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {/* 右側內容區，paddingLeft: 0，確保 FlatList 貼齊側邊欄 */}
        <View style={{ flex: 1, paddingLeft: 0, backgroundColor: '#fff' }}>
          <FlatList
            data={displayFeed}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            numColumns={2}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListHeaderComponent={
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#14532d', marginVertical: 16, alignSelf: 'center' }}>
                {categoryName}
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 8 }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
} 