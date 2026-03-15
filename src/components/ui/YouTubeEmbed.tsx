'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { getEmbedUrl, getThumbnailUrl } from '@/data/youtube-videos'

interface YouTubeEmbedProps {
  videoId: string
  title: string
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={`${getEmbedUrl(videoId)}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      aria-label={`Riproduci: ${title}`}
    >
      <Image
        src={getThumbnailUrl(videoId)}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#A0845C] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white text-sm md:text-base font-medium drop-shadow-lg line-clamp-2">
          {title}
        </p>
      </div>
    </button>
  )
}
