import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MasonryList from 'react-native-masonry-list'
import ProductCard, { ProductCardProps } from '../../components/product/ProductCard'

// Mock 主分類、細分類、商品資料
const MAIN_CATEGORIES = [
  { id: 'succulent', name: '多肉植物' },
  { id: 'flower', name: '花卉' },
  { id: 'tree', name: '樹木' },
  { id: 'herb', name: '香草' },
  { id: 'fruit', name: '果樹' },
  { id: 'cactus', name: '仙人掌' },
  { id: 'tools', name: '工具' },
]
const SUB_CATEGORIES: Record<string, { id: string; name: string }[]> = {
  succulent: [
    { id: 'all', name: '全部' },
    { id: 'mini', name: '迷你多肉' },
    { id: 'rare', name: '稀有多肉' },
    { id: 'combo', name: '組合盆栽' },
  ],
  flower: [
    { id: 'all', name: '全部' },
    { id: 'rose', name: '玫瑰' },
    { id: 'tulip', name: '鬱金香' },
    { id: 'sunflower', name: '向日葵' },
  ],
  tree: [
    { id: 'all', name: '全部' },
    { id: 'bonsai', name: '盆栽樹' },
    { id: 'fruit-tree', name: '果樹' },
  ],
  herb: [
    { id: 'all', name: '全部' },
    { id: 'mint', name: '薄荷' },
    { id: 'basil', name: '羅勒' },
  ],
  fruit: [
    { id: 'all', name: '全部' },
    { id: 'apple', name: '蘋果' },
    { id: 'citrus', name: '柑橘' },
  ],
  cactus: [
    { id: 'all', name: '全部' },
    { id: 'mini', name: '迷你仙人掌' },
    { id: 'rare', name: '稀有仙人掌' },
  ],
  tools: [
    { id: 'all', name: '全部' },
    { id: 'shovel', name: '鏟子' },
    { id: 'pot', name: '花盆' },
  ],
}

// 1. 修改 ProductCardProps 型別（臨時擴充）
type ProductWithSubCat = ProductCardProps & { subCategory: string }

// 2. 修改 MOCK_PRODUCTS 結構，為每個商品加上 subCategory
const MOCK_PRODUCTS: Record<string, ProductWithSubCat[]> = {
  succulent: [
    { id: '1', title: '迷你多肉組合', subCategory: 'mini', price: 120, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', seller: { name: '小綠', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, height: 180 },
    { id: '2', title: '稀有多肉', subCategory: 'rare', price: 320, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', seller: { name: '花花', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, height: 200 },
    { id: '3', title: '組合盆栽', subCategory: 'combo', price: 200, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6', seller: { name: '阿盆', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' }, height: 220 },
  ],
  flower: [
    { id: '4', title: '玫瑰花束', subCategory: 'rose', price: 150, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', seller: { name: '小新', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, height: 180 },
    { id: '5', title: '鬱金香', subCategory: 'tulip', price: 180, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b', seller: { name: '陶陶', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' }, height: 200 },
    { id: '6', title: '向日葵', subCategory: 'sunflower', price: 160, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b', seller: { name: '小花', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }, height: 180 },
  ],
  tree: [
    { id: '7', title: '果樹苗', subCategory: 'fruit-tree', price: 300, image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe', seller: { name: '小樹', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, height: 210 },
    { id: '8', title: '盆栽樹', subCategory: 'bonsai', price: 350, image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe', seller: { name: '小樹', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, height: 210 },
  ],
  herb: [
    { id: '9', title: '薄荷盆栽', subCategory: 'mint', price: 80, image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99', seller: { name: '香香', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, height: 180 },
    { id: '10', title: '羅勒盆栽', subCategory: 'basil', price: 90, image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99', seller: { name: '香香', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, height: 180 },
  ],
  fruit: [
    { id: '11', title: '蘋果樹苗', subCategory: 'apple', price: 250, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', seller: { name: '果農', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, height: 200 },
    { id: '12', title: '柑橘樹苗', subCategory: 'citrus', price: 260, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', seller: { name: '果農', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, height: 200 },
  ],
  cactus: [
    { id: '13', title: '迷你仙人掌', subCategory: 'mini', price: 90, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', seller: { name: '仙仙', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, height: 180 },
    { id: '14', title: '稀有仙人掌', subCategory: 'rare', price: 190, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', seller: { name: '仙仙', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, height: 180 },
  ],
  tools: [
    { id: '15', title: '園藝鏟子', subCategory: 'shovel', price: 60, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6', seller: { name: '工具人', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' }, height: 180 },
    { id: '16', title: '花盆', subCategory: 'pot', price: 40, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6', seller: { name: '工具人', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' }, height: 180 },
  ],
}

export default function MarketplacePage() {
  const [mainCat, setMainCat] = useState('succulent')
  const [subCat, setSubCat] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // 3. 修正過濾邏輯，直接比對 subCategory
  const products = (MOCK_PRODUCTS[mainCat] || []).filter((p: ProductWithSubCat) =>
    subCat === 'all' || p.subCategory === subCat
  ).filter(p =>
    search === '' || p.title.includes(search)
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* 搜索框 */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="搜尋商品/分類/賣家"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* 主分類橫向入口 */}
      <FlatList
        data={MAIN_CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.mainCatList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.mainCatBtn, mainCat === item.id && styles.mainCatBtnActive]}
            onPress={() => {
              setMainCat(item.id)
              setSubCat('all')
            }}
          >
            <Text style={[styles.mainCatText, mainCat === item.id && styles.mainCatTextActive]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {/* 主體區塊：左細分類、右商品流 */}
      <View style={styles.bodyRow}>
        {/* 左側細分類 */}
        <View style={styles.subCatCol}>
          <FlatList
            data={SUB_CATEGORIES[mainCat]}
            keyExtractor={(item: { id: string; name: string }) => item.id}
            renderItem={({ item }: { item: { id: string; name: string } }) => (
              <TouchableOpacity
                style={[styles.subCatBtn, subCat === item.id && styles.subCatBtnActive]}
                onPress={() => setSubCat(item.id)}
              >
                <Text style={[styles.subCatText, subCat === item.id && styles.subCatTextActive]}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* 右側商品流 MasonryList */}
        <View style={styles.productCol}>
          {loading ? (
            <Text style={styles.statusText}>載入中...</Text>
          ) : error ? (
            <Text style={styles.statusText}>載入失敗，請稍後再試</Text>
          ) : products.length === 0 ? (
            <Text style={styles.statusText}>暫無商品</Text>
          ) : (
            <MasonryList
              data={products}
              keyExtractor={(item: ProductWithSubCat) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: { item: ProductWithSubCat }) => (
                <ProductCard {...item} height={item.height} />
              )}
              style={{ paddingHorizontal: 0, marginTop: 0 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  mainCatList: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  mainCatBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  mainCatBtnActive: {
    backgroundColor: '#14532d',
  },
  mainCatText: {
    fontSize: 15,
    color: '#14532d',
    fontWeight: '500',
  },
  mainCatTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyRow: {
    flex: 1,
    flexDirection: 'row',
  },
  subCatCol: {
    width: 90,
    backgroundColor: '#f4f4f5',
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
  },
  subCatBtn: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  subCatBtnActive: {
    backgroundColor: '#14532d',
  },
  subCatText: {
    fontSize: 15,
    color: '#14532d',
  },
  subCatTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productCol: {
    flex: 1,
    padding: 8,
  },
  statusText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
}) 