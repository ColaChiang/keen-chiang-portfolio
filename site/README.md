# 蔣哿恩藝術家作品網站

- Vercel 使用 `site/` 作為 Root Directory，`npm run build` 輸出到 `dist/`。
- 設定 `SANITY_PROJECT_ID=zh0kxksu`、`SANITY_DATASET=production`，展示站會優先讀取已發布的 Sanity 資料。
- 創作足跡：左側獲獎（10 筆）、右側展覽（21 筆）。手機版改為上下排列。

## 學歷與研修：一行一筆

作品網站「關於藝術家」只顯示簡單三行文字；管理端的「藝術家介紹」只需修改一個多行欄位：**學歷與研修（每行一筆）**。按 Enter 換行便會成為網站上的下一筆，無須單獨填學校、學位、時間等欄位。

```
臺灣 國立臺灣藝術大學 書畫藝術學系 學士（2020.09～2024.06）
臺灣 國立臺灣藝術大學 書畫藝術學系 碩士（2024.09～就讀中）
日本 筑波大學 藝術學學位學程 特別研究學生（2026.09～2027.09）
```

首次更新線上 Sanity Studio 表單：先 `git pull origin main`，再進入 `studio/` 資料夾執行 `npm run deploy`。然後登入 https://keen-chiang.sanity.studio/ → 藝術家介紹，貼上以上三行並按 Publish。**不需要執行舊版的 `npm run init:history` 指令，也不用重新匯入作品資料。**

若既有 Sanity 文件尚未填入新文字欄位，展示網站會先顯示相同的預設三行。
