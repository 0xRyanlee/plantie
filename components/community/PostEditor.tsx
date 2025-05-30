import React, { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

/**
 * 發新帖編輯器
 * 支援標題、內容、圖片URL、tag 輸入，預覽發文內容，發佈時 alert 輸入資料
 */
export default function PostEditor({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState<string>('')

  // 發佈貼文
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('請填寫標題與內容')
      return
    }
    Alert.alert('發文內容', JSON.stringify({ title, content, imageUrl, tags: tags.split(',').map(t => t.trim()) }, null, 2))
    onClose()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>標題</Text>
      <TextInput
        style={styles.input}
        placeholder="請輸入標題"
        value={title}
        onChangeText={setTitle}
        maxLength={40}
      />
      <Text style={styles.label}>內容</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="請輸入內容"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Text style={styles.label}>圖片網址（可選）</Text>
      <TextInput
        style={styles.input}
        placeholder="https://..."
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.previewImg} /> : null}
      <Text style={styles.label}>標籤（以逗號分隔）</Text>
      <TextInput
        style={styles.input}
        placeholder="如：多肉, 新手, 經驗"
        value={tags}
        onChangeText={setTags}
      />
      {/* 預覽區塊 */}
      <Text style={styles.label}>預覽</Text>
      <View style={styles.previewCard}>
        {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.previewImg} /> : null}
        <Text style={styles.previewTitle}>{title || '（標題）'}</Text>
        <Text style={styles.previewContent}>{content || '（內容）'}</Text>
        <Text style={styles.previewTags}>{tags ? tags.split(',').map(t => `#${t.trim()}`).join(' ') : ''}</Text>
      </View>
      {/* 發佈/取消按鈕 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#e5e7eb' }]} onPress={onClose}>
          <Text style={{ color: '#14532d', fontWeight: 'bold' }}>取消</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#14532d' }]} onPress={handleSubmit}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>發佈</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 15,
    color: '#14532d',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#f9fafb',
  },
  previewCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  previewTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#14532d',
    marginBottom: 4,
  },
  previewContent: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 4,
  },
  previewTags: {
    color: '#10b981',
    fontSize: 13,
  },
  previewImg: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
}) 