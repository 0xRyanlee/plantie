import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Navbar from '../../components/layout/Navbar'
import ProductCard from '../../components/product/ProductCard'
import PostCard from '../../components/ui/post-card'
import UserCard from '../../components/ui/user-card'

const mockUser = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: '小明',
  bio: '綠手指達人，熱愛分享植物日常',
}

const mockProducts = [
  {
    id: '1',
    title: '多肉植物組合',
    price: 250,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    seller: mockUser,
  },
  {
    id: '2',
    title: '療癒小盆栽',
    price: 180,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    seller: mockUser,
  },
]

const mockPosts = [
  {
    title: '我的多肉日記',
    content: '今天幫多肉澆水，發現新芽冒出來了！',
    author: mockUser.name,
    createdAt: new Date(),
  },
  {
    title: '陽台花園改造',
    content: '利用回收木箱打造陽台花園，超有成就感！',
    author: mockUser.name,
    createdAt: new Date(),
  },
]

export default function UserProfilePage() {
  return (
    <>
      <Navbar title="我的" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <UserCard avatar={mockUser.avatar} name={mockUser.name} bio={mockUser.bio} />
          <Text style={styles.sectionTitle}>上架商品</Text>
          <View style={styles.listRow}>
            {mockProducts.map(p => (
              <View key={p.id} style={{ flex: 1, margin: 4 }}>
                <ProductCard {...p} />
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>我的貼文</Text>
          <View>
            {mockPosts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14532d',
    marginTop: 16,
    marginBottom: 8,
  },
  listRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
}) 