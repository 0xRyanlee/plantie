import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

export interface HotTagItem {
  id: string
  label: string
  active?: boolean
  onPress?: () => void
}

export interface HotTagsProps {
  tags: HotTagItem[]
}

export const HotTags: React.FC<HotTagsProps> = ({ tags }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
    {tags.map(tag => (
      <TouchableOpacity
        key={tag.id}
        style={[styles.tag, tag.active ? styles.tagActive : styles.tagInactive]}
        onPress={tag.onPress}
        activeOpacity={0.85}
      >
        <Text style={[styles.tagText, tag.active ? styles.tagTextActive : styles.tagTextInactive]}>{tag.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
)

const MAIN_COLOR = '#14532d'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1.5,
  },
  tagActive: {
    backgroundColor: MAIN_COLOR,
    borderColor: MAIN_COLOR,
  },
  tagInactive: {
    backgroundColor: '#fff',
    borderColor: MAIN_COLOR,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
  },
  tagTextActive: {
    color: '#fff',
  },
  tagTextInactive: {
    color: MAIN_COLOR,
  },
})

export default HotTags 