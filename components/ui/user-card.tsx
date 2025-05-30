import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { cn } from '../shared/cn'

export interface UserCardProps {
  avatar: string
  name: string
  bio?: string
  onPress?: () => void
  className?: string
}

const DEFAULT_AVATAR = 'https://img.icons8.com/color/96/000000/user-male-circle--v2.png'

export const UserCard: React.FC<UserCardProps> = ({ avatar, name, bio, onPress, className }) => (
  <TouchableOpacity
    className={cn('flex-row items-center bg-white rounded-lg shadow p-3 mb-2', className)}
    onPress={onPress}
    activeOpacity={0.85}
    accessibilityRole="button"
    accessibilityLabel={`查看用戶 ${name}`}
  >
    <Image
      source={{ uri: avatar || DEFAULT_AVATAR }}
      className="w-12 h-12 rounded-full mr-3"
      defaultSource={{ uri: DEFAULT_AVATAR }}
      accessibilityLabel={`${name} 頭像`}
    />
    <View>
      <Text className="text-base font-bold text-green-900" numberOfLines={1}>{name}</Text>
      {bio && <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>{bio}</Text>}
    </View>
  </TouchableOpacity>
)

export default UserCard 