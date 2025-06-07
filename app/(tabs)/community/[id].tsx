import { fakePosts } from '@/features/community/fake-posts'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/**
 * 貼文詳情頁
 * - 顯示完整貼文內容、多圖預覽、標籤
 * - 顯示留言串（假資料）
 * - 支援返回上一頁
 */
export default function PostDetailScreen() {
  // 取得路由參數 id
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  // 取得貼文資料（假資料）
  const post = fakePosts.find(p => p.id === id)
  if (!post) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>找不到貼文</Text></View>

  // 假留言串資料（本地）
  const comments: { author: string; content: string }[] = [
    { author: '小綠', content: '好棒的分享！' },
    { author: '花花', content: '多肉真的超療癒～' },
    { author: '陶陶', content: '期待更多經驗文！' },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 返回按鈕 */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} accessibilityLabel="返回">
        <Ionicons name="chevron-back" size={28} color="#14532d" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 多圖預覽 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {(post.images ?? []).map(uri => (
            <Image key={uri} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>
        {/* 標題與內容 */}
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
        {/* 標籤 */}
        <Text style={styles.tags}>{(post.tags ?? []).map(t => `#${t}`).join(' ')}</Text>
        {/* 作者資訊 */}
        <View style={styles.authorRow}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
          <Text style={styles.authorName}>{post.author.name}</Text>
        </View>
        {/* 留言串（假資料） */}
        <Text style={styles.commentTitle}>留言</Text>
        <View style={styles.commentList}>
          {comments.length ? comments.map((c, i) => (
            <View key={i} style={styles.commentItem}>
              <Text style={styles.commentAuthor}>{c.author}</Text>
              <Text style={styles.commentContent}>{c.content}</Text>
            </View>
          )) : <Text style={{ color: '#6b7280' }}>暫無留言</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 12,
    zIndex: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    padding: 4,
  },
  container: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  image: {
    width: 180,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#14532d',
    marginBottom: 8,
  },
  content: {
    color: '#374151',
    fontSize: 16,
    marginBottom: 8,
  },
  tags: {
    color: '#10b981',
    fontSize: 15,
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    color: '#14532d',
  },
  commentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#14532d',
    marginBottom: 8,
  },
  commentList: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 12,
  },
  commentItem: {
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#14532d',
    fontSize: 13,
  },
  commentContent: {
    color: '#374151',
    fontSize: 14,
  },
}) 