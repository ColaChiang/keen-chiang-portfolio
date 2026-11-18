> **已客製化給 Sanity 專案 `zh0kxksu`。建議從 [`00-先看這份-zh0kxksu.md`](00-先看這份-zh0kxksu.md) 開始，以下為通用詳細版。**

# 蔣哿恩 CHIANG KE EN｜藝術家個人網站 + 可自行編輯的管理後台

> **交付內容：**保留日系設計的個人網站（`site/`）、Sanity 管理後台（`studio/`）、作品與經歷初始資料，以及由你自己部署的完整教學。這個專案**尚未連接任何人的 Sanity／GitHub／Vercel 帳號，也尚未正式上線**。

## 你會得到什麼？

- **日系個人網站：**首頁 → 藝術家介紹 → 展覽／獲獎混合條列 → 作品精選 → 作品全集，桌面主要內容限制約 1110px，支援手機。
- **作品資料：**26 組作品，含主照片、可選的多張細節照、中文／日文作品名稱、英文選填、媒材（中日文）、尺寸、年代（未確定的留空）。
- **經歷：**31 筆展覽與獲獎合併在單一列表，不用頁籤，不依年份分段。
- **Sanity 管理後台：**哿恩可以直接登入新增／修改作品、照片、簡介與經歷；修改後按「Publish／發布」，訪客重新開啟頁面即可看到更新（CDN 快取可能需要短暫時間）。
- **不需要把任何帳號或密碼提供給製作者。**

## 專案資料夾

```text
chiang-ke-en-portfolio-cms/
├── site/                         # 部署到 Vercel 的網站
│   ├── index.html                # 網頁結構
│   ├── styles.css                # 日系樣式與響應式版面
│   ├── script.js                 # 作品牆、切換、細節照片彈窗
│   ├── data.js                   # 尚未接 CMS 時的預覽資料
│   ├── cms.js                    # 讀取 Sanity 公開內容
│   ├── cms-config.js             # 本機預覽用佔位 ID
│   ├── build.mjs                 # 由 Vercel 環境變數產生正式設定
│   ├── vercel.json               # 靜態網站建置設定
│   ├── package.json
│   └── assets/                    # PDF 擷取的作品照片
├── studio/                       # Sanity 後台（由 Sanity 託管）
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   ├── schemaTypes/              # 作品、藝術家簡介、經歷的欄位
│   ├── .env.example
│   ├── package.json
│   └── seed/
│       ├── ke-en-starter.tar.gz  # 初始資料和照片，匯入一次即可
│       ├── data.ndjson           # 58 筆文件（26+31+1）
│       └── images/
└── README.md
```

## A. 建立 Sanity 專案與管理後台（你在自己的電腦上做）

### 事前準備

1. 安裝 **Node.js 22.12 以上**（或更新的 LTS 版本），確認終端機輸入 `node -v` 和 `npm -v` 有版本號。
2. 在 [Sanity](https://www.sanity.io/) 建立／登入自己的帳號。
3. 開啟 [Sanity Manage](https://www.sanity.io/manage)，新增一個專案，例如 `chiang-ke-en-portfolio`，建立名稱為 **`production`** 的 **Public dataset**。資料集必須是 Public，因為此版作品網站在瀏覽器直接向 Sanity 讀取公開資料，不會使用任何 API Token。
4. 在專案設定找到 **Project ID**（一串英數字），**只需要填在自己的電腦裡，不用傳給我**。Project ID 並非密碼。

### 啟動後台、匯入作品

使用 Windows PowerShell 或 macOS 終端機，進入解壓縮後的 `studio` 資料夾：

```bash
cd studio
npm install
```

在 `studio/` 複製 `.env.example` 並重新命名 `.env`（Windows PowerShell：`Copy-Item .env.example .env`；macOS/Linux：`cp .env.example .env`）。開啟 `.env`，把 `REPLACE_WITH_YOUR_PROJECT_ID` 換成自己在 Sanity 找到的 ID：

```dotenv
SANITY_STUDIO_PROJECT_ID=你的ProjectID
SANITY_STUDIO_DATASET=production
```

然後執行：

```bash
npx sanity login
npm run import:starter
npm run dev
```

- `npm run import:starter` 會將 **26 組作品、31 筆經歷、1 筆藝術家介紹和相應照片**匯入 `production`。**只需匯入一次。**這個指令已使用 `--missing`，再次執行也不會直接覆蓋已存在的作品文件。
- `npm run dev` 預設在 `http://localhost:3333` 開啟管理後台，可立即檢查作品、照片和姓名等資料。
- 如遇 CLI 要求登入或確認專案權限，使用你**自己的 Sanity 帳號**操作。

### 讓哿恩用瀏覽器登入

在 `studio/` 執行：

```bash
npm run deploy
```

首次會請你輸入獨一無二的 Studio 網址名稱，例如 `chiang-ke-en-art`，之後後台網址會是 `https://chiang-ke-en-art.sanity.studio`（**僅為範例；實際名稱是否可用以 Sanity 提示為準**）。部署成功後，到 **Sanity Manage → 專案 → Members** 邀請哿恩的電子郵件加入專案，選擇適當的內容編輯權限。她以自己的帳號登入後即可操作，不需要再開終端機。後台程式未來如有更新，才需要你重新部署 Studio。

## B. 用你自己的 GitHub、Vercel 部署展示網站

### GitHub

1. 在自己的 GitHub 建立一個 repository，例如 `chiang-ke-en-portfolio`。
2. 將本 ZIP 解壓後的**專案內容**上傳 GitHub（包含 `site/` 和 `studio/`；不要上傳 `studio/.env`、API Token 或密碼）。
3. 建議先設為 Private，待確認照片與譯名都可公開後再決定是否開放原始碼；Private repo 也可以連接到你自己的 Vercel。

### Vercel

1. 登入自己的 [Vercel Dashboard](https://vercel.com/dashboard) → **Add New → Project** → 選取剛建立的 GitHub repo。
2. 在 Import Project 設定：
   - **Root Directory：`site`**（非常重要，不是根目錄，也不是 `studio`）
   - **Framework Preset：Other**
   - **Build Command：`npm run build`**
   - **Output Directory：`dist`**
3. 在 **Environment Variables** 新增兩筆（實際數值填自己的資料）：

   | Name | Value |
   |---|---|
   | `SANITY_PROJECT_ID` | 你的 Sanity Project ID |
   | `SANITY_DATASET` | `production` |

4. 按 **Deploy**，取得 `https://你的專案.vercel.app` 網址。`site/vercel.json` 也已定義建置與輸出設定，Vercel 會讀取它。

### 允許網站讀取 Sanity（CORS）

到 **Sanity Manage → 專案 → API → CORS origins** 新增正式網站的 origin（例如 `https://你的專案.vercel.app`）：

- **Allow credentials：關閉**（只是讀取公開資料，不需要帶入使用者登入資訊）。
- 本機測試若要讀取 Sanity，另新增 `http://localhost:4173`，Allow credentials 同樣關閉。
- 若未來使用自訂網域（例如 `https://example.com`），記得也新增該網域。

這一步如果漏掉，瀏覽器可能因 CORS 而看不到最新資料，網站會暫時回退成內建的作品預覽資料。

### 完成驗收

1. 開啟 Vercel 網址，進入作品全集，看到照片與**中文、日文**作品名稱。
2. 在 Sanity 後台打開一件作品，修改名稱或加入細節照片，按 **Publish**。
3. 重新整理公開網站，確認內容更新（Sanity CDN 可能有快取延遲）。
4. 試著新增一筆展覽、補上藝術家資訊，再確認網站同步更新。

**本版是「瀏覽器載入時讀取 Sanity」的方式，不需要哿恩手動重新部署 Vercel。**

## C. 哿恩平常的編輯方式

**新增作品：**進 Sanity Studio →「作品管理」→ 新增作品 → 上傳主照片（必填）與細節照片（可多張）→ 填入中文名稱、日文名稱、英文（可不填）、媒材、尺寸、年代（不確定可留空）→ 選分類 → 設定「排序數字」→ 按 **Publish**。

**編輯介紹：**「藝術家介紹」中更換人像、中文介紹、研修經歷等 → Publish。

**新增經歷：**「展覽與獲獎紀錄」→ 新增 → 選年份、填經歷文字、選展覽／獲獎、設定同年份排序 → Publish。網站上兩種類別會直接**混合成一份清單**，不會拆成分頁。

**精選與首頁：**作品中的「放到首頁作品精選」可以勾選數幅；「使用這幅作品作為首頁主視覺」建議**只能勾一幅**。如果勾選多幅，網站會顯示排序較前的一幅。

**草稿安全：**Sanity 內容要點「Publish／發布」才會顯示在公開網站；沒發布的草稿不會出現在目前前台。

## D. 內容公開前務必核對

- 中文作品名稱是**依日文原題暫擬的翻譯**，尚未經藝術家逐件確認。英文作品名稱暫時留空。
- 提供的日文作品集有些作品**沒有創作年份**，後台初始資料保留空值，沒有憑空填年份。
- 圖片目前來自 32 頁的 PDF 作品集，有些是展場照、局部照，非高解析原件。建議由藝術家確認每張主圖與細節照，並用新的高清圖替換。
- 網站中簡介段落及引言中文譯文包含編輯性文字，建議藝術家確認後再公開。
- 你們持有網站的 GitHub、Vercel、Sanity 帳號。請確認藝術家授權展示作品與人像照片；不需授權給我。

## E. 常見問題

**Q：網站部署後沒有讀到 Sanity 修改？** 先確認：作品按了 **Publish**、Sanity Dataset 是 **Public**、Vercel 環境變數的 Project ID 正確、Sanity 已加入 Vercel 網址至 **CORS origins**，再重新整理網站。若修改的是 Vercel 環境變數，需要在 Vercel **Redeploy** 讓建置設定生效。

**Q：為什麼我看不到原先匯入的作品？** 檢查 `studio/.env` 的 Project ID 與 Dataset 是否正確；若 import 沒完成，重新執行 `npm run import:starter`，並留意 CLI 錯誤訊息。

**Q：Sanity 可以免費使用嗎？** 有免費方案但有儲存、流量和功能配額，使用前請確認官方現行方案。網站的 Vercel Hobby 也需符合**非商業用途**規範；這個專案定位為純藝術作品展示，若未來開始販售或付費接案，需重新檢視平台條款。

**Q：使用者需要下載什麼程式？** 哿恩不需要。你只需要**初次設定時**在你的電腦安裝 Node.js，登入 Sanity 及部署後台和前台。

## 官方文件

- [Sanity Studio 安裝](https://www.sanity.io/docs/studio/installation)
- [Sanity Studio 部署](https://www.sanity.io/docs/studio/deployment)
- [Sanity 匯入資料與圖片](https://www.sanity.io/docs/content-lake/importing-data)
- [Sanity CORS](https://www.sanity.io/docs/content-lake/cors)
- [Vercel Build 設定](https://vercel.com/docs/builds/configure-a-build)
