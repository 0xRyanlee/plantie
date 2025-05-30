import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import ProductCard, { ProductCardProps } from './ProductCard'

export interface ProductMasonryGridProps {
  products: ProductCardProps[]
  onProductClick?: (id: string) => void
  ListHeaderComponent?: React.ReactElement
}

export function ProductMasonryGrid({ products, onProductClick, ListHeaderComponent }: ProductMasonryGridProps) {
  // 根據螢幕寬度自動決定欄數
  const numColumns = Dimensions.get('window').width > 600 ? 2 : 1
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image} resizeMode="cover" />
          <ProductCard {...item} onClick={() => onProductClick?.(item.id)} />
        </View>
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingBottom: 2,
  },
  cardWrapper: {
    flex: 1,
    margin: 3,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default ProductMasonryGrid 