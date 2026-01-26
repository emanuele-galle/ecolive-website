export interface GalleryImage {
  id: string
  src: string
  alt: string
  location?: string
  area?: number
  category?: 'villa' | 'modern' | 'coastal' | 'urban'
}

export type GalleryCategory = 'all' | 'villa' | 'modern' | 'coastal' | 'urban'
