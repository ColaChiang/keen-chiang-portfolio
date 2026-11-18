/**
 * One-time, idempotent initialization for the artist's academic history.
 *
 * Run from studio/: npm run init:history
 * Uses the account you logged in to locally. Never paste/share tokens.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion:'2025-02-19'})
const id = 'artist-profile'
const profile = await client.getDocument(id)
if (!profile) throw new Error('找不到 artist-profile，請確認已匯入原始資料。')

const educationHistory = [
  {_type:'academicRecord',_key:'ntua-mfa-2024',school:'國立臺灣藝術大學',program:'書畫藝術學系',degree:'碩士',period:'2024.09 — 就讀中'},
  {_type:'academicRecord',_key:'ntua-ba-2020',school:'國立臺灣藝術大學',program:'書畫藝術學系',degree:'學士',period:'2020.09 — 2024.06'},
]
const exchangeHistory = [
  {_type:'academicRecord',_key:'tsukuba-2026',school:'日本・筑波大學',program:'人間綜合科學研究群・藝術學學位學程',programJa:'人間総合科学研究群・芸術学学位プログラム',degree:'特別研究學生',period:'2026.09 — 2027.09'},
]
const oldBio = '臺灣藝術創作者，畢業於國立臺灣藝術大學書畫藝術學系，於同系碩士班持續創作，並曾赴日本筑波大學交換研修。'
const newBio = '臺灣藝術創作者，畢業於國立臺灣藝術大學書畫藝術學系，於同系碩士班持續創作，並於日本筑波大學以特別研究學生身分研修。'
const needEducation = !Array.isArray(profile.educationHistory)
const needExchange = !Array.isArray(profile.exchangeHistory)
const needBio = typeof profile.bioZh === 'string' && profile.bioZh.startsWith(oldBio)

if (!needEducation && !needExchange && !needBio) {
  console.log('已有學歷與研修資料，無須修改。')
} else {
  // setIfMissing never overwrites an existing editable history list.
  let patch = client.patch(id).setIfMissing({educationHistory,exchangeHistory})
  if (needBio) patch = patch.set({bioZh:profile.bioZh.replace(oldBio,newBio)})
  await patch.commit()
  console.log('已更新學歷與海外研修（只補缺少欄位、不更動已填寫的經歷）。')
  console.log('請至 https://keen-chiang.sanity.studio/ 查看並確認。')
}
