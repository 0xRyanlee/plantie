import { Post } from '@/lib/types/post';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 貼文卡片元件（含點讚動畫）
 * @param post 貼文資料（標題、內容、圖片、作者、互動數等）
 * @param onPress 點擊卡片事件（可選，傳遞 post.id）
 */
export default function PostCard({ post, onPress }: { post: Post; onPress?: (id: string) => void }) {
  // 本地點讚狀態與數量
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  // Animated 值
  const scaleAnim = useRef(new Animated.Value(1)).current
  // 本地收藏狀態
  const [collected, setCollected] = useState(false)
  const collectAnim = useRef(new Animated.Value(1)).current

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

  // 點擊收藏動畫
  const handleCollect = () => {
    Animated.sequence([
      Animated.timing(collectAnim, { toValue: 1.3, duration: 120, useNativeDriver: true }),
      Animated.timing(collectAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start()
    setCollected(v => !v)
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress ? () => onPress(post.id) : undefined}
      accessibilityLabel={`查看貼文詳情：${post.title}`}
      accessible
    >
      {/* 收藏按鈕（右上角） */}
      <TouchableOpacity
        style={styles.collectBtn}
        onPress={e => { e.stopPropagation(); handleCollect() }}
        activeOpacity={0.7}
        accessibilityLabel={collected ? '取消收藏' : '收藏'}
        accessible
      >
        <Animated.View style={{ transform: [{ scale: collectAnim }] }}>
          <Ionicons name={collected ? 'bookmark' : 'bookmark-outline'} size={22} color={collected ? '#eab308' : '#6b7280'} />
        </Animated.View>
      </TouchableOpacity>
      {/* 圖片區（16:9，cover） */}
      {post.images && post.images.length > 0 && (
        <Image source={{ uri: post.images[0] }} style={styles.image} resizeMode="cover" accessibilityLabel="貼文圖片" />
      )}
      {/* 標題 */}
      <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
      {/* 內容摘要 */}
      <Text style={styles.content} numberOfLines={2}>{post.content}</Text>
      {/* 作者與互動區 */}
      <View style={styles.footer}>
        <View style={styles.authorRow}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} accessibilityLabel="作者頭像" />
          <Text style={styles.authorName}>{post.author.name}</Text>
        </View>
        <View style={styles.interactionRow}>
          <Text style={styles.interaction} accessibilityLabel="留言數">💬 {post.comments}</Text>
          {/* 點讚動畫區 */}
          <TouchableOpacity onPress={handleLike} activeOpacity={0.7} accessibilityLabel={liked ? '取消點讚' : '點讚'} accessible>
            <Animated.Text style={[styles.interaction, { color: liked ? '#e11d48' : '#6b7280', transform: [{ scale: scaleAnim }] }]}>💚 {likeCount}</Animated.Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 8,
    padding: 12,
    shadowColor: '#14532d',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    flexDirection: 'column',
    minWidth: 0,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#e5e7eb',
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
    marginTop: 8,
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
  collectBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 4,
  },
}) 