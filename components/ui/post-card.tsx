import dayjs from 'dayjs'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { cn } from '../shared/cn'

export interface PostCardProps {
  title: string
  content: string
  author: string
  createdAt: string | Date
  onPress?: () => void
  className?: string
}

export const PostCard: React.FC<PostCardProps> = ({ title, content, author, createdAt, onPress, className }) => (
  <TouchableOpacity
    className={cn('bg-white rounded-lg shadow p-3 mb-3', className)}
    onPress={onPress}
    activeOpacity={0.85}
    accessibilityRole="button"
    accessibilityLabel={`查看貼文 ${title}`}
  >
    <Text className="text-base font-bold text-green-900 mb-1" numberOfLines={1}>{title}</Text>
    <Text className="text-sm text-gray-700 mb-2" numberOfLines={2}>{content}</Text>
    <View className="flex-row justify-between items-center">
      <Text className="text-xs text-gray-500" numberOfLines={1}>{author}</Text>
      <Text className="text-xs text-gray-400">{dayjs(createdAt).format('YYYY/MM/DD HH:mm')}</Text>
    </View>
  </TouchableOpacity>
)

export default PostCard 