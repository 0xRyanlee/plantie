import React, { useState } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { cn } from '../shared/cn'

export interface InteractionBarProps {
  liked?: boolean
  likeCount?: number
  commentCount?: number
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  className?: string
}

export const InteractionBar: React.FC<InteractionBarProps> = ({
  liked = false,
  likeCount = 0,
  commentCount = 0,
  onLike,
  onComment,
  onShare,
  className,
}) => {
  const [scale] = useState(new Animated.Value(1))

  const handleLike = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.3, duration: 120, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start()
    onLike?.()
  }

  return (
    <View className={cn('flex-row items-center gap-6', className)}>
      <TouchableOpacity
        onPress={handleLike}
        accessibilityRole="button"
        accessibilityLabel={liked ? '取消點讚' : '點讚'}
        activeOpacity={0.7}
      >
        <Animated.Text style={{ transform: [{ scale }] }}>
          {liked ? '💚' : '🤍'}
        </Animated.Text>
        <Text className="text-xs text-gray-700 mt-1 text-center">{likeCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onComment}
        accessibilityRole="button"
        accessibilityLabel="留言"
        activeOpacity={0.7}
      >
        <Text>💬</Text>
        <Text className="text-xs text-gray-700 mt-1 text-center">{commentCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onShare}
        accessibilityRole="button"
        accessibilityLabel="分享"
        activeOpacity={0.7}
      >
        <Text>🔗</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InteractionBar 