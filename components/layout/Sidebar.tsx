import React from 'react'
import { Text, View } from 'react-native'
import { cn } from '../shared/cn'

export interface SidebarProps {
  user?: { name: string }
  menu?: { label: string; onPress: () => void }[]
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ user, menu, className }) => {
  return (
    <View className={cn('w-60 h-full bg-white border-r p-4', className)}>
      {user && <Text className="mb-6 text-lg font-bold text-green-900">Hi, {user.name}</Text>}
      <View className="gap-4">
        {menu?.map((item, idx) => (
          <Text key={idx} className="text-base text-green-900" onPress={item.onPress}>{item.label}</Text>
        ))}
      </View>
    </View>
  )
}

export default Sidebar 