import React from 'react'
import { Text, View } from 'react-native'
import { cn } from '../shared/cn'

export interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => (
  <View className={cn('h-12 px-4 flex-row items-center justify-center bg-gray-100', className)}>
    <Text className="text-xs text-gray-500">© 2024 Plantie. All rights reserved.</Text>
  </View>
)

export default Footer 