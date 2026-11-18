/*
 * CHIANG KE EN — artwork archive
 * Sanity has priority once a public project ID is configured.
 * Without it, the embedded portfolio remains usable as a local preview.
 */
(async function () {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const h = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const data = await window.loadPortfolio();
  const works = data.works || [];
  const workById = new Map(works.map(w => [String(w.id), w]));
  const label = category => (data.categoryNames || {})[category] || category || '創作';
  const title = w => w.titleZh || w.titleJa || w.titleEn || w.title || '未命名作品';
  const localDate = new Date().getFullYear();
  const asImages = w => (w.images || []).filter(Boolean);
  const photo = src => src || 'assets/work-01.webp';
  const duo = w => Boolean(w.titleJa && w.titleJa.trim());
  const formatNumber = w => String(w.legacyId || w.id).padStart(2, '0');

  // Preview text intentionally highlights provisional translations until reviewed.
  function japaneseLabel(w, className) {
    return duo(w) ? `<span class="${className}" lang="ja">${h(w.titleJa)}</span>` : '';
  }
  function englishLabel(w, className) {
    return w.titleEn ? `<span class="${className}" lang="en">${h(w.titleEn)}</span>` : '';
  }

  // About: editors may change bio, portrait, practice, education and exchange directly in Sanity.
  const artist = data.artist || {};
  const portrait = $('.about-portrait img');
  if (artist.portrait && portrait) portrait.src = artist.portrait;
  const artistRoman = $('#artist-roman');
  if (artistRoman && artist.nameEn) artistRoman.textContent = artist.nameEn;
  const artistName = $('#artist-name');
  if (artistName) {
    artistName.textContent = artist.nameZh || '蔣哿恩';
    if (artist.nameJa) {
      const span = document.createElement('span');
      span.lang = 'ja';
      span.textContent = '（' + artist.nameJa + '）';
      artistName.append(span);
    }
  }
  const aboutFirst = $('#bio-first');
  if (aboutFirst && artist.bioZh) {
    const paragraphs = artist.bioZh.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
    if (paragraphs.length) {
      aboutFirst.textContent = paragraphs[0];
      const aboutSecond = $('#bio-second');
      if (aboutSecond) {
        aboutSecond.textContent = paragraphs[1] || '';
        aboutSecond.hidden = paragraphs.length < 2;
        let cursor = aboutSecond;
        for (const paragraph of paragraphs.slice(2)) {
          const p = document.createElement('p');
          p.className = 'about-bio'; p.textContent = paragraph;
          cursor.after(p); cursor = p;
        }
      }
    }
  }
  for (const [id,key] of [['artist-practice','practice'],['artist-education','education'],['artist-exchange','exchange']]) {
    if ($( '#' + id) && artist[key]) $('#' + id).textContent = artist[key];
  }
  if ($('#artist-contact')) {
    $('#artist-contact').hidden = !artist.contact;
    if (artist.contact) $('#artist-contact').textContent = `聯絡：${artist.contact}`;
  }

  // Featured works and hero image follow the checkboxes set in the CMS.
  const hero = works.find(w => w.hero) || works.find(w => w.featured) || works[0];
  if (hero) {
    $('#hero-work-image').src = photo(hero.images?.[0]);
    $('#hero-work-image').alt = `蔣哿恩作品《${title(hero)}》`;
    $('#hero-work-number').textContent = `WORK NO. ${formatNumber(hero)}`;
    $('#hero-work-title').textContent = `〈${title(hero)}〉`;
    const heroJapanese = $('#hero-work-title-ja');
    if (heroJapanese) heroJapanese.textContent = hero.titleJa ? ` / ${hero.titleJa}` : ''; 
  }
  const selected = works.filter(w => w.featured);
  const features = (selected.length ? selected : works).slice(0, 3);
  function featureHTML(w, index) {
    if (!w) return '';
    return `<button class="feature-item ${index === 0 ? 'feature-primary' : ''}" type="button" data-open-work="${h(w.id)}" aria-label="查看作品 ${h(title(w))}">
      <div class="feature-image ${index === 2 ? 'feature-image-narrow' : ''}"><img src="${h(photo(asImages(w)[0]))}" alt="作品《${h(title(w))}》" loading="lazy"></div>
      <div class="feature-meta"><span class="feature-id">${String(index+1).padStart(2,'0')} / FEATURED</span>
      <span class="feature-name">${h(title(w))}${japaneseLabel(w,'feature-jp')}</span>
      <span class="feature-arrow" aria-hidden="true">↗</span></div>
    </button>`;
  }
  $('#featured-layout').innerHTML = features.length ? featureHTML(features[0],0) +
    `<div class="feature-secondary">${features.slice(1).map((w, i) => featureHTML(w,i+1)).join('')}</div>` : '';
  $('#selected').hidden = features.length === 0;

  // The bilingual gallery and detailed artworks.
  const grid = $('#works-grid');
  grid.innerHTML = works.length ? works.map(w => `<article class="work-card" data-category="${h(w.category || 'painting')}">
    <button class="work-open" type="button" data-open-work="${h(w.id)}" aria-label="查看作品 ${h(title(w))} 的照片與資料">
      <div class="work-image"><img loading="lazy" src="${h(photo(asImages(w)[0]))}" alt="蔣哿恩作品《${h(title(w))}》"></div>
      <div class="work-topline"><span>NO. ${h(formatNumber(w))}</span><span>${h(label(w.category))}</span></div>
      <h3 class="work-title">${h(title(w))}</h3>
      ${japaneseLabel(w,'work-title-ja')}${englishLabel(w,'work-title-en')}
      <p class="work-caption">${h(w.size || w.material || '作品資料待補')} ${w.year ? `<span class="work-year">${h(w.year)}</span>` : ''}</p>
    </button>
  </article>`).join('') : '<p class="works-empty">目前尚未發布作品。</p>';

  const filterButtons = $$('.work-filters button');
  function setFilter(value, selectedButton) {
    const count = value === 'all' ? works.length : works.filter(w => w.category === value).length;
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button === selectedButton)));
    $$('.work-card', grid).forEach(card => card.hidden = value !== 'all' && card.dataset.category !== value);
    $('#gallery-count').textContent = `${count} ${count === 1 ? 'WORK' : 'WORKS'}`;
  }
  filterButtons.forEach(button => {
    const filter = button.dataset.filter;
    const count = filter === 'all' ? works.length : works.filter(w => w.category === filter).length;
    $('span', button).textContent = count;
    button.addEventListener('click', () => setFilter(filter,button));
  });
  $('#gallery-count').textContent = `${works.length} WORKS`;

  // Exhibition and award entries share one list: never split into tabs or year headings.
  const experienceRows = data.source === 'sanity' ? [...(data.experiences || [])] : [
    ...data.exhibitions.flatMap(g => g.items.map((text, idx) => ({year: Number(g.year), text, sortOrder:idx,kind:'exhibition'}))),
    ...data.awards.flatMap(g => g.items.map((text, idx) => ({year: Number(g.year), text, sortOrder:100+idx,kind:'award'})))
  ];
  experienceRows.sort((a,b) => Number(b.year)-Number(a.year) || (a.sortOrder ?? 0)-(b.sortOrder ?? 0));
  $('#experience-list').innerHTML = experienceRows.length ? experienceRows.map(item => `<li class="experience-item">
     <time class="experience-year" datetime="${h(item.year)}">${h(item.year)}</time>
     <span class="experience-text">${h(item.text)}</span>
   </li>`).join('') : '<li class="experience-item">目前尚無公開紀錄</li>';

  // Accessible artwork dialog: main picture, any detail images, bilingual names, material, size and year.
  const dialog = $('#work-dialog');
  const modalImg = $('#dialog-image');
  const thumbs = $('#dialog-thumbnails');
  const prev = $('#image-prev');
  const next = $('#image-next');
  let activeWork = null, activeImage = 0, previousFocus = null;
  function setImage(index) {
    if (!activeWork) return;
    const images = asImages(activeWork);
    activeImage = Math.max(0, Math.min(index, images.length - 1));
    modalImg.src = photo(images[activeImage]);
    modalImg.alt = `《${title(activeWork)}》作品照片 ${activeImage+1}，共 ${images.length} 張`;
    $('#image-counter').textContent = `${activeImage + 1} / ${images.length}`;
    prev.disabled = activeImage === 0;
    next.disabled = activeImage === images.length - 1;
    $$('.dialog-thumbnails button', dialog).forEach((button,idx)=>button.setAttribute('aria-pressed',String(idx===activeImage)));
  }
  function openWork(id) {
    const work = workById.get(String(id));
    if (!work || !dialog.showModal) return;
    activeWork=work; activeImage=0; previousFocus=document.activeElement;
    $('#dialog-number').textContent = `WORK NO. ${formatNumber(work)}`;
    $('#dialog-title').textContent = title(work);
    $('#dialog-title-ja').textContent = duo(work) ? work.titleJa : '';
    $('#dialog-title-ja').hidden = !duo(work);
    $('#dialog-title-en').textContent = work.titleEn || '';
    $('#dialog-title-en').hidden = !work.titleEn;
    $('#dialog-category').textContent = label(work.category);
    // Give Japanese material as a second line only when there is an actual translation.
    const material = $('#dialog-material');
    material.textContent = work.mediumZh || work.material || work.mediumJa || '未標註';
    if (work.mediumJa && work.mediumJa !== material.textContent) {
      const small = document.createElement('span'); small.className = 'material-jp'; small.lang='ja'; small.textContent=work.mediumJa; material.append(small);
    }
    $('#dialog-size').textContent = work.size || '未標註';
    $('#dialog-year').textContent = work.year || '未提供';
    const images=asImages(work);
    thumbs.innerHTML = images.map((src,i)=>`<button type="button" data-image-index="${i}" aria-label="查看第 ${i+1} 張照片" aria-pressed="false"><img src="${h(src)}" alt=""></button>`).join('');
    thumbs.hidden=images.length<2;
    setImage(0);
    dialog.showModal(); document.body.style.overflow='hidden'; $('#dialog-close').focus();
  }
  document.addEventListener('click', event => {
    const opener = event.target.closest('[data-open-work]');
    if (opener) openWork(opener.dataset.openWork);
  });
  thumbs.addEventListener('click',e=>{const target=e.target.closest('[data-image-index]'); if(target)setImage(Number(target.dataset.imageIndex));});
  prev.addEventListener('click',()=>setImage(activeImage-1));
  next.addEventListener('click',()=>setImage(activeImage+1));
  $('#dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'){e.preventDefault();setImage(activeImage-1);}
    if(e.key==='ArrowRight'){e.preventDefault();setImage(activeImage+1);}
  });
  dialog.addEventListener('close',()=>{
    document.body.style.overflow='';
    if(previousFocus && previousFocus.isConnected) previousFocus.focus();
    activeWork=null;
  });

  // Mobile menu.
  const mobileToggle = $('#mobile-toggle'), mobileNav = $('#mobile-nav');
  function setMenuOpen(open){mobileToggle.setAttribute('aria-expanded',String(open));mobileToggle.setAttribute('aria-label',open?'關閉導覽選單':'開啟導覽選單');mobileNav.hidden=!open;}
  mobileToggle.addEventListener('click',()=>setMenuOpen(mobileNav.hidden));
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>setMenuOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && !mobileNav.hidden)setMenuOpen(false);});
  window.addEventListener('resize',()=>{if(window.innerWidth>840 && !mobileNav.hidden)setMenuOpen(false);});
  console.info(`[CHIANG KE EN] ${works.length} works / ${experienceRows.length} experiences / source: ${data.source} / ${localDate}`);
})().catch(err=>console.error('[CHIANG KE EN] 網站初始化失敗：',err));
