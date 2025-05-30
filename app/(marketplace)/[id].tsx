import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InteractionBar from '../../components/ui/interaction-bar'
import UserCard from '../../components/ui/user-card'

// 假資料
const mockProduct = {
  id: '1',
  title: '多肉植物組合',
  price: 250,
  images: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
  ],
  seller: { name: '小明', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', bio: '綠手指達人', rating: 4.8 },
  description: '療癒系多肉植物組合，適合辦公桌、居家擺設，易於照顧。',
  liked: false,
  likeCount: 10,
  commentCount: 2,
  category: '多肉植物',
  tags: ['療癒', '易照顧'],
  status: '二手',
  stock: 1,
  createdAt: '2024-05-01T10:00:00Z',
}
const mockRelated = [
  { id: '2', title: '療癒小盆栽', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', price: 180 },
  { id: '3', title: '空氣鳳梨', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80', price: 120 },
  { id: '4', title: '桌上型小樹', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', price: 320 },
]

// 型別定義
interface ProductDetailPageProps {
  navigation?: NativeStackNavigationProp<any>
}

export default function ProductDetailPage({ navigation }: ProductDetailPageProps) {
  const [liked, setLiked] = useState(mockProduct.liked)
  const [activeImg, setActiveImg] = useState(0)
  // loading/error/空狀態可根據實際資料串接調整
  const loading = false
  const error = false

  if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>載入中...</Text></View>
  if (error) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>載入失敗，請稍後再試</Text></View>

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* 返回上一頁按鈕 */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack?.()}>
        <Feather name="chevron-left" size={28} color="#14532d" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 圖片輪播 */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {mockProduct.images.map((img, idx) => (
            <TouchableOpacity key={img} activeOpacity={0.95} onPress={() => setActiveImg(idx)}>
              <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* 輪播指示點 */}
        <View style={styles.dotsRow}>
          {mockProduct.images.map((_, idx) => (
            <View key={idx} style={[styles.dot, activeImg === idx ? styles.dotActive : styles.dotInactive]} />
          ))}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{mockProduct.title}</Text>
          <View style={styles.row}>
            <Text style={styles.price}>${mockProduct.price}</Text>
            <Text style={styles.status}>{mockProduct.status}</Text>
            <Text style={styles.category}>{mockProduct.category}</Text>
          </View>
          <View style={styles.row}>
            {mockProduct.tags.map(tag => (
              <Text key={tag} style={styles.tag}>{tag}</Text>
            ))}
            <Text style={styles.time}>{new Date(mockProduct.createdAt).toLocaleDateString()}</Text>
          </View>
          <UserCard avatar={mockProduct.seller.avatar} name={mockProduct.seller.name} bio={mockProduct.seller.bio} />
          <TouchableOpacity style={styles.contactBtn} onPress={() => {}}>
            <Feather name="message-circle" size={18} color="#fff" />
            <Text style={styles.contactBtnText}>聯絡賣家</Text>
          </TouchableOpacity>
          <InteractionBar
            liked={liked}
            likeCount={liked ? mockProduct.likeCount + 1 : mockProduct.likeCount}
            commentCount={mockProduct.commentCount}
            onLike={() => setLiked(l => !l)}
            onComment={() => {}}
            onShare={() => {}}
          />
          <Text style={styles.sectionTitle}>商品描述</Text>
          <Text style={styles.description}>{mockProduct.description}</Text>
        </View>
        {/* 相關推薦商品 */}
        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>猜你喜歡</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockRelated.map(item => (
              <View key={item.id} style={styles.relatedCard}>
                <Image source={{ uri: item.image }} style={styles.relatedImg} resizeMode="cover" />
                <Text style={styles.relatedTitle}>{item.title}</Text>
                <Text style={styles.relatedPrice}>${item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    backgroundColor: '#f9fafb',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 12,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  carousel: {
    width: '100%',
    height: 260,
  },
  image: {
    width: 340,
    height: 260,
    borderRadius: 16,
    marginRight: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: '#14532d',
  },
  dotInactive: {
    backgroundColor: '#d1d5db',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#14532d',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14532d',
    marginRight: 8,
  },
  status: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#14532d',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  category: {
    fontSize: 14,
    color: '#14532d',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tag: {
    fontSize: 12,
    color: '#14532d',
    backgroundColor: '#e0f2f1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14532d',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  contactBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14532d',
    marginTop: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  relatedSection: {
    marginTop: 24,
    paddingLeft: 16,
  },
  relatedCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    padding: 8,
    alignItems: 'center',
  },
  relatedImg: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
  },
  relatedTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#14532d',
    marginBottom: 2,
    textAlign: 'center',
  },
  relatedPrice: {
    fontSize: 13,
    color: '#14532d',
    fontWeight: 'bold',
  },
}) 