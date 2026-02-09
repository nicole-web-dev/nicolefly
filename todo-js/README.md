# Travel To-Do List (todo-js)

純前端的旅遊待辦清單，使用 **HTML / CSS / 原生 JavaScript**，沒有使用 React、Vue 等框架。  
待辦項目會儲存在 `localStorage`，重新整理或重新開啟頁面都會保留。

## 功能簡述

- 上方有 `new todo` 與 `description` 兩個輸入框：
  - 先輸入標題，再輸入描述，在 `description` 欄位按下 Enter 即可新增待辦（會加在最下方）。
  - 若只有在 `new todo` 按 Enter，會自動跳到 `description` 欄位。
- 下方是待辦清單區域，可捲動：
  - 左側小方框可以切換選取狀態（目前僅供視覺標記，沒有其他批次操作）。
  - 右側紅色 `X` 按鈕會直接刪除該 todo，下面的項目會往上移。
  - 點擊待辦列會展開／收合下方的描述區塊。
- 初次載入時會有兩筆預設 todo，之後會以本機儲存內容為主。

## 專案結構

- `index.html`：主頁面結構。
- `styles.css`：頁面樣式，仿照範例圖的配色與版型。
- `main.js`：待辦清單邏輯與 localStorage 儲存。

## 如何執行

你可以直接在檔案總管中對 `index.html` 按兩下，或在瀏覽器中開啟該檔案即可使用。

若之後有安裝 Yarn，也可以在 `todo-js` 目錄底下執行：

```bash
cd todo-js
yarn init -y        # 若你想用 Yarn 重新初始化
```

> 目前並未加入任何第三方套件，Yarn 主要是做為後續擴充時的套件管理工具。

