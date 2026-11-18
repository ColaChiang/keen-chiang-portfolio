/* Sanity 公開資料：只查詢已發佈的文件，永遠不把登入憑證放在前端。 */
window.loadPortfolio = async function loadPortfolio() {
  const local = window.PORTFOLIO_DATA;
  const config = window.SANITY_CONFIG || {};
  if (!/^[a-z0-9-]{4,32}$/.test(config.projectId || '') || config.projectId === 'YOUR_PROJECT_ID') {
    return {...local, source: 'local'};
  }
  const query = `{
    "works": *[_type == "artwork"] | order(sortOrder asc, _createdAt asc) {
      _id, legacyId, titleZh, titleJa, titleEn, mediumZh, mediumJa,
      size, year, category, sortOrder, featured, hero,
      "mainImageUrl": mainImage.asset->url,
      "detailImageUrls": detailImages[].asset->url
    },
    "experiences": *[_type == "experience"] | order(year desc, sortOrder asc, _createdAt asc) {
      _id, year, text, kind, sortOrder, displayOrder, showOnWebsite
    },
    "artist": *[_type == "artistProfile" && _id == "artist-profile"][0] {
      nameZh, nameEn, nameJa, bioZh, bioJa, practice, contact, academicSummary,
      "portrait": portrait.asset->url
    }
  }`;
  const url = new URL(`https://${config.projectId}.apicdn.sanity.io/v${config.apiVersion || '2025-02-19'}/data/query/${config.dataset || 'production'}`);
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', 'published');
  try {
    const response = await fetch(url, {headers: {Accept: 'application/json'}, cache: 'no-cache'});
    if (!response.ok) throw new Error(`Content API HTTP ${response.status}`);
    const payload = await response.json();
    if (!payload || !payload.result || !Array.isArray(payload.result.works)) throw new Error('Content API invalid response');
    const r = payload.result;
    const works = r.works
      .filter(w => w.mainImageUrl)
      .map(w => ({
        ...w,
        id: String(w.legacyId || w._id),
        title: w.titleZh || w.titleJa || w.titleEn || '未命名作品',
        material: w.mediumZh || w.mediumJa || '',
        images: [w.mainImageUrl, ...(w.detailImageUrls || []).filter(Boolean)],
        year: w.year || null
      }));
    return {
      ...local,
      works,
      experiences: (r.experiences || []).map(e => ({_id: e._id, year: e.year, text: e.text, kind: e.kind, sortOrder: e.sortOrder, displayOrder: e.displayOrder, showOnWebsite: e.showOnWebsite})),
      artist: r.artist ? {
        ...local.artist,
        ...r.artist,
        academicSummary: typeof r.artist.academicSummary === 'string' && r.artist.academicSummary.trim()
          ? r.artist.academicSummary : local.artist.academicSummary
      } : local.artist,
      source: 'sanity'
    };
  } catch (err) {
    console.warn('[CHIANG KE EN] Sanity 連線失敗，顯示離線預覽資料。', err);
    return {...local, source: 'fallback', sourceError: String(err)};
  }
};
