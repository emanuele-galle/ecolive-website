import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Impostazioni Sito',
  admin: {
    group: 'Configurazione',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Homepage',
          fields: [
            {
              name: 'heroType',
              type: 'select',
              label: 'Tipo Hero',
              defaultValue: 'image',
              options: [
                { label: 'Immagine', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine Hero',
              admin: {
                condition: (data) => data.heroType === 'image',
              },
            },
            {
              name: 'heroVideo',
              type: 'upload',
              relationTo: 'media',
              label: 'Video Hero (MP4/WebM)',
              admin: {
                condition: (data) => data.heroType === 'video',
                description: 'Carica un video MP4 o WebM. Consigliato: max 15MB, 1920x1080, 30fps',
              },
            },
            {
              name: 'heroVideoPoster',
              type: 'upload',
              relationTo: 'media',
              label: 'Poster Video (fallback)',
              admin: {
                condition: (data) => data.heroType === 'video',
                description: 'Immagine mostrata mentre il video si carica',
              },
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Titolo Hero',
              defaultValue: 'In soli 30 giorni la Casa dei tuoi Sogni diventa Realtà',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Sottotitolo Hero',
              defaultValue: 'Case prefabbricate in legno di alta qualità, sostenibili e personalizzabili. Costruiamo il tuo futuro con tecnologia X-Frame.',
            },
          ],
        },
        {
          label: 'Contatti',
          fields: [
            {
              name: 'phone1',
              type: 'text',
              label: 'Telefono principale',
              defaultValue: '+39 0963 1951395',
            },
            {
              name: 'phone2',
              type: 'text',
              label: 'Telefono secondario',
              defaultValue: '+39 327 6473099',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email principale',
              defaultValue: 'info@ecolive.srl',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Indirizzo',
              defaultValue: 'Via Conte Ruggiero, 128\n89822 Spadola (VV), Calabria',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
            {
              name: 'youtube',
              type: 'text',
              label: 'YouTube URL',
            },
          ],
        },
      ],
    },
  ],
}
