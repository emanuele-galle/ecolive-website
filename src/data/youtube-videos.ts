export interface YouTubeVideo {
  id: string
  title: string
  duration: string
  views: number
  category: 'costruzione' | 'xframe' | 'storia' | 'tecnologia' | 'glamping'
}

export const youtubeVideos: YouTubeVideo[] = [
  {
    id: 'nptTzlZwGOg',
    title: 'Costruzione di una Casa in Legno Ecolive',
    duration: '5:57',
    views: 105,
    category: 'costruzione',
  },
  {
    id: 'R98zK3zp75g',
    title: 'Scopri X-Frame 2.0: Il Futuro delle Costruzioni in Legno Prefabbricate',
    duration: '1:48',
    views: 254,
    category: 'xframe',
  },
  {
    id: 'uN7ItxWy6D4',
    title: 'Rivoluzione Verde: Il Sistema X-Frame per un Futuro Sostenibile',
    duration: '1:32',
    views: 192,
    category: 'xframe',
  },
  {
    id: 'EpCLtvhFcds',
    title: 'Ecolive - Villaggio Bungalow A-Frame',
    duration: '1:05',
    views: 301,
    category: 'glamping',
  },
  {
    id: 'swQRUOTvxJ8',
    title: 'Made in Calabria — Tgr RAI Calabria Ecolive',
    duration: '3:09',
    views: 213,
    category: 'storia',
  },
  {
    id: 'Q29WmCQuqa8',
    title: 'Ecolive Srl: La Nostra Storia nel mondo delle Case in Legno',
    duration: '3:58',
    views: 109,
    category: 'storia',
  },
  {
    id: 'FWhNUIVIBFM',
    title: 'Comparazione Sistemi Costruttivi per le Case in Legno',
    duration: '1:30',
    views: 168,
    category: 'xframe',
  },
  {
    id: 'DPRjAl3HLRg',
    title: 'Convegno Ecolive — Case in Legno (Passive House)',
    duration: '34:00',
    views: 90,
    category: 'tecnologia',
  },
  {
    id: 'h_Te1Hy_RRo',
    title: 'Innovazione in Architettura: Ecolive AI Generative Platform',
    duration: '1:48',
    views: 107,
    category: 'tecnologia',
  },
  {
    id: '0bKyJZHPksU',
    title: 'Scopri gli Infissi Innovativi di Ecolive Srl: Finestre con Ventilazione Integrata',
    duration: '0:50',
    views: 19,
    category: 'tecnologia',
  },
  {
    id: 'Wyw6E0XOTvY',
    title: 'Efficienza Energetica Avanzata: Gas R290 e Fotovoltaico nelle Case Ecolive',
    duration: '1:31',
    views: 10,
    category: 'tecnologia',
  },
]

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Ecolive-xframe'

export function getVideosByCategory(category: YouTubeVideo['category']): YouTubeVideo[] {
  return youtubeVideos.filter(v => v.category === category)
}

export function getVideoUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

export function getEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}`
}

export function getThumbnailUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}
