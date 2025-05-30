import { Post } from '@/lib/types/post'
import React from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import PostCard from './PostCard'

/**
 * 貼文列表元件
 * @param posts 貼文資料陣列
 * @param refreshing 是否正在刷新
 * @param onRefresh 下拉刷新回調
 * @param onEndReached 滾動到底回調（分頁載入）
 */
export default function PostList({
  posts,
  refreshing,
  onRefresh,
  onEndReached,
}: {
  posts: Post[]
  refreshing?: boolean
  onRefresh?: () => void
  onEndReached?: () => void
}) {
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PostCard post={item} />}
      contentContainerStyle={{ paddingBottom: 24 }}
      refreshControl={
        onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} /> : undefined
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<View style={{ alignItems: 'center', marginTop: 40 }}><Text>暫無貼文</Text></View>}
    />
  )
} 