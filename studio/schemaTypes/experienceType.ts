import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name:'experience', title:'展覽與獲獎', type:'document',
  fields:[
    defineField({name:'year',title:'年份',type:'number',validation:Rule=>Rule.required().integer().min(1900).max(2100)}),
    defineField({name:'text',title:'經歷文字',type:'string',validation:Rule=>Rule.required()}),
    defineField({name:'kind',title:'紀錄分類（獲獎／展覽）',type:'string',options:{list:[{title:'展覽',value:'exhibition'},{title:'獲獎',value:'award'}],layout:'radio'},initialValue:'exhibition'}),
    defineField({name:'showOnWebsite',title:'顯示在網站上',type:'boolean',initialValue:true,description:'可手動公開原先未列入網站精選的展覽或隱藏經歷。'}),
    defineField({name:'displayOrder',title:'網站清單順序（數字越小越前面）',type:'number',description:'選填。初次匯入的經歷依網站預設順序顯示；新經歷未填時會排在該欄最後。'}),
    defineField({name:'sortOrder',title:'同年份顯示順序（越小越前面）',type:'number',initialValue:100}),
  ],
  preview:{select:{title:'text',subtitle:'year'}},
  orderings:[{title:'年份由新到舊',name:'newest',by:[{field:'year',direction:'desc'},{field:'sortOrder',direction:'asc'}]}]
})
