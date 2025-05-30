import { Post } from '@/lib/types/post'
import React, { useRef, useState } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/**
 * 貼文卡片元件（含點讚動畫）
 * @param post 貼文資料（標題、內容、圖片、作者、互動數等）
 */
export default function PostCard({ post }: { post: Post }) {
  // 本地點讚狀態與數量
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  // Animated 值
  const scaleAnim = useRef(new Animated.Value(1)).current

  // 點擊愛心動畫與數值切換
  const handleLike = () => {
    // 動畫：縮放到1.4再回1
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.4, duration: 120, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start()
    // 本地切換狀態
    setLiked(v => {
      const next = !v
      setLikeCount(c => next ? c + 1 : c - 1)
      return next
    })
  }

  return (
    <View style={styles.card}>
      {/* 圖片區（僅顯示第一張） */}
      {post.images && post.images.length > 0 && (
        <Image source={{ uri: post.images[0] }} style={styles.image} resizeMode="cover" />
      )}
      {/* 標題 */}
      <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
      {/* 內容摘要 */}
      <Text style={styles.content} numberOfLines={2}>{post.content}</Text>
      {/* 作者與互動區 */}
      <View style={styles.footer}>
        <View style={styles.authorRow}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
          <Text style={styles.authorName}>{post.author.name}</Text>
        </View>
        <View style={styles.interactionRow}>
          <Text style={styles.interaction}>💬 {post.comments}</Text>
          {/* 點讚動畫區 */}
          <TouchableOpacity onPress={handleLike} activeOpacity={0.7} accessibilityLabel={liked ? '取消點讚' : '點讚'}>
            <Animated.Text style={[styles.interaction, { color: liked ? '#e11d48' : '#6b7280', transform: [{ scale: scaleAnim }] }]}>💚 {likeCount}</Animated.Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'column',
    minWidth: 0,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#14532d',
    marginBottom: 4,
  },
  content: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  authorName: {
    fontSize: 13,
    color: '#14532d',
  },
  interactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  interaction: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 8,
  },
}) 