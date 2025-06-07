import AppHeader from '@/components/layout/AppHeader'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="探索" />
      <Text style={{ margin: 24, fontSize: 18, color: '#14532d' }}>這裡是探索分頁</Text>
    </SafeAreaView>
  )
} 