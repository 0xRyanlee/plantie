# 元件設計規範

## 修訂紀錄
- 2024-06-09：文件建立，初版規範
- 2024-06-09：Button、Input、Modal、Select 樣式與無障礙優化
- 2024-06-09：UserCard、PostCard 資訊層級、圖片快取、無障礙優化
- 2024-06-09：新增 InteractionBar（點讚、評論、分享）互動元件

## 命名規則
- 檔案：kebab-case
- 元件：PascalCase
- Props：型別明確，禁止 any

## 設計原則
- shadcn/ui（RN 版）為主，NativeWind 樣式
- 單一職責、可重用、支援無障礙
- 跨平台一致性

## 主要元件

### Button
- props: variant, size, loading, disabled, onPress
- 樣式：主色 #14532d、圓角、禁用/Loading 狀態明顯
- 無障礙：accessibilityRole="button"、accessibilityLabel、accessibilityState
- 用法：
```tsx
<Button variant="primary" loading={isLoading} onPress={handleClick}>送出</Button>
```

### Input
- props: value, onChangeText, placeholder, error, label
- 樣式：主色邊框、圓角、禁用/錯誤提示明顯
- 無障礙：accessibilityLabel
- 用法：
```tsx
<Input label="帳號" value={value} onChangeText={setValue} placeholder="請輸入..." error={errorMsg} />
```

### Modal
- props: visible, onClose, title, children
- 樣式：圓角、主色標題、明顯關閉按鈕
- 無障礙：accessibilityLabel="關閉彈窗"
- 用法：
```tsx
<Modal visible={show} onClose={closeModal} title="提示">內容</Modal>
```

### ProductCard
- props: product, onPress
- 用法：
```tsx
<ProductCard product={item} onPress={() => {}} />
```

### Select
- props: value, options, onChange, label, error
- 樣式：主色邊框、圓角、禁用/錯誤提示明顯
- 無障礙：accessibilityLabel、accessibilityState
- 用法：
```tsx
<Select label="分類" value={value} options={options} onChange={setValue} />
```

### UserCard
- props: avatar, name, bio, onPress
- 樣式：圓形頭像、主色標題、資訊層級分明
- 圖片快取與預設圖，無頭像時顯示預設
- 無障礙：accessibilityRole="button"、accessibilityLabel
- 用法：
```tsx
<UserCard avatar={user.avatar} name={user.name} bio={user.bio} onPress={() => {}} />
```

### PostCard
- props: title, content, author, createdAt, onPress
- 樣式：主色標題、內容摘要、作者與時間資訊分明
- 日期格式化（dayjs）
- 無障礙：accessibilityRole="button"、accessibilityLabel
- 用法：
```tsx
<PostCard title="標題" content="內容..." author="作者" createdAt={new Date()} onPress={() => {}} />
```

### InteractionBar
- props: liked, likeCount, commentCount, onLike, onComment, onShare
- 樣式：橫向排列，點讚動畫回饋，主色符號
- 無障礙：accessibilityRole="button"、accessibilityLabel
- 用法：
```tsx
<InteractionBar liked={liked} likeCount={10} commentCount={2} onLike={handleLike} onComment={handleComment} onShare={handleShare} />
```

## 文件同步原則
- 每次元件調整，需於此文件更新修訂紀錄
- UI/UX 原則請參考 docs/ui-ux.md 