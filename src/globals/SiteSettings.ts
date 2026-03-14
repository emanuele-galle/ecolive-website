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
              defaultValue: 'La tua casa, in un giorno',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Sottotitolo Hero',
              defaultValue: 'EcoLive progetta, produce e costruisce case prefabbricate in legno con il sistema X-Frame. Struttura montata in 1 giornata, classe energetica A4, garanzia 50 anni.',
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
              defaultValue: '(0963) 530945',
            },
            {
              name: 'phone2',
              type: 'text',
              label: 'Telefono secondario',
              defaultValue: '366.2037106',
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
