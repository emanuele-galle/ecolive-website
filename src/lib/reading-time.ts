/**
 * Utility per calcolare il tempo di lettura da contenuto Lexical (Payload CMS)
 */

// Tipo per il contenuto Lexical
interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  tag?: string
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[]
  }
}

/**
 * Estrae il testo da un nodo Lexical ricorsivamente
 */
function extractTextFromNode(node: LexicalNode): string {
  if (node.text) {
    return node.text
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join(' ')
  }

  return ''
}

/**
 * Calcola il tempo di lettura in minuti
 * @param content - Contenuto Lexical da Payload CMS
 * @param wordsPerMinute - Velocità di lettura (default: 200 parole/min)
 * @returns Tempo di lettura in minuti (minimo 1)
 */
export function calculateReadingTime(
  content: LexicalContent | null | undefined,
  wordsPerMinute: number = 200
): number {
  if (!content?.root?.children) {
    return 1
  }

  const text = content.root.children.map(extractTextFromNode).join(' ')
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

/**
 * Formatta il tempo di lettura per display
 * @param minutes - Minuti di lettura
 * @returns Stringa formattata (es: "3 min di lettura")
 */
function formatReadingTime(minutes: number): string {
  return `${minutes} min di lettura`
}

// Tipo per heading estratti
export interface ExtractedHeading {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Estrae gli heading H2 e H3 dal contenuto Lexical per il TOC
 * @param content - Contenuto Lexical da Payload CMS
 * @returns Array di heading con id, testo e livello
 */
export function extractHeadings(
  content: LexicalContent | null | undefined
): ExtractedHeading[] {
  if (!content?.root?.children) {
    return []
  }

  const headings: ExtractedHeading[] = []

  function processNode(node: LexicalNode) {
    // Cerca heading nodes
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const text = extractTextFromNode(node).trim()
      if (text) {
        // Genera ID slug-friendly
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()

        headings.push({
          id,
          text,
          level: node.tag === 'h2' ? 2 : 3
        })
      }
    }

    // Processa children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(processNode)
    }
  }

  content.root.children.forEach(processNode)

  return headings
}
