# CHIANG KE EN｜蔣哿恩 藝術家個人網站

日系留白風格的藝術家作品網站，使用 Sanity CMS 維護作品、照片、展覽與獲獎紀錄。

- Sanity Studio：[keen-chiang.sanity.studio](https://keen-chiang.sanity.studio/)
- Sanity Project ID：`zh0kxksu`
- Dataset：`production`

## 網站部署

使用 Vercel 匯入此 GitHub Repository，將 **Root Directory** 設為 `site`，Framework Preset 設為 **Other**，Build Command 為 `npm run build`，Output Directory 為 `dist`。

在 Vercel Environment Variables 新增：

- `SANITY_PROJECT_ID=zh0kxksu`
- `SANITY_DATASET=production`

Sanity Studio 用自己的 Sanity 帳號管理，網站只使用公開的已發布資料，不要將 API token、密碼或本機 `.env` 檔案上傳到 GitHub。

> 目前正在上傳網站程式及圖片，請在完整檔案上傳後再進行 Vercel 部署。
