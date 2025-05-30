import PostEditor from '@/components/community/PostEditor'
import PostList from '@/components/community/PostList'
import { fakePosts } from '@/features/community/fake-posts'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'

/**
 * 社群分頁主頁（原收藏分頁）
 * - 顯示所有貼文（PostList）
 * - 右下角浮動按鈕可發新帖
 */
export default function FavoriteScreen() {
  // 狀態：假資料、刷新狀態
  const [posts, setPosts] = useState(fakePosts)
  const [refreshing, setRefreshing] = useState(false)
  const [editorVisible, setEditorVisible] = useState(false)

  // 下拉刷新模擬
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  // 分頁載入模擬（可根據實際需求擴充）
  const onEndReached = () => {
    // TODO: 載入更多資料
  }

  // 發新帖（開啟編輯器 Modal）
  const handleNewPost = () => {
    setEditorVisible(true)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 貼文列表 */}
      <PostList posts={posts} refreshing={refreshing} onRefresh={onRefresh} onEndReached={onEndReached} />
      {/* 右下角浮動發帖按鈕 */}
      <TouchableOpacity style={styles.fab} onPress={handleNewPost} accessibilityLabel="發新帖">
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
      {/* 發帖編輯器 Modal */}
      <Modal visible={editorVisible} animationType="slide" onRequestClose={() => setEditorVisible(false)}>
        <PostEditor onClose={() => setEditorVisible(false)} />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 36,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#14532d',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
}) 