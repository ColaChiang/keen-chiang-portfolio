import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'zh0kxksu'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: '蔣哿恩｜作品管理',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) => S.list().id('content-management').title('內容管理').items([
        S.listItem().title('藝術家介紹').id('artist-profile-singleton')
          .child(S.document().schemaType('artistProfile').documentId('artist-profile').title('藝術家介紹')),
        S.divider(),
        S.documentTypeListItem('artwork').title('作品管理（新增／編輯）'),
        orderableDocumentListDeskItem({type:'artwork', title:'作品排序（拖曳調整）', id:'artwork-order', S, context, createIntent:false}),
        S.documentTypeListItem('experience').title('展覽與獲獎紀錄'),
      ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(t => t.schemaType !== 'artistProfile'),
  },
})
