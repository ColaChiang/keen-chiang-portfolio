import {defineArrayMember, defineField, defineType} from 'sanity'

// The same simple form is used for formal education and visiting research.
const academicRecord = defineArrayMember({
  name: 'academicRecord',
  title: '學習／研修經歷',
  type: 'object',
  fields: [
    defineField({name:'school',title:'學校名稱',type:'string',validation:Rule=>Rule.required(),description:'例：國立臺灣藝術大學、日本・筑波大學'}),
    defineField({name:'program',title:'系所／學程（中文）',type:'string',description:'例：書畫藝術學系；人間綜合科學研究群・藝術學學位學程'}),
    defineField({name:'programJa',title:'系所／學程（日文，選填）',type:'string',description:'例：人間総合科学研究群・芸術学学位プログラム'}),
    defineField({name:'degree',title:'學位／身分',type:'string',description:'例：學士、碩士、特別研究學生'}),
    defineField({name:'period',title:'就讀／研修期間',type:'string',description:'例：2020.09 — 2024.06 或 2024.09 — 就讀中'}),
  ],
  preview: {
    select:{title:'school',program:'program',degree:'degree',period:'period'},
    prepare({title,program,degree,period}) {
      return {title:title||'未填學校',subtitle:[program,degree,period].filter(Boolean).join(' · ')}
    }
  }
})

export const artistProfileType = defineType({
  name:'artistProfile', title:'藝術家介紹', type:'document',
  fields:[
    defineField({name:'nameZh',title:'中文姓名',type:'string',validation:Rule=>Rule.required()}),
    defineField({name:'nameEn',title:'英文姓名',type:'string'}),
    defineField({name:'nameJa',title:'日文姓名',type:'string'}),
    defineField({name:'portrait',title:'人物照片',type:'image',options:{hotspot:true}}),
    defineField({name:'bioZh',title:'藝術家介紹｜中文',type:'text',rows:6,description:'不同段落請空一行'}),
    defineField({name:'bioJa',title:'藝術家介紹｜日文（選填）',type:'text',rows:5}),
    defineField({name:'practice',title:'創作領域',type:'string'}),
    defineField({
      name:'educationHistory', title:'學歷（可新增多筆）', type:'array',
      description:'學士、碩士各一筆。按「新增項目」可加入新學校，拖曳以調整順序。',
      of:[academicRecord]
    }),
    defineField({
      name:'exchangeHistory', title:'海外研修／交流經驗（可新增多筆）', type:'array',
      description:'例：日本・筑波大學｜藝術學學位學程｜特別研究學生｜2026.09 — 2027.09。',
      of:[academicRecord]
    }),
    // Old plain-text fields are kept in stored documents as a backup.
    defineField({name:'education',title:'舊學歷文字（保留備份）',type:'string',hidden:true}),
    defineField({name:'exchange',title:'舊交流文字（保留備份）',type:'string',hidden:true}),
    defineField({name:'contact',title:'公開聯絡方式（選填）',type:'string',description:'可填公開 email 或社群帳號；不填則不顯示聯絡資訊'}),
  ],
  preview:{select:{title:'nameZh',media:'portrait'}},
})
