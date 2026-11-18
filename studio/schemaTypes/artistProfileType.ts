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
    defineField({name:'education',title:'學歷',type:'string'}),
    defineField({name:'exchange',title:'交流／研修經驗',type:'string'}),
    defineField({name:'contact',title:'公開聯絡方式（選填）',type:'string',description:'可填公開 email 或社群帳號；不填則不顯示聯絡資訊'}),
  ],
  preview:{select:{title:'nameZh',media:'portrait'}},
})
