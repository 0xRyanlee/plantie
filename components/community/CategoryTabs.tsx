import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/**
 * 話題/分類切換元件（優化版）
 * - 底色加深，選中分明，間距更佳
 * - 支援無障礙
 */
export default function CategoryTabs({
  categories,
  activeCategory,
  onChange,
}: {
  categories: string[]
  activeCategory: string
  onChange: (cat: string) => void
}) {
  return (
    <View style={styles.tabBarWrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, activeCategory === cat && styles.activeTab]}
            onPress={() => onChange(cat)}
            accessibilityLabel={`切換到${cat}`}
            accessible
          >
            <Text style={[styles.tabText, activeCategory === cat && styles.activeTabText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarWrap: {
    backgroundColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 2,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#14532d',
    borderColor: '#14532d',
    shadowColor: '#14532d',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    color: '#14532d',
    fontWeight: 'bold',
    fontSize: 15,
  },
  activeTabText: {
    color: '#fff',
  },
}) 