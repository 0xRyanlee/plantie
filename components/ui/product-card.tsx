import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { cn } from '../shared/cn'

export interface ProductCardProps {
  image: string
  title: string
  price: number
  seller: string
  onPress?: () => void
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, seller, onPress, className }) => (
  <TouchableOpacity className={cn('bg-white rounded-lg shadow p-2 mb-3', className)} onPress={onPress} activeOpacity={0.85}>
    <Image source={{ uri: image }} className="w-full h-40 rounded-md mb-2" resizeMode="cover" />
    <Text className="text-base font-bold text-green-900 mb-1">{title}</Text>
    <Text className="text-lg text-green-700 font-semibold mb-1">${price}</Text>
    <Text className="text-xs text-gray-500">賣家：{seller}</Text>
  </TouchableOpacity>
)

export default ProductCard 