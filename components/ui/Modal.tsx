import React from 'react'
import { Modal as RNModal, Text, TouchableOpacity, View } from 'react-native'
import { cn } from '../shared/cn'

export interface ModalProps {
  visible: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  className?: string
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children, className }) => {
  return (
    <RNModal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/30 justify-center items-center">
        <View className={cn('bg-white rounded-xl p-6 w-11/12 max-w-md', className)}>
          {title && <Text className="text-lg font-bold mb-4 text-green-900">{title}</Text>}
          {children}
          <TouchableOpacity className="mt-6 self-end px-4 py-2 rounded bg-green-900" onPress={onClose} accessibilityRole="button" accessibilityLabel="關閉彈窗">
            <Text className="text-white font-semibold">關閉</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  )
}

export default Modal 