import React from 'react'
import { Image, Text, View } from 'react-native'

/**
 * 用戶筆記卡片
 * @param props.avatar 用戶頭像
 * @param props.nickname 用戶暱稱
 * @param props.cover 筆記封面圖
 * @param props.content 筆記內容
 * @param props.borderRadius 卡片圓角
 */
export default function NoteCard({
  avatar,
  nickname,
  cover,
  content,
  borderRadius = 0,
}: {
  avatar: string
  nickname: string
  cover: string
  content: string
  borderRadius?: number
}) {
  return (
    <View style={{ backgroundColor: '#fff', borderRadius: borderRadius, margin: 4, overflow: 'hidden', elevation: 2 }}>
      <Image source={{ uri: cover }} style={{ width: '100%', height: 180, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        <Image source={{ uri: avatar }} style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }} />
        <Text style={{ fontWeight: 'bold', color: '#14532d' }}>{nickname}</Text>
      </View>
      <Text style={{ paddingHorizontal: 8, paddingBottom: 8, color: '#333' }} numberOfLines={2}>
        {content}
      </Text>
    </View>
  )
} 