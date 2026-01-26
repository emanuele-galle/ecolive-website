import { GalleryImage } from '@/types/gallery'

// Metadata mapping with luxury-themed naming
const projectMetadata: Record<string, { location: string; area: number; category: 'villa' | 'modern' | 'coastal' | 'urban' }> = {
  'baqueira': { location: 'Alpine Prestige Villa', area: 240, category: 'villa' },
  'barcelona': { location: 'Metropolitan Distinguished', area: 180, category: 'urban' },
  'masias': { location: 'Prestige Estate', area: 300, category: 'villa' },
  'masnou': { location: 'Distinguished Urban', area: 170, category: 'urban' },
  'denia': { location: 'Mediterranean Signature', area: 220, category: 'coastal' },
  'santa-barbara': { location: 'Elite Modern Residence', area: 200, category: 'modern' },
  'zamora': { location: 'Elite Contemporary', area: 190, category: 'modern' },
  'calvia': { location: 'Coastal Prestige', area: 280, category: 'coastal' },
  'sevilla': { location: 'Heritage Prestige', area: 230, category: 'villa' },
  'rubi': { location: 'Elite Urban Villa', area: 250, category: 'modern' },
  'paterna': { location: 'Modern Elite', area: 200, category: 'modern' },
  'figueres': { location: 'Imperial Villa', area: 300, category: 'villa' },
  'sotogrande': { location: 'Signature Coastal Estate', area: 350, category: 'coastal' },
  'tarifa': { location: 'Coastal Signature', area: 160, category: 'coastal' },
  'tiana': { location: 'Metropolitan Elite', area: 190, category: 'urban' }
}

export const luxuryGalleryImages: GalleryImage[] = [
  // Baqueira (2 images: #1, #3)
  {
    id: '1',
    src: '/images/luxury/gallery-1.jpg',
    alt: 'Alpine Prestige Villa with mountain views',
    ...projectMetadata['baqueira']
  },
  {
    id: '3',
    src: '/images/luxury/gallery-3.jpg',
    alt: 'Alpine Prestige Villa exterior design',
    ...projectMetadata['baqueira']
  },

  // Barcelona (2 images: #4, #7)
  {
    id: '4',
    src: '/images/luxury/gallery-4.jpg',
    alt: 'Metropolitan Distinguished residence',
    ...projectMetadata['barcelona']
  },
  {
    id: '7',
    src: '/images/luxury/gallery-7.jpg',
    alt: 'Metropolitan Distinguished facade',
    ...projectMetadata['barcelona']
  },

  // Masias (2 images: #8, #12)
  {
    id: '8',
    src: '/images/luxury/gallery-8.jpg',
    alt: 'Prestige Estate with pool',
    ...projectMetadata['masias']
  },
  {
    id: '12',
    src: '/images/luxury/gallery-12.jpg',
    alt: 'Prestige Estate exterior',
    ...projectMetadata['masias']
  },

  // Denia (1 image: #13)
  {
    id: '13',
    src: '/images/luxury/gallery-13.jpg',
    alt: 'Mediterranean Signature villa',
    ...projectMetadata['denia']
  },

  // Santa Barbara (2 images: #17, #21)
  {
    id: '17',
    src: '/images/luxury/gallery-17.jpg',
    alt: 'Elite Modern Residence',
    ...projectMetadata['santa-barbara']
  },
  {
    id: '21',
    src: '/images/luxury/gallery-21.jpg',
    alt: 'Elite Modern Residence with porche',
    ...projectMetadata['santa-barbara']
  },

  // Zamora (1 image: #22)
  {
    id: '22',
    src: '/images/luxury/gallery-22.jpg',
    alt: 'Elite Contemporary house',
    ...projectMetadata['zamora']
  },

  // Calvia (1 image: #25)
  {
    id: '25',
    src: '/images/luxury/gallery-25.jpg',
    alt: 'Coastal Prestige with natural stone',
    ...projectMetadata['calvia']
  },

  // Sevilla (1 image: #27)
  {
    id: '27',
    src: '/images/luxury/gallery-27.jpg',
    alt: 'Heritage Prestige villa',
    ...projectMetadata['sevilla']
  },

  // Rubi (2 images: #28, #31)
  {
    id: '28',
    src: '/images/luxury/gallery-28.jpg',
    alt: 'Elite Urban Villa with overhang',
    ...projectMetadata['rubi']
  },
  {
    id: '31',
    src: '/images/luxury/gallery-31.jpg',
    alt: 'Elite Urban Villa model',
    ...projectMetadata['rubi']
  },

  // Paterna (1 image: #32)
  {
    id: '32',
    src: '/images/luxury/gallery-32.jpg',
    alt: 'Modern Elite facade',
    ...projectMetadata['paterna']
  },

  // Masnou (1 image: #35)
  {
    id: '35',
    src: '/images/luxury/gallery-35.jpg',
    alt: 'Distinguished Urban residence',
    ...projectMetadata['masnou']
  },

  // Figueres (2 images: #37, #42)
  {
    id: '37',
    src: '/images/luxury/gallery-37.jpg',
    alt: 'Imperial Villa luxury house',
    ...projectMetadata['figueres']
  },
  {
    id: '42',
    src: '/images/luxury/gallery-42.jpg',
    alt: 'Imperial Villa exterior',
    ...projectMetadata['figueres']
  },

  // Sotogrande (2 images: #43, #45)
  {
    id: '43',
    src: '/images/luxury/gallery-43.jpg',
    alt: 'Signature Coastal Estate',
    ...projectMetadata['sotogrande']
  },
  {
    id: '45',
    src: '/images/luxury/gallery-45.jpg',
    alt: 'Signature Coastal Estate with porche',
    ...projectMetadata['sotogrande']
  },

  // Tarifa (1 image: #46)
  {
    id: '46',
    src: '/images/luxury/gallery-46.jpg',
    alt: 'Coastal Signature single storey',
    ...projectMetadata['tarifa']
  },

  // Tiana (1 image: #49)
  {
    id: '49',
    src: '/images/luxury/gallery-49.jpg',
    alt: 'Metropolitan Elite facade',
    ...projectMetadata['tiana']
  }
]
