import CategoryTabs from '@/components/community/CategoryTabs'
import PostEditor from '@/components/community/PostEditor'
import PostList from '@/components/community/PostList'
import AppHeader from '@/components/layout/AppHeader'
import { Category, fakePosts } from '@/features/community/fake-posts'
import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'

/**
 * 社群分頁主頁（重構）
 * - 支援話題/分類切換
 * - 支援發文（多圖、本地圖片）
 * - 支援下拉刷新
 * - 支援 MasonryList/FlatList
 * - 詳細中文註解
 */
const CATEGORIES: Category[] = ['全部', '多肉', '陽台', '推薦', '經驗', '分享']

export default function CommunityScreen() {
  // 狀態：所有貼文、當前分類、刷新狀態、發文 Modal
  const [posts, setPosts] = useState(fakePosts)
  const [activeCategory, setActiveCategory] = useState<Category>('全部')
  const [refreshing, setRefreshing] = useState(false)
  const [editorVisible, setEditorVisible] = useState(false)

  // 分類過濾後的貼文
  const filteredPosts = useMemo(() =>
    activeCategory === '全部'
      ? posts
      : posts.filter(p => p.category === activeCategory),
    [posts, activeCategory]
  )

  // 下拉刷新模擬
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  // 發新帖（開啟編輯器 Modal）
  const handleNewPost = () => {
    setEditorVisible(true)
  }

  // 發文後自動加入新貼文（模擬）
  const handlePostSubmit = (newPost: any) => {
    setPosts(prev => [
      { ...newPost, id: Date.now().toString(), category: activeCategory },
      ...prev,
    ])
    setEditorVisible(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* 全局標題列 */}
      <AppHeader title="社群" />
      {/* 發文按鈕（右上角） */}
      <TouchableOpacity
        style={styles.fabTop}
        onPress={handleNewPost}
        accessibilityLabel="發新帖"
        accessible
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
      {/* 話題/分類切換 */}
      <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
        <CategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onChange={cat => setActiveCategory(cat as Category)}
        />
      </View>
      {/* 貼文列表 */}
      <View style={{ flex: 1 }}>
        <PostList posts={filteredPosts} refreshing={refreshing} onRefresh={onRefresh} />
      </View>
      {/* 發帖編輯器 Modal */}
      <Modal visible={editorVisible} animationType="slide" onRequestClose={() => setEditorVisible(false)}>
        <PostEditor onClose={() => setEditorVisible(false)} />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  fabTop: {
    position: 'absolute',
    top: 710,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#14532d',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#14532d',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 100,
  },
}) 