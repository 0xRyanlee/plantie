import React from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { cn } from '../shared/cn'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  label?: string
  value?: string
  options: SelectOption[]
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  disabled,
  icon,
  className
}) => {
  const [visible, setVisible] = React.useState(false)
  const selected = options.find(opt => opt.value === value)

  return (
    <View className={cn('mb-3', className)}>
      {label && <Text className="mb-1 text-sm font-medium text-gray-700">{label}</Text>}
      <TouchableOpacity
        className={cn('flex-row items-center border rounded-lg px-3 py-2 bg-white', error ? 'border-red-500' : 'border-gray-300', disabled ? 'opacity-50' : '')}
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={label || '下拉選單'}
        accessibilityState={{ disabled }}
      >
        {icon && <View className="mr-2">{icon}</View>}
        <Text className={cn('flex-1 text-base', !selected ? 'text-gray-400' : 'text-gray-900')}>
          {selected ? selected.label : '請選擇'}
        </Text>
      </TouchableOpacity>
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity className="flex-1 bg-black/30 justify-center" onPress={() => setVisible(false)} activeOpacity={1}>
          <View className="mx-8 bg-white rounded-xl p-4">
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 px-2 border-b border-gray-100"
                  onPress={() => {
                    onChange?.(item.value)
                    setVisible(false)
                  }}
                >
                  <Text className={cn('text-base', value === item.value ? 'text-green-900 font-bold' : 'text-gray-900')}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default Select 