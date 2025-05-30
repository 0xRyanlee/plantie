import React from 'react'
import { ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native'
import { cn } from '../shared/cn'

export interface ButtonProps {
  title: string
  onPress?: (event: GestureResponderEvent) => void
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
  icon,
  variant = 'primary',
  className
}) => {
  const baseStyle = 'flex-row items-center justify-center px-4 py-2 rounded-lg'
  const variantStyle =
    variant === 'primary'
      ? 'bg-green-900 text-white'
      : variant === 'secondary'
      ? 'bg-gray-100 text-green-900'
      : 'border border-green-900 bg-white text-green-900'
  const disabledStyle = disabled ? 'opacity-50' : ''

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(baseStyle, variantStyle, disabledStyle, className)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#14532d'} size="small" />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className={cn('font-semibold text-base', variant === 'primary' ? 'text-white' : 'text-green-900')}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Button 