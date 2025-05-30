import { Feather } from '@expo/vector-icons'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'

const TABS = [
  { key: 'index', icon: 'home', label: '首頁', route: '/index' },
  { key: 'market', icon: 'grid', label: '分類', route: '/marketplace' },
  { key: 'favorite', icon: 'heart', label: '收藏', route: '/favorite' },
  { key: 'community', icon: 'message-circle', label: '社群', route: '/community' },
  { key: 'user', icon: 'user', label: '我的', route: '/user' },
]

const MAIN_COLOR = '#14532d'

export default function CustomTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const currentIndex = state.index
  return (
    <View style={[styles.tabBar, { paddingBottom: insets?.bottom || 12 }]}> 
      {TABS.map((tab, idx) => {
        // 只顯示已註冊的分頁
        const routeIdx = state.routes.findIndex((r) => r.name === tab.key)
        if (routeIdx === -1) return null
        const focused = currentIndex === routeIdx
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(tab.key)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
          >
            <View style={focused ? styles.iconWrapperActive : styles.iconWrapper}>
              <Feather
                name={tab.icon as any}
                size={focused ? 28 : 24}
                color={focused ? MAIN_COLOR : '#fff'}
              />
            </View>
            {/* 可加label: <Text style={[styles.label, focused && { color: MAIN_COLOR }]}>{tab.label}</Text> */}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#222',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 24,
    padding: 8,
  },
  iconWrapperActive: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    marginBottom: Platform.OS === 'ios' ? 8 : 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    fontSize: 11,
    color: '#fff',
    marginTop: 2,
  },
}) 