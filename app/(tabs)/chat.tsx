import React, { useState } from 'react'
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

// 假聊天室資料
const MOCK_CHATS = [
  {
    id: 'c1',
    name: '小綠',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: '哈囉！這是最新訊息',
    unread: 2,
    messages: [
      { id: 'm1', fromMe: false, text: '哈囉！這是最新訊息', time: '09:30' },
      { id: 'm2', fromMe: true, text: '你好！', time: '09:31' },
    ],
  },
  {
    id: 'c2',
    name: '花花',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: '明天要一起去花市嗎？',
    unread: 0,
    messages: [
      { id: 'm1', fromMe: false, text: '明天要一起去花市嗎？', time: '08:10' },
      { id: 'm2', fromMe: true, text: '好啊！', time: '08:12' },
    ],
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<typeof MOCK_CHATS[0] | null>(null)
  const [input, setInput] = useState('')

  // 發送訊息（僅本地假資料）
  const handleSend = () => {
    if (!input.trim() || !selectedChat) return
    selectedChat.messages.push({
      id: `m${selectedChat.messages.length + 1}`,
      fromMe: true,
      text: input,
      time: new Date().toLocaleTimeString().slice(0, 5),
    })
    setInput('')
    setSelectedChat({ ...selectedChat })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={styles.header}><Text style={styles.headerTitle}>聊天</Text></View>
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => setSelectedChat(item)}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadDot}><Text style={styles.unreadText}>{item.unread}</Text></View>
            )}
          </TouchableOpacity>
        )}
        style={{ flex: 1 }}
      />
      {/* 單一聊天室 Modal */}
      <Modal visible={!!selectedChat} animationType="slide" onRequestClose={() => setSelectedChat(null)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedChat(null)}><Text style={styles.backBtn}>←</Text></TouchableOpacity>
            <Image source={{ uri: selectedChat?.avatar }} style={styles.avatarSmall} />
            <Text style={styles.name}>{selectedChat?.name}</Text>
          </View>
          <FlatList
            data={selectedChat?.messages || []}
            keyExtractor={msg => msg.id}
            renderItem={({ item }) => (
              <View style={[styles.msgRow, item.fromMe ? styles.msgMe : styles.msgOther]}>
                <Text style={styles.msgText}>{item.text}</Text>
                <Text style={styles.msgTime}>{item.time}</Text>
              </View>
            )}
            contentContainerStyle={{ padding: 16 }}
            style={{ flex: 1 }}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="輸入訊息..."
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}><Text style={{ color: '#fff' }}>發送</Text></TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#14532d',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14532d',
  },
  lastMsg: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  unreadDot: {
    backgroundColor: '#e11d48',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#14532d',
  },
  backBtn: {
    color: '#fff',
    fontSize: 22,
    marginRight: 10,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  msgRow: {
    maxWidth: '80%',
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  msgMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#14532d',
  },
  msgOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
  },
  msgText: {
    color: '#222',
    fontSize: 15,
    marginRight: 8,
  },
  msgTime: {
    color: '#888',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#14532d',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
}) 