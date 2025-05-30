# 修訂紀錄
- 2024-06-09：完成分類/商城頁（market）淘寶/閒魚風格重構，包含搜索框、主分類橫向入口、左側細分類、右側 MasonryList 商品流，支援互動與狀態。
- 2024-06-09：分類/商城頁已修正商品資料結構，主分類/細分類切換可正確顯示對應商品，分類體驗與淘寶/閒魚一致。
- 2024-06-09：首頁商品流設計原則補充：MasonryList 外層用 SafeAreaView flex:1，header 不包在 ScrollView，MasonryList 不設死高度，確保可滾動。商品流支援商品/貼文混合，mock data 可加 tag/label，未來可根據算法推送。

# 用戶旅程（User Journey）

## 分類/商城頁（market）
- 進入頁面，預設顯示「多肉植物」主分類，細分類預設「全部」
- 可於上方搜索框輸入關鍵字，右側商品流即時過濾
- 點擊主分類（橫向入口），左側細分類與右側商品流同步切換
- 點擊左側細分類，右側商品流依細分類過濾
- 商品流為 MasonryList 流式排列，支援 loading/error/空狀態
- 全部資料為 mock data，UI/UX 流程完整 

## 首頁商品流設計原則
- MasonryList 外層用 SafeAreaView style={{ flex: 1 }}
- header 不包在 ScrollView 裡
- MasonryList 不設死高度，讓其自動填滿剩餘空間
- 商品流支援商品/貼文混合，mock data 可加 tag/label，未來可根據算法推送 