import React from 'react'
import MasonryList from 'react-native-masonry-list'
import ProductCard, { ProductCardProps } from './ProductCard'

/**
 * 商品瀑布流
 * @param props.data 商品資料陣列
 * @param props.onItemPress 點擊商品回調
 * @param props.refreshing 是否正在刷新
 * @param props.onRefresh 下拉刷新回調
 */
export default function ProductMasonryList({
  data,
  onItemPress,
  refreshing,
  onRefresh,
}: {
  data: ProductCardProps[]
  onItemPress: (id: string) => void
  refreshing: boolean
  onRefresh: () => void
}) {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item: ProductCardProps) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={true}
      renderItem={({ item }: { item: ProductCardProps }) => (
        <ProductCard {...item} height={item.height} onClick={() => onItemPress(item.id)} />
      )}
      style={{ flex: 1, paddingHorizontal: 3, marginTop: 0 }}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  )
} 