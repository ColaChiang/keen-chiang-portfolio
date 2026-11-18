import {defineArrayMember, defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const artworkType = defineType({
  name: 'artwork',
  title: '作品',
  type: 'document',
  fields: [
    // Managed automatically by the drag-and-drop list. Do not edit this key.
    orderRankField({type:'artwork'}),
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
    defineField({name:'sortOrder', title:'舊版排序數字（備援）', type:'number', initialValue:999, hidden:true, description:'保留舊資料的排列順序；平常請到「作品排序（拖曳調整）」操作。', validation: Rule => Rule.integer().min(0)}),
    defineField({name:'displayNumber', title:'固定作品編號（選填）', type:'string', description:'例如 07、27、A-01。填寫後會綁定這件畫作，不隨拖曳排序改變；留空則依排列順序顯示 01、02、03……。不用輸入 NO.'}),
    defineField({name:'featured', title:'放到首頁「作品精選」', type:'boolean', initialValue:false}),
    defineField({name:'hero', title:'使用這幅作品作為首頁主視覺', type:'boolean', description:'建議只有一件作品選擇此項', initialValue:false}),
    defineField({name:'legacyId', title:'舊作品編號（匯入用，不需填寫）', type:'number', hidden:true}),
  ],
  preview: {select:{title:'titleZh',subtitle:'titleJa',media:'mainImage'}},
  orderings:[orderRankOrdering,{title:'舊版數字排序',name:'sortOrderAsc',by:[{field:'sortOrder',direction:'asc'}]},{title:'最近創作年份',name:'yearDesc',by:[{field:'year',direction:'desc'}]}]
})
