import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

/**
 * 發新帖編輯器
 * 支援標題、內容、多圖本地選擇、tag 輸入，預覽發文內容，發佈時 alert 輸入資料
 */
export default function PostEditor({ onClose }: { onClose: () => void }) {
  // 標題、內容、標籤狀態
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string>('')
  // 多圖本地選擇狀態（儲存 uri 陣列）
  const [images, setImages] = useState<string[]>([])

  // 選擇多張圖片
  const pickImages = async () => {
    // 請求權限
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('權限不足', '請允許存取相簿以選擇圖片')
      return
    }
    // 選擇圖片（多選）
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    })
    if (!result.canceled) {
      // 新增選取的圖片 uri
      const uris = result.assets.map(asset => asset.uri)
      setImages(prev => [...prev, ...uris])
    }
  }

  // 刪除已選圖片
  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  // 發佈貼文
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('請填寫標題與內容')
      return
    }
    Alert.alert(
      '發文內容',
      JSON.stringify({
        title,
        content,
        images,
        tags: tags.split(',').map(t => t.trim()),
      }, null, 2)
    )
    onClose()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 標題輸入 */}
      <Text style={styles.label}>標題</Text>
      <TextInput
        style={styles.input}
        placeholder="請輸入標題"
        value={title}
        onChangeText={setTitle}
        maxLength={40}
      />
      {/* 內容輸入 */}
      <Text style={styles.label}>內容</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="請輸入內容"
        value={content}
        onChangeText={setContent}
        multiline
      />
      {/* 多圖本地選擇 */}
      <Text style={styles.label}>圖片（可多選）</Text>
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#e5e7eb', marginBottom: 8 }]} onPress={pickImages} accessibilityLabel="選擇圖片">
        <Text style={{ color: '#14532d', fontWeight: 'bold' }}>選擇圖片</Text>
      </TouchableOpacity>
      {/* 已選圖片預覽，可刪除 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        {images.map((uri, idx) => (
          <View key={uri} style={{ marginRight: 8, position: 'relative' }}>
            <Image source={{ uri }} style={{ width: 80, height: 80, borderRadius: 8 }} />
            <TouchableOpacity
              style={{ position: 'absolute', top: 2, right: 2, backgroundColor: '#fff', borderRadius: 10, padding: 2 }}
              onPress={() => removeImage(idx)}
              accessibilityLabel="刪除圖片"
            >
              <Text style={{ color: '#ef4444', fontWeight: 'bold', fontSize: 12 }}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* 標籤輸入 */}
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
        {/* 多圖預覽 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map(uri => (
            <Image key={uri} source={{ uri }} style={{ width: 80, height: 80, borderRadius: 8, marginRight: 8 }} />
          ))}
        </ScrollView>
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