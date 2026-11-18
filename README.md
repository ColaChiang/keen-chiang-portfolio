# CHIANG KE EN｜蔣哿恩 藝術家個人網站

日系藝術家作品集，作品與經歷透過 Sanity CMS 管理。

- Sanity Studio：https://keen-chiang.sanity.studio/
- Project ID：`zh0kxksu`
- Dataset：`production`

## 網站專案

完整網站包括 `site/`（作品展示）與 `studio/`（Sanity 資料結構）。請將先前下載並解壓縮的完整專案檔案提交至本儲存庫。請勿上傳 `node_modules`、`dist` 或任何含密碼／Token 的 `.env` 檔。

目前本儲存庫只有部分初始檔案；完成完整上傳後才能進行 Vercel 部署。

## Vercel 建議設定

- Framework Preset: Other
- Root Directory: `site`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: `SANITY_PROJECT_ID=zh0kxksu`、`SANITY_DATASET=production`

部署後，請到 Sanity Manage 的 API → CORS Origins，允許實際 Vercel 網站的來源網址。
