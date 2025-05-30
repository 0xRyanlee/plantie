import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export interface CategoryItem {
  id: string
  name: string
  icon: string // 圖片網址
  onPress?: () => void
}

export interface CategoryQuickEntryProps {
  categories: CategoryItem[]
}

export const CategoryQuickEntry: React.FC<CategoryQuickEntryProps> = ({ categories }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={cat.onPress}
            style={styles.card}
            activeOpacity={0.85}
          >
            <View style={styles.iconCircle}>
              <Image source={typeof cat.icon === 'string' ? { uri: cat.icon } : cat.icon} style={styles.iconImg} resizeMode="contain" />
            </View>
            <Text style={styles.label}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    alignItems: 'center',
    marginRight: 12,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  iconImg: {
    width: 34,
    height: 34,
  },
  label: {
    fontSize: 13,
    color: '#14532d',
    fontWeight: '500',
    marginTop: 2,
  },
})

// 預設12種分類資料
export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'succulent',
    name: '多肉植物',
    icon: 'https://img.icons8.com/color/96/000000/succulent.png',
  },
  {
    id: 'landscape',
    name: '景觀植物', // 原觀葉植物
    icon: 'https://img.icons8.com/color/96/000000/plant-under-sun.png',
  },
  {
    id: 'flower',
    name: '花卉',
    icon: 'https://img.icons8.com/color/96/000000/flower.png',
  },
  {
    id: 'tree',
    name: '樹木',
    icon: 'https://img.icons8.com/color/96/000000/deciduous-tree.png',
  },
  {
    id: 'herb',
    name: '香草',
    icon: 'https://img.icons8.com/color/96/000000/basil.png',
  },
  {
    id: 'fruit',
    name: '果樹',
    icon: 'https://img.icons8.com/color/96/000000/apple.png',
  },
  {
    id: 'cactus',
    name: '仙人掌',
    icon: 'https://img.icons8.com/color/96/000000/cactus.png',
  },
  {
    id: 'bonsai',
    name: '盆栽',
    icon: 'https://img.icons8.com/color/96/000000/bonsai-tree.png',
  },
  {
    id: 'special',
    name: '特殊品種',
    icon: 'https://img.icons8.com/color/96/000000/alien.png',
  },
  {
    id: 'tools',
    name: '工具',
    icon: 'https://img.icons8.com/color/96/000000/gardening-tools.png',
  },
  {
    id: 'peripheral',
    name: '周邊',
    icon: 'https://img.icons8.com/color/96/000000/pottery.png',
  },
  {
    id: 'seed',
    name: '種子',
    icon: 'https://img.icons8.com/color/96/000000/seed.png',
  },
]

export default CategoryQuickEntry 