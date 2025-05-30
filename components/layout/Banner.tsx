import { HOME_TOKENS } from '@/lib/design-tokens';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export interface BannerProps {
  banners: { id: string; image: string | number; onPress?: () => void }[]
}

const { width, height: windowHeight } = Dimensions.get('window')
const BANNER_HEIGHT = Math.round(windowHeight * HOME_TOKENS.banner.heightRatio)

export const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<ScrollView>(null)

  // 自動輪播（可選）
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const next = (active + 1) % banners.length
  //     scrollRef.current?.scrollTo({ x: next * width, animated: true })
  //     setActive(next)
  //   }, 4000)
  //   return () => clearInterval(timer)
  // }, [active, banners.length])

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width)
    setActive(index)
  }

  const goTo = (idx: number) => {
    scrollRef.current?.scrollTo({ x: idx * width, animated: true })
    setActive(idx)
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scroll}
      >
        {banners.map((banner, idx) => (
          <TouchableOpacity
            key={banner.id}
            activeOpacity={0.9}
            onPress={banner.onPress}
            style={styles.bannerItem}
          >
            <Image
              source={typeof banner.image === 'string' ? { uri: banner.image } : banner.image}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* 指示點 */}
      <View style={styles.dotsRow}>
        {banners.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              active === idx ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: BANNER_HEIGHT,
    marginTop: Math.round(windowHeight * HOME_TOKENS.banner.marginTopRatio),
    marginBottom: 12,
    position: 'relative',
    borderRadius: HOME_TOKENS.banner.borderRadius,
    overflow: 'hidden',
    backgroundColor: HOME_TOKENS.banner.backgroundColor,
    shadowColor: HOME_TOKENS.banner.shadow.color,
    shadowOpacity: HOME_TOKENS.banner.shadow.opacity,
    shadowRadius: HOME_TOKENS.banner.shadow.radius,
    elevation: HOME_TOKENS.banner.shadow.elevation,
    alignSelf: 'center',
  },
  scroll: {
    width: '100%',
    height: BANNER_HEIGHT,
  },
  bannerItem: {
    width,
    height: BANNER_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: HOME_TOKENS.banner.borderRadius,
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
    transform: [{ translateY: -20 }],
  },
  dotsRow: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: '#14532d',
  },
  dotInactive: {
    backgroundColor: '#d1d5db',
  },
})

export default Banner 