import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Contenuti',
    defaultColumns: ['title', 'category', 'location', 'year', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nome Progetto',
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
      name: 'category',
      type: 'select',
      label: 'Categoria',
      required: true,
      options: [
        { label: 'Residenziale', value: 'residenziale' },
        { label: 'Bungalow', value: 'bungalow' },
        { label: 'Commerciale', value: 'commerciale' },
        { label: 'Ristrutturazione', value: 'ristrutturazione' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine principale',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galleria immagini',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descrizione',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          label: 'Località',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'year',
          type: 'number',
          label: 'Anno',
          min: 1990,
          max: 2030,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'area',
          type: 'number',
          label: 'Superficie (mq)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'floors',
          type: 'number',
          label: 'Piani',
          min: 1,
          max: 5,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Caratteristiche',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Caratteristica',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'select',
      label: 'Certificazioni',
      hasMany: true,
      options: [
        { label: 'Passive House', value: 'passive-house' },
        { label: 'Casa Clima', value: 'casa-clima' },
        { label: 'ARCA', value: 'arca' },
        { label: 'Classe A+', value: 'classe-a-plus' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL Video (YouTube)',
      admin: {
        description: 'Inserisci URL completo del video YouTube',
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
