# 蔣哿恩藝術家個人網站 / Frontend

完整的部署與 CMS 操作教學請查看**上一層資料夾**的 [`README.md`](../README.md)。

- `npm run build`：把網站與本次建置的 Sanity 設定放進 `dist/`，供 Vercel 發布。
- `npm start`：本機網址 `http://localhost:4173` 預覽網站。
- 不設定 `SANITY_PROJECT_ID` 時會使用 `data.js` 內建的初始預覽內容。
- 設定 `SANITY_PROJECT_ID` 和 `SANITY_DATASET`，執行 `npm run build` 後正式網站會從 Sanity 公開資料集讀取已發布的內容。
- 作品名稱的中文譯文是暫擬，網站正式公開前需要藝術家確認。


## 獲獎與展覽雙欄顯示（2026-11）

首頁「創作足跡」區塊在桌面版同時顯示左側獲獎、右側展覽；手機版自動上下排列。所有已發布的 Sanity 經歷預設都會顯示，目前初始資料共 10 筆獲獎與 21 筆展覽。若需要隱藏個別紀錄，可在 Sanity Studio 將「顯示在網站上」關閉。

作品與經歷優先從 Sanity 讀取；頁面使用 Sanity 裡的原始名稱及文字。清單預設依年份由新到舊排列，同一年依「同年份顯示順序」排序；也可以用「網站清單順序」指定置頂順序。讀取失敗時使用與原始 Sanity 匯入資料相同的 31 筆離線備用經歷。
