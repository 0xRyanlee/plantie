import { HOME_TOKENS } from '@/lib/design-tokens'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  seller: {
    name: string
    avatar: string
  }
  onClick?: () => void
  height?: number
  borderRadius?: number
}

export function ProductCard({ id, title, price, image, seller, onClick, height, borderRadius = 0 }: ProductCardProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.85}
      accessibilityLabel={`查看商品 ${title}`}
      style={{
        backgroundColor: '#fff',
        borderRadius: borderRadius,
        shadowColor: HOME_TOKENS.card.shadow.color,
        shadowOpacity: HOME_TOKENS.card.shadow.opacity,
        shadowRadius: HOME_TOKENS.card.shadow.radius,
        elevation: HOME_TOKENS.card.shadow.elevation,
        flexDirection: 'column',
        overflow: 'hidden',
        marginBottom: 0,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: '100%', height: height ?? 160, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, flexDirection: 'column', padding: HOME_TOKENS.card.padding, gap: HOME_TOKENS.card.gap }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }} numberOfLines={1}>{title}</Text>
        <Text style={{ color: '#14532d', fontWeight: 'bold', fontSize: 18 }}>${price}</Text>
        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }} numberOfLines={1}>{seller.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard 