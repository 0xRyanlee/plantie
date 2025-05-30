import React from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { cn } from '../shared/cn'

export interface InputProps extends TextInputProps {
  label?: string
  error?: string
  icon?: React.ReactNode
  className?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <View className={cn('mb-3', className)}>
      {label && <Text className="mb-1 text-sm font-medium text-gray-700">{label}</Text>}
      <View className={cn('flex-row items-center border rounded-lg px-3 py-2 bg-white', error ? 'border-red-500' : 'border-gray-300', props.editable === false ? 'opacity-50' : '')}>
        {icon && <View className="mr-2">{icon}</View>}
        <TextInput
          className="flex-1 text-base text-gray-900"
          placeholderTextColor="#aaa"
          accessibilityLabel={label || props.placeholder}
          editable={props.editable}
          {...props}
        />
      </View>
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  )
}

export default Input 