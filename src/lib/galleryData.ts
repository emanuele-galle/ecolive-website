import { GalleryImage } from '@/types/gallery'

// Metadata mapping from filename analysis
const projectMetadata: Record<string, { location: string; area: number; category: 'villa' | 'modern' | 'coastal' | 'urban' }> = {
  'baqueira': { location: 'Baqueira', area: 240, category: 'villa' },
  'barcelona': { location: 'Barcelona', area: 180, category: 'urban' },
  'masias': { location: 'Masias', area: 300, category: 'villa' },
  'masnou': { location: 'Masnou', area: 170, category: 'urban' },
  'denia': { location: 'Denia', area: 220, category: 'coastal' },
  'santa-barbara': { location: 'Santa Barbara', area: 200, category: 'modern' },
  'zamora': { location: 'Zamora', area: 190, category: 'modern' },
  'calvia': { location: 'Calvia', area: 280, category: 'coastal' },
  'sevilla': { location: 'Sevilla', area: 230, category: 'villa' },
  'rubi': { location: 'Rubi', area: 250, category: 'modern' },
  'paterna': { location: 'Paterna', area: 200, category: 'modern' },
  'figueres': { location: 'Figueres', area: 300, category: 'villa' },
  'sotogrande': { location: 'Sotogrande', area: 350, category: 'coastal' },
  'tarifa': { location: 'Tarifa', area: 160, category: 'coastal' },
  'tiana': { location: 'Tiana', area: 190, category: 'urban' }
}

export const luxuryGalleryImages: GalleryImage[] = [
  // Baqueira (1-3)
  {
    id: '1',
    src: '/images/luxury/gallery-1.jpg',
    alt: 'Luxury modular house in Baqueira',
    ...projectMetadata['baqueira']
  },
  {
    id: '2',
    src: '/images/luxury/gallery-2.jpg',
    alt: 'Baqueira luxury modular house model',
    ...projectMetadata['baqueira']
  },
  {
    id: '3',
    src: '/images/luxury/gallery-3.jpg',
    alt: 'Baqueira luxury modular house exterior',
    ...projectMetadata['baqueira']
  },

  // Barcelona (4-7)
  {
    id: '4',
    src: '/images/luxury/gallery-4.jpg',
    alt: 'Industrialised design house in Barcelona',
    ...projectMetadata['barcelona']
  },
  {
    id: '5',
    src: '/images/luxury/gallery-5.jpg',
    alt: 'Barcelona modern house with porche',
    ...projectMetadata['barcelona']
  },
  {
    id: '6',
    src: '/images/luxury/gallery-6.jpg',
    alt: 'Barcelona industrialised house model',
    ...projectMetadata['barcelona']
  },
  {
    id: '7',
    src: '/images/luxury/gallery-7.jpg',
    alt: 'Barcelona design house facade',
    ...projectMetadata['barcelona']
  },

  // Masias (8-12)
  {
    id: '8',
    src: '/images/luxury/gallery-8.jpg',
    alt: 'Luxury concrete house Masias model',
    ...projectMetadata['masias']
  },
  {
    id: '9',
    src: '/images/luxury/gallery-9.jpg',
    alt: 'Masias concrete house with overhang',
    ...projectMetadata['masias']
  },
  {
    id: '10',
    src: '/images/luxury/gallery-10.jpg',
    alt: 'Masias villa with swimming pool',
    ...projectMetadata['masias']
  },
  {
    id: '11',
    src: '/images/luxury/gallery-11.jpg',
    alt: 'Masias luxury house swimming pool view',
    ...projectMetadata['masias']
  },
  {
    id: '12',
    src: '/images/luxury/gallery-12.jpg',
    alt: 'Masias concrete house exterior',
    ...projectMetadata['masias']
  },

  // Denia (13-16)
  {
    id: '13',
    src: '/images/luxury/gallery-13.jpg',
    alt: 'Luxury house in Denia',
    ...projectMetadata['denia']
  },
  {
    id: '14',
    src: '/images/luxury/gallery-14.jpg',
    alt: 'Denia concrete luxury house',
    ...projectMetadata['denia']
  },
  {
    id: '15',
    src: '/images/luxury/gallery-15.jpg',
    alt: 'Denia luxury villa exterior',
    ...projectMetadata['denia']
  },
  {
    id: '16',
    src: '/images/luxury/gallery-16.jpg',
    alt: 'Denia modern house design',
    ...projectMetadata['denia']
  },

  // Santa Barbara (17-21)
  {
    id: '17',
    src: '/images/luxury/gallery-17.jpg',
    alt: 'Luxury modular house Santa Barbara',
    ...projectMetadata['santa-barbara']
  },
  {
    id: '18',
    src: '/images/luxury/gallery-18.jpg',
    alt: 'Santa Barbara modular house exterior',
    ...projectMetadata['santa-barbara']
  },
  {
    id: '19',
    src: '/images/luxury/gallery-19.jpg',
    alt: 'Santa Barbara house model',
    ...projectMetadata['santa-barbara']
  },
  {
    id: '20',
    src: '/images/luxury/gallery-20.jpg',
    alt: 'Santa Barbara luxury villa',
    ...projectMetadata['santa-barbara']
  },
  {
    id: '21',
    src: '/images/luxury/gallery-21.jpg',
    alt: 'Santa Barbara house with porche',
    ...projectMetadata['santa-barbara']
  },

  // Zamora (22-24)
  {
    id: '22',
    src: '/images/luxury/gallery-22.jpg',
    alt: 'Modern prefabricated concrete house Zamora',
    ...projectMetadata['zamora']
  },
  {
    id: '23',
    src: '/images/luxury/gallery-23.jpg',
    alt: 'Zamora house with porche',
    ...projectMetadata['zamora']
  },
  {
    id: '24',
    src: '/images/luxury/gallery-24.jpg',
    alt: 'Zamora prefabricated house exterior',
    ...projectMetadata['zamora']
  },

  // Calvia (25-26)
  {
    id: '25',
    src: '/images/luxury/gallery-25.jpg',
    alt: 'Modular house luxury natural stone Calvia',
    ...projectMetadata['calvia']
  },
  {
    id: '26',
    src: '/images/luxury/gallery-26.jpg',
    alt: 'Calvia luxury stone house exterior',
    ...projectMetadata['calvia']
  },

  // Sevilla (27)
  {
    id: '27',
    src: '/images/luxury/gallery-27.jpg',
    alt: 'Modular house Sevilla premium',
    ...projectMetadata['sevilla']
  },

  // Rubi (28-31)
  {
    id: '28',
    src: '/images/luxury/gallery-28.jpg',
    alt: 'Modular modern house Rubi with overhang',
    ...projectMetadata['rubi']
  },
  {
    id: '29',
    src: '/images/luxury/gallery-29.jpg',
    alt: 'Rubi modern house exterior',
    ...projectMetadata['rubi']
  },
  {
    id: '30',
    src: '/images/luxury/gallery-30.jpg',
    alt: 'Rubi house model',
    ...projectMetadata['rubi']
  },
  {
    id: '31',
    src: '/images/luxury/gallery-31.jpg',
    alt: 'Rubi modular house model',
    ...projectMetadata['rubi']
  },

  // Paterna (32-34)
  {
    id: '32',
    src: '/images/luxury/gallery-32.jpg',
    alt: 'Paterna concrete modular house facade',
    ...projectMetadata['paterna']
  },
  {
    id: '33',
    src: '/images/luxury/gallery-33.jpg',
    alt: 'Paterna luxury modular house',
    ...projectMetadata['paterna']
  },
  {
    id: '34',
    src: '/images/luxury/gallery-34.jpg',
    alt: 'Paterna concrete house exterior',
    ...projectMetadata['paterna']
  },

  // Masnou (35-36)
  {
    id: '35',
    src: '/images/luxury/gallery-35.jpg',
    alt: 'Prefabricated concrete house Masnou',
    ...projectMetadata['masnou']
  },
  {
    id: '36',
    src: '/images/luxury/gallery-36.jpg',
    alt: 'Masnou prefabricated concrete house',
    ...projectMetadata['masnou']
  },

  // Figueres (37-42)
  {
    id: '37',
    src: '/images/luxury/gallery-37.jpg',
    alt: 'Prefabricated luxury house concrete Figueres',
    ...projectMetadata['figueres']
  },
  {
    id: '38',
    src: '/images/luxury/gallery-38.jpg',
    alt: 'Figueres luxury concrete house',
    ...projectMetadata['figueres']
  },
  {
    id: '39',
    src: '/images/luxury/gallery-39.jpg',
    alt: 'Figueres prefabricated house exterior',
    ...projectMetadata['figueres']
  },
  {
    id: '40',
    src: '/images/luxury/gallery-40.jpg',
    alt: 'Figueres house with porche',
    ...projectMetadata['figueres']
  },
  {
    id: '41',
    src: '/images/luxury/gallery-41.jpg',
    alt: 'Figueres luxury concrete villa',
    ...projectMetadata['figueres']
  },
  {
    id: '42',
    src: '/images/luxury/gallery-42.jpg',
    alt: 'Figueres prefabricated luxury house',
    ...projectMetadata['figueres']
  },

  // Sotogrande (43-45)
  {
    id: '43',
    src: '/images/luxury/gallery-43.jpg',
    alt: 'Sotogrande concrete prefabricated house',
    ...projectMetadata['sotogrande']
  },
  {
    id: '44',
    src: '/images/luxury/gallery-44.jpg',
    alt: 'Sotogrande luxury house exterior',
    ...projectMetadata['sotogrande']
  },
  {
    id: '45',
    src: '/images/luxury/gallery-45.jpg',
    alt: 'Sotogrande house with porche',
    ...projectMetadata['sotogrande']
  },

  // Tarifa (46-48)
  {
    id: '46',
    src: '/images/luxury/gallery-46.jpg',
    alt: 'Tarifa one storey prefabricated house',
    ...projectMetadata['tarifa']
  },
  {
    id: '47',
    src: '/images/luxury/gallery-47.jpg',
    alt: 'Tarifa concrete prefabricated house',
    ...projectMetadata['tarifa']
  },
  {
    id: '48',
    src: '/images/luxury/gallery-48.jpg',
    alt: 'Tarifa single storey house',
    ...projectMetadata['tarifa']
  },

  // Tiana (49-52)
  {
    id: '49',
    src: '/images/luxury/gallery-49.jpg',
    alt: 'Tiana model prefab house facade',
    ...projectMetadata['tiana']
  },
  {
    id: '50',
    src: '/images/luxury/gallery-50.jpg',
    alt: 'Tiana prefab modular house',
    ...projectMetadata['tiana']
  },
  {
    id: '51',
    src: '/images/luxury/gallery-51.jpg',
    alt: 'Tiana mediterranean prefabricated house',
    ...projectMetadata['tiana']
  },
  {
    id: '52',
    src: '/images/luxury/gallery-52.jpg',
    alt: 'Tiana model prefab house exterior',
    ...projectMetadata['tiana']
  }
]
