import React from 'react'
import { Text, View } from 'react-native'
import { cn } from '../shared/cn'

interface FormContainerProps {
  title?: string
  description?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  description,
  error,
  children,
  className,
}) => (
  <View className={cn('p-4 bg-white rounded-lg shadow gap-2', className)}>
    {title && <Text className="text-lg font-bold text-green-900 mb-1">{title}</Text>}
    {description && <Text className="text-sm text-gray-500 mb-2">{description}</Text>}
    {children}
    {error && <Text className="text-red-500 mt-2">{error}</Text>}
  </View>
)

export default FormContainer 