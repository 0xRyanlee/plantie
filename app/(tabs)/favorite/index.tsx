import AppHeader from '@/components/layout/AppHeader'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'

export default function FavoriteScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="收藏" />
      <Text style={{ margin: 24, fontSize: 18, color: '#14532d' }}>這裡是收藏分頁</Text>
    </SafeAreaView>
  )
} 