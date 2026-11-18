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

## 日文／英文同一行與自訂作品編號

- 作品列表、作品精選和作品細節中，日文與英文作品名稱會在同一行使用「日文 / 英文」呈現；只有一種語言時只顯示該語言。
- 作品資料新增「作品顯示編號（選填）」欄位，可填 `27`、`A-01` 等。留白時前台依作品排列順序自動編為 `01`、`02`、`03`……，不再公開 Sanity 的內部 UUID。
- 「作品排列順序」控制呈現先後，「作品顯示編號」控制顯示字樣，兩者獨立。
- 新的後台編輯欄位需在本機 `studio/` 執行一次 `npm run deploy`；內容更新仍只需在 Sanity 按 Publish。

## Mobile-first responsive layout (2026-11-18)

The site prioritizes phone use with a separate `responsive.css` loaded after the original desktop stylesheet. This file is included in Vercel `dist` by `build.mjs`.

- Up to 359px: compact header, single-column work gallery.
- 360-599px: two-column uncropped work grid and single-column featured artworks.
- 600-840px: three-column work grid and two-column secondary featured works.
- 841px and above: original desktop art direction, with compact-navigation spacing through 1100px.
- Awards and exhibitions stack vertically on phones/tablets instead of shrinking two columns.
- Gallery filters scroll horizontally without causing page-wide overflow.
- Fullscreen portrait-phone artwork detail viewer with 46px close button, 48px photo controls, horizontal touch swipe, and full-image `object-fit:contain`. On short landscape screens the viewer becomes side-by-side.
- Tap targets and safe-area margins are enlarged for touch screens. Original hand-drawn elder decorations remain purely decorative.
- To check locally: `cd site`, `npm run build`, then `npm start`. Sanity Studio is unchanged.

Smoke-tested using a headless Chromium rendering of the prior local site snapshot at 320, 360, 375, 390, 430, 600, 768, 840 and 1024px (no document-wide horizontal overflow); the production Vercel deployment still needs independent live-browser confirmation.


## 作品排序（由左至右逐列）、統一編號與拖曳管理

網站的「作品全集」使用 CSS Grid，電腦版每列 3 件、較窄桌面每列 2 件，按左至右順序排列，排完一列才到下一列；手機版維持既有 RWD 欄數與完整縮圖。

「作品精選」現在顯示同一件作品在全集的編號（例如 `NO. 07 / FEATURED`），而不是獨立重新從 01 編號；首頁主視覺與作品細節也使用相同的編號函式。

### Sanity 拖曳排序設定（需更新一次 Studio）

1. 更新本機原始碼：在專案根目錄執行 `git pull origin main`。
2. 在 `studio/` 執行 `npm install`，安裝官方 `@sanity/orderable-document-list` 外掛（本專案的 package.json 已列出）；然後 `npm run deploy`。
3. 打開 https://keen-chiang.sanity.studio/ ，選「作品排序（拖曳調整）」。
4. 首次使用時，若提示部分作品沒有排序，從右上角選單點 `Reset Order`（重設排序），讓既有作品建立排序鍵。**第一次 Reset Order 可能會重新排列目前作品，請檢查、再依喜好拖曳調整**；平常換位只需拖曳，不必再 Reset。
5. 「作品管理（新增／編輯）」保留原本作品欄位。新增作品後會在可拖曳列表中出現，可再移到想要的位置。
6. 每件作品的「固定作品編號（選填）」可以填 `07` 或 `A-01`；填了便固定綁定，不受拖曳影響。留空則按作品排序自動連號，拖曳後編號會跟著排序變動。
7. 排列與編號都會用在作品精選、全集、主視覺和作品詳細頁。請確認同一個固定編號不要重複用在兩件作品上。

**過渡保護：** 更新 Studio 後、首次初始化排序之前，前台仍按照舊 `sortOrder` 排列，並依該順序自動編號；只有當所有已發布的作品都具備 `orderRank` 時，才會切換成拖曳排序。

Sanity 後台部署不會刪除原本作品。更新 `studio/package.json` 後請使用 `npm install` 而不是 `npm ci`（第一次會一併更新本機 `package-lock.json`）。
