// lib/design-tokens.ts

// 首頁設計參數（每個區塊獨立，方便集中管理與調整）
export const HOME_TOKENS = {
  // Banner 輪播區塊
  banner: {
    heightRatio: 0.4, // Banner 高度佔螢幕比例（如 0.4 = 40%）
    marginTopRatio: 0.05, // Banner 距離螢幕頂部比例（如 0.1 = 10%）
    borderRadius: 0, // 圓角
    shadow: {
      color: '#000', // 陰影顏色
      opacity: 0.10, // 陰影透明度
      radius: 4, // 陰影半徑
      elevation: 2, // Android 陰影
    },
    backgroundColor: '#f4f4f5', // 背景色
  },
  // 分類快捷入口區塊
  category: {
    iconSize: 44, // 圖示大小
    gap: 12, // 圖示間距
    padding: 8, // 內距
    borderRadius: 12, // 圓角
    backgroundColor: '#fff', // 背景色
  },
  // 猜你喜歡區塊
  guessYouLike: {
    cardWidth: 160, // 卡片寬度
    cardHeight: 180, // 卡片高度
    gap: 12, // 卡片間距
    marginTop: 8, // 區塊上方間距
    marginBottom: 8, // 區塊下方間距
    titleFontSize: 18, // 標題字體大小
    titleColor: '#14532d', // 標題顏色
    titleMarginLeft: 12, // 標題左側間距
  },
  // 熱門標籤區塊
  hotTags: {
    tagFontSize: 12, // 標籤字體大小
    tagPaddingX: 16, // 標籤左右內距
    tagPaddingY: 6, // 標籤上下內距
    tagRadius: 16, // 標籤圓角
    gap: 8, // 標籤間距
    activeBg: '#14532d', // 選中背景色
    inactiveBg: '#fff', // 未選中背景色
    activeColor: '#fff', // 選中文字色
    inactiveColor: '#14532d', // 未選中文字色
  },
  // 瀑布流商品列表區塊
  masonry: {
    columns: 2, // 欄數
    spacing: 5, // 卡片間距
    cardRadius: 30, // 卡片圓角
    cardShadow: {
      color: '#000', // 陰影顏色
      opacity: 0.10, // 陰影透明度
      radius: 6, // 陰影半徑
      elevation: 4, // Android 陰影
    },
    cardMargin: 4, // 卡片外距
  },
  // 商品卡片區塊
  card: {
    borderRadius: 0, // 圓角
    shadow: {
      color: '#000', // 陰影顏色
      opacity: 0.10, // 陰影透明度
      radius: 6, // 陰影半徑
      elevation: 4, // Android 陰影
    },
    padding: 12, // 內距
    gap: 8, // 內容間距
  },
}

// 其他分頁可依此格式新增
// export const COMMUNITY_TOKENS = { ... } // 社群分頁設計參數
// export const USER_TOKENS = { ... } // 個人中心分頁設計參數 