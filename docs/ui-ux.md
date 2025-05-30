# UI/UX 設計規範

## 修訂紀錄
- 2024-06-09：文件建立，初版規範

## 設計原則
- 行動端優先，簡潔易用
- 主色：#14532d，LOGO 專用
- 全局色盤：黑白灰
- 參考 shadcn/ui 官方設計語言（RN 版）
- 響應式設計，最小寬度 375px，平板適配
- 支援 iOS/Android 一致性
- 無障礙：accessibilityLabel、動態字體

## 字體與排版
- 系統預設字體，支援動態字體
- 標題/內文層級分明

## 交互規範
- 按鈕/互動元件需有明顯回饋（動畫、Toast、loading）
- 表單錯誤提示明確
- 卡片元件圖片快取、預設圖
- 社群互動元件需動畫回饋

## 裝置特性
- SafeAreaView、StatusBar、Notch、KeyboardAvoidingView

## 文件同步原則
- 每次 UI/UX 重大調整，需於此文件更新修訂紀錄
- 元件設計細節請同步 docs/components.md 