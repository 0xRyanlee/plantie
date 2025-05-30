import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SideCategoryBar({
  categories,
  selectedId,
  onSelect,
}: {
  categories: { id: string; name: string }[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <View style={styles.sidebar}>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.id}
          style={[
            styles.item,
            selectedId === cat.id && styles.selected,
          ]}
          onPress={() => onSelect(cat.id)}
        >
          <Text style={[styles.text, selectedId === cat.id && styles.selectedText]}>
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    width: 90,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    justifyContent: 'center',
  },
  item: {
    paddingVertical: 10,
    alignItems: 'flex-start',
    borderRadius: 8,
    marginBottom: 4,
    width: '100%',
    paddingLeft: 10,
  },
  selected: {
    backgroundColor: '#d1fae5',
  },
  text: {
    color: '#14532d',
    fontSize: 15,
    textAlign: 'left',
    width: '100%',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#065f46',
  },
}) 