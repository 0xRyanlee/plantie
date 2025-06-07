import { useRouter } from 'expo-router'
import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import MasonryList from 'react-native-masonry-list'
import PostCard from './PostCard'

/**
 * 貼文列表元件（MasonryList + PostCard 版）
 * @param posts 貼文資料陣列
 * @param refreshing 是否正在刷新
 * @param onRefresh 下拉刷新回調
 */
export default function PostList({
  posts,
  refreshing,
  onRefresh,
}: {
  posts: any[]
  refreshing?: boolean
  onRefresh?: () => void
}) {
  // 取得 router 實例
  const router = useRouter()
  // 點擊卡片跳轉詳情頁
  const handlePress = (id: string) => {
    router.push(`/community/${id}`)
  }
  // 響應式：最小寬度 375，平板最大 700
  const screenWidth = Math.min(Dimensions.get('window').width, 700)
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 4 }}>
      <MasonryList
        images={posts}
        columns={screenWidth > 500 ? 3 : 2}
        spacing={8}
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        renderIndividualHeader={undefined}
        renderIndividualFooter={undefined}
        completeCustomComponent={(item: any) => (
          <PostCard post={item} onPress={handlePress} />
        )}
        ListEmptyComponent={<View style={{ alignItems: 'center', marginTop: 60 }}><Text style={{ color: '#6b7280', fontSize: 16 }}>目前尚無貼文，快來分享第一篇吧！</Text></View>}
        style={{ minWidth: 375, maxWidth: 700, alignSelf: 'center' }}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  )
} 