import React from 'react'
import { Text } from 'react-native'

interface FormErrorProps {
  message?: string
  className?: string
}

export const FormError: React.FC<FormErrorProps> = ({ message, className }) => {
  if (!message) return null
  return <Text className={className || 'text-red-500 mt-1'}>{message}</Text>
}

export default FormError 