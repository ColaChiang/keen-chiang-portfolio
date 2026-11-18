import {defineField, defineType} from 'sanity'

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
      name:'academicSummary',title:'學歷與研修（每行一筆）',type:'text',rows:4,
      description:'直接輸入完整文字，換行就會在網站上變成下一筆。依序填寫學校、系所、身分與時間。',
      initialValue:"臺灣 國立臺灣藝術大學 書畫藝術學系 學士（2020.09～2024.06）\n臺灣 國立臺灣藝術大學 書畫藝術學系 碩士（2024.09～就讀中）\n日本 筑波大學 藝術學學位學程 特別研究學生（2026.09～2027.09）"
    }),
    defineField({name:'education',title:'舊學歷文字（保留備份）',type:'string',hidden:true}),
    defineField({name:'exchange',title:'舊交流文字（保留備份）',type:'string',hidden:true}),
    defineField({name:'contact',title:'公開聯絡方式（選填）',type:'string',description:'可填公開 email 或社群帳號；不填則不顯示聯絡資訊'}),
  ],
  preview:{select:{title:'nameZh',media:'portrait'}},
})
