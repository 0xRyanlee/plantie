import { Feather } from '@expo/vector-icons'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Animated, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'

const TABS = [
  { key: 'index', icon: 'home', label: '首頁' },
  { key: 'market', icon: 'grid', label: '分類' },
  { key: 'favorite', icon: 'heart', label: '收藏' },
  { key: 'community', icon: 'message-circle', label: '社群' },
  { key: 'user', icon: 'user', label: '我的' },
]

const MAIN_COLOR = '#14532d'

export default function FloatingTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const currentIndex = state.index
  return (
    <View style={[styles.floatingBar, { bottom: (insets?.bottom || 0) + 12 }]}> 
      {TABS.map((tab, idx) => {
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
            <Animated.View style={focused ? styles.iconWrapperActive : styles.iconWrapper}>
              <Feather
                name={tab.icon as any}
                size={focused ? 24 : 20}
                color={focused ? MAIN_COLOR : '#fff'}
              />
            </Animated.View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  floatingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(34,34,34,0.96)',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 24,
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 100,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 24,
    padding: 6,
  },
  iconWrapperActive: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 6,
    marginBottom: Platform.OS === 'ios' ? 6 : 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
}) 