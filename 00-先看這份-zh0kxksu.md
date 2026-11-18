# 已設定 Sanity Project ID 的專案｜請從這裡開始

你已建立的 Sanity 專案：`personal website for Keen`  
**Project ID：`zh0kxksu`** ／ **Dataset：`production`**

這份專案已幫你把 ID 寫進網站和 Studio 的設定（Project ID 不是密碼），所以**不用重做 Sanity 精靈提供的 Next.js 教學**，也**不用執行** `npm create sanity@latest` 或 `npx create-next-app@latest`。已製作的原始碼是 **`site/`（純 HTML/CSS/JavaScript）** ＋ **`studio/`（Sanity Studio）**；兩者本來就是同級資料夾。

## 只要先做這 4 步

1. **準備環境**：Windows 安裝 Node.js 22.12 以上的 LTS 版本，打開 VS Code 並解壓縮 ZIP。用 VS Code 的「檔案 → 開啟資料夾」打開 `chiang-ke-en-portfolio-cms-zh0kxksu`。在上方選單「終端機 → 新增終端機」。
2. **啟動 Studio**：在 VS Code 終端機中確認目前位置是專案根目錄，執行：

   ```powershell
   cd studio
   npm install
   npx sanity login
   npm run import:starter
   npm run dev
   ```

   `npx sanity login` 用你自己的 Sanity 帳號登入。**只在首次匯入**時執行 `npm run import:starter`，它會匯入既有作品、展覽及圖片。正常時瀏覽器開啟 **http://localhost:3333**，左側出現「藝術家介紹」「作品管理」「展覽與獲獎紀錄」。若你曾經在 `production` 匯入同一批作品，**跳過匯入**。
3. **讓哿恩可遠端編輯**：確認後台內容正常後，在同個 `studio` 終端機按 `Ctrl + C` 關閉開發伺服器，執行：

   ```powershell
   npm run deploy
   ```

   第一次選擇可用的 `*.sanity.studio` 網址。Sanity Manage 的 **Members** 頁邀請哿恩；她往後使用瀏覽器登入，不需碰程式。
4. **網站上線（你自己部署）**：把這份專案上傳自己的 GitHub；登入 Vercel → Add New → Project → 匯入 repo；**Root Directory 選 `site`、Framework Preset 選 Other、Build Command `npm run build`、Output Directory `dist`**。環境變數建議明確填：

   ```text
   SANITY_PROJECT_ID = zh0kxksu
   SANITY_DATASET = production
   ```

   Deploy 完成後到 Sanity Manage → **API → CORS origins** 加入你的 Vercel 正式網站 origin，如 `https://xxxxx.vercel.app`；**Allow credentials 關閉**。這樣網站能從瀏覽器讀取 Sanity 公開資料。若 Sanity 修改後網站仍顯示舊資料，檢查資料是否已 **Publish**、`production` 是否為 Public、以及 CORS 設定。若你自己將 `site` 改成伺服器端取資料，CORS 需求會不同。

## 請留意

- **不要提供帳號、密碼、API Token 給我**。Sanity Project ID 可以寫在前端，它不是秘密。
- 首次匯入會把 **26 組作品、31 筆經歷、1 份藝術家介紹（共 58 份文件）**及照片匯入到你的 Sanity 專案。中文譯名未經藝術家最後校訂，正式公開前要確認。
- 這個 ZIP 的 Studio 未經你的帳號實際遠端匯入測試；我只能在本地檢查程式與打包檔案。若遇到錯誤，請貼終端機錯誤內容，不需要傳登入資訊。
- 建議 GitHub repository 先設為 Private，確保藝術家作品圖片公開權限已確認。
- 完整操作與後台欄位的說明請看 [README.md](README.md)。
