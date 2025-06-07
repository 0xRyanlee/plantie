# Plantie 重構計劃（React Native → Vue 3）

## 目標
- 將 Plantie 專案從 React Native + Expo + TypeScript 全面遷移到 Vue 3 技術棧
- 保留原有功能，優化行動端體驗
- 建立現代化、可維護、易擴展的前端架構

## 重構路徑

### 1. 前期規劃
- 需求盤點、技術選型（Vue 3 + Vite + Pinia + Vue Router + Quasar/Ionic）
- 制定新專案規範、目錄結構、命名規則

### 2. 架構搭建
- 初始化 Vue 3 + Vite 專案
- 配置 Lint、Prettier、Pinia、Vue Router、UI 框架
- 配置 i18n、dayjs、axios、測試工具

### 3. 功能重構
- 依原有模組（auth、product、order、chat、community）逐步重構
- 每模組完成後撰寫單元測試

### 4. 整合優化
- 響應式設計、行動端適配
- 性能優化、無障礙支援、安全性加強

### 5. CI/CD 與部署
- 配置自動化測試、E2E、部署腳本
- 撰寫用戶與開發文件

## 進度追蹤
- [ ] 前期規劃
- [ ] 架構搭建
- [ ] 功能重構
- [ ] 整合優化
- [ ] CI/CD 與部署

## 技術決策
- 前端：Vue 3 + Vite + TypeScript
- 狀態管理：Pinia
- 路由：Vue Router
- UI 框架：Quasar（或 Ionic Vue、Naive UI）
- 測試：Vitest、Cypress
- i18n：vue-i18n
- API：axios
- 行動端：PWA/Quasar/Ionic/NativeScript Vue（依需求選擇）

## 版本紀錄
- 2024-06-07：新增重構計劃，啟動 Vue 3 遷移 