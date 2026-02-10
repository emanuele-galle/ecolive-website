'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type NodeTypes = DefaultNodeTypes

// Custom upload converter that uses next/image for optimization
const UploadComponent: React.FC<{ node: SerializedUploadNode }> = ({ node }) => {
  if (node.relationTo === 'media') {
    const uploadDoc = node.value
    if (typeof uploadDoc !== 'object') {
      return null
    }
    const { alt, height, url, width } = uploadDoc as {
      alt?: string
      height?: number
      url?: string
      width?: number
    }

    if (!url) return null

    return (
      <figure className="my-8">
        <Image
          alt={alt || ''}
          height={height || 600}
          width={width || 800}
          src={url}
          className="rounded-lg w-full h-auto"
        />
        {alt && (
          <figcaption className="text-sm text-gray-500 mt-2 text-center">
            {alt}
          </figcaption>
        )}
      </figure>
    )
  }
  return null
}

// Custom converters with styling
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => <UploadComponent node={node} />,
})

interface RichTextRendererProps {
  data: SerializedEditorState | null | undefined
  className?: string
}

export default function RichTextRenderer({ data, className = '' }: RichTextRendererProps) {
  if (!data) return null

  return (
    <div className={`prose prose-lg max-w-none prose-headings:text-[#1D1D1F] prose-p:text-gray-700 prose-a:text-[#A0845C] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1D1D1F] prose-ul:text-gray-700 prose-ol:text-gray-700 ${className}`}>
      <RichText data={data} converters={jsxConverters} />
    </div>
  )
}
