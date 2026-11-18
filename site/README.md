# 蔣哿恩藝術家個人網站 / Frontend

完整的部署與 CMS 操作教學請查看**上一層資料夾**的 [`README.md`](../README.md)。

- `npm run build`：把網站與本次建置的 Sanity 設定放進 `dist/`，供 Vercel 發布。
- `npm start`：本機網址 `http://localhost:4173` 預覽網站。
- 不設定 `SANITY_PROJECT_ID` 時會使用 `data.js` 內建的初始預覽內容。
- 設定 `SANITY_PROJECT_ID` 和 `SANITY_DATASET`，執行 `npm run build` 後正式網站會從 Sanity 公開資料集讀取已發布的內容。
- 作品名稱的中文譯文是暫擬，網站正式公開前需要藝術家確認。
