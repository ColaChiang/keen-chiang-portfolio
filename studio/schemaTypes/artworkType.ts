import {defineArrayMember, defineField, defineType} from 'sanity'

export const artworkType = defineType({
  name: 'artwork',
  title: '作品',
  type: 'document',
  fields: [
    defineField({name:'titleZh', title:'作品名稱｜中文', type:'string', description:'正式公開前請由藝術家確認中文譯名', validation: Rule => Rule.required()}),
    defineField({name:'titleJa', title:'作品名稱｜日文', type:'string', description:'盡量保留作品原本日文名稱', validation: Rule => Rule.required()}),
    defineField({name:'titleEn', title:'作品名稱｜英文（選填）', type:'string'}),
    defineField({name:'mainImage', title:'主照片（必填）', type:'image', options:{hotspot:true}, validation: Rule => Rule.required()}),
    defineField({name:'detailImages', title:'細節照片（可多張）', type:'array', of:[defineArrayMember({type:'image', options:{hotspot:true}})]}),
    defineField({name:'mediumZh', title:'媒材｜中文', type:'string', description:'例如：紙、水干顏料、岩繪具、銀箔'}),
    defineField({name:'mediumJa', title:'媒材｜日文（選填）', type:'string'}),
    defineField({name:'size', title:'尺寸', type:'string', description:'例如：65 × 100 cm'}),
    defineField({name:'year', title:'年代（創作年份）', type:'number', description:'例如：2025；不確定可留空', validation: Rule => Rule.integer().min(1900).max(2100)}),
    defineField({name:'category', title:'作品分類', type:'string', options:{list:[
      {title:'繪畫', value:'painting'}, {title:'複合・空間', value:'mixed'}, {title:'工藝・印章', value:'craft'}
    ], layout:'radio'}, initialValue:'painting'}),
    defineField({name:'sortOrder', title:'排序數字（越小越前面）', type:'number', initialValue:999, validation: Rule => Rule.integer().min(0)}),
    defineField({name:'featured', title:'放到首頁「作品精選」', type:'boolean', initialValue:false}),
    defineField({name:'hero', title:'使用這幅作品作為首頁主視覺', type:'boolean', description:'建議只有一件作品選擇此項', initialValue:false}),
    defineField({name:'legacyId', title:'舊作品編號（匯入用，不需填寫）', type:'number', hidden:true}),
  ],
  preview: {select:{title:'titleZh',subtitle:'titleJa',media:'mainImage'}},
  orderings:[{title:'自訂排序',name:'sortOrderAsc',by:[{field:'sortOrder',direction:'asc'}]},{title:'最近創作年份',name:'yearDesc',by:[{field:'year',direction:'desc'}]}]
})
