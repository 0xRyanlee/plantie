import React from 'react'; // 匯入 React 主函式庫
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // 匯入 React Native 內建元件
import { IconSymbol } from '../ui/IconSymbol'; // 匯入自訂的 IconSymbol 圖示元件

export interface NavbarProps {
  title?: string // Navbar 標題（可選）
}

const MAIN_COLOR = '#14532d' // 主色（品牌深綠色）

// Navbar 主組件，接收標題與 className
export const Navbar: React.FC<NavbarProps> = ({ title = 'Plantie' }) => (
  <View style={styles.navbar}>
    {/* 左下角標題文字 */}
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
    {/* 右上角通知鈴鐺按鈕，絕對定位 */}
    <View style={styles.bellAbsoluteWrapper}>
      <TouchableOpacity
        onPress={() => { /* TODO: 跳轉通知頁或顯示通知 */ }}
        accessibilityLabel="通知"
        style={styles.bellWrapper}
      >
        <View style={styles.bellCircle}>
          <IconSymbol name="bell.fill" size={22} color={MAIN_COLOR} />
          <View style={styles.redDot} />
        </View>
      </TouchableOpacity>
    </View>
  </View>
)

// 樣式定義
const styles = StyleSheet.create({
  bellAbsoluteWrapper: {
    position: 'absolute', // 絕對定位
    top: 70, // 距離螢幕頂部
    right: 25, // 距離螢幕右側
    zIndex: 20,
  },
  bellWrapper: {
    marginLeft: 8, // 鈴鐺與標題間距（保留，實際不影響絕對定位）
  },
  bellCircle: {
    backgroundColor: '#fff', // 鈴鐺背景白色
    borderRadius: 999, // 圓形
    padding: 14, // 內距
    shadowColor: '#000', // 陰影顏色
    shadowOpacity: 0.3, // 陰影透明度
    shadowRadius: 5, // 陰影半徑
    elevation: 4, // Android 陰影
    alignItems: 'center', // 內容置中
    justifyContent: 'center', // 內容置中
  },
  redDot: {
    position: 'absolute', // 絕對定位
    top: 8, // 距離 bellCircle 頂部
    right: 8, // 距離 bellCircle 右側
    width: 11, // 寬 9px
    height: 11, // 高 9px
    borderRadius: 5, // 圓形
    backgroundColor: '#ef4444', // 紅色（提醒）
    borderWidth: 1.5, // 白色邊框寬度
    borderColor: '#fff', // 白色邊框
    zIndex: 10, // 疊層順序
  },
  navbar: {
    height: 100,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end', // 讓內容貼近底部
    justifyContent: 'flex-start', // 靠左
    backgroundColor: MAIN_COLOR,
    position: 'relative',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: '100%',
    paddingBottom: 4, // 與底部距離
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default Navbar // 預設匯出 Navbar 組件
