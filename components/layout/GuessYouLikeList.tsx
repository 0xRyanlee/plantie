import React from 'react'
import { FlatList, Text, View } from 'react-native'
import ProductCard, { ProductCardProps } from '../product/ProductCard'

/**
 * 猜你喜歡橫向商品列表
 * @param props.data 商品資料陣列
 * @param props.onItemPress 點擊商品回調
 */
export default function GuessYouLikeList({
  data,
  onItemPress,
}: {
  data: ProductCardProps[]
  onItemPress: (id: string) => void
}) {
  return (
    <View style={{ marginTop: 8, marginBottom: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#14532d', marginLeft: 12, marginBottom: 4 }}>
        猜你喜歡
      </Text>
      <FlatList
        data={data}
        keyExtractor={p => p.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 8 }}
        renderItem={({ item }) => (
          <View style={{ width: 160, marginRight: 12 }}>
            <ProductCard {...item} height={180} onClick={() => onItemPress(item.id)} />
          </View>
        )}
      />
    </View>
  )
} 