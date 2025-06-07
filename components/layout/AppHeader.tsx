import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/**
 * 全局標題列元件（AppHeader）
 * - 樣式與聊天頁一致
 * - 支援 title、可選右側按鈕、可選返回鍵
 * - 適用於所有主分頁/子頁面
 */
export default function AppHeader({
  title,
  onBack,
  right,
}: {
  title: string
  onBack?: () => void
  right?: React.ReactNode
}) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backBtn} accessibilityLabel="返回">
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ flex: 1 }} />
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#14532d',
    minHeight: 56,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 0,
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  backText: {
    color: '#fff',
    fontSize: 22,
  },
  right: {
    marginLeft: 'auto',
  },
}) 