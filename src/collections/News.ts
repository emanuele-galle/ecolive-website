import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    group: 'Contenuti',
    defaultColumns: ['title', 'publishedDate', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titolo',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug URL',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Data pubblicazione',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine in evidenza',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Estratto',
      admin: {
        description: 'Breve descrizione per anteprime (max 200 caratteri)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenuto',
      required: true,
    },
    {
      name: 'tags',
      type: 'select',
      label: 'Tag',
      hasMany: true,
      options: [
        { label: 'Bioedilizia', value: 'bioedilizia' },
        { label: 'Sostenibilità', value: 'sostenibilita' },
        { label: 'Innovazione', value: 'innovazione' },
        { label: 'Progetti', value: 'progetti' },
        { label: 'Eventi', value: 'eventi' },
        { label: 'Normative', value: 'normative' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Stato',
      options: [
        { label: 'Bozza', value: 'draft' },
        { label: 'Pubblicato', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
