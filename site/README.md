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

## 學歷與海外研修（2026-11 更新）
「關於藝術家」改用學歷與海外研修兩組重複條目，每筆填：學校名稱、系所／學程、日文學程名稱（選填）、學位／身分及期間。初始資料為臺藝大學士（2020.09—2024.06）、臺藝大碩士（2024.09—就讀中）、筑波大學藝術學學位學程特別研究學生（2026.09—2027.09）。

網站內建上述三筆作為兼容備用資料；只要 Sanity 中已填入學歷陣列，就優先使用 Sanity 資料，不會覆寫她日後的編輯。

既有 Sanity Artist Profile 需執行一次初始化，才能在 Sanity 後台直接修改這三筆。打開 PowerShell 的 Git 專案根目錄，逐行執行：

```powershell
git pull origin main
cd studio
npm install
npm run deploy
npm run init:history
```

其中 `npm run deploy` 更新線上 Sanity Studio 的編輯表單；`npm run init:history` 使用你自己的已登入 Sanity 帳號，只填補尚未存在的陣列欄位、保留照片和其他資料，並且僅在原始中文簡介尚未修改時修正「交換」的舊措辭。往後她直接登入 Studio 修改學歷，按 Publish 即可，**不需要每次執行初始化指令**。
