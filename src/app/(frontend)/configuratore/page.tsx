import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import ConfiguratoreWrapper from './ConfiguratoreWrapper'

export const metadata: Metadata = {
  title: 'Configura la tua Casa | Ecolive - Case Prefabbricate in Legno',
  description:
    'Configura la tua casa prefabbricata in legno in pochi click. Scegli tra casa a 1 o 2 piani, seleziona il numero di camere e richiedi un preventivo personalizzato.',
  keywords: [
    'configuratore casa prefabbricata',
    'casa legno configuratore',
    'progetta casa modulare',
    'X-Frame system',
    'case prefabbricate preventivo',
  ],
  openGraph: {
    title: 'Configura la tua Casa in Legno | Ecolive',
    description: 'Configura la tua casa prefabbricata in pochi click e richiedi un preventivo gratuito.',
    type: 'website',
  },
}

async function handleQuoteSubmission(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  const data = {
    nome: formData.get('nome') as string,
    email: formData.get('email') as string,
    telefono: (formData.get('telefono') as string) || undefined,
    messaggio: formData.get('messaggio') as string,
    source: '/configuratore',
    // Configuration data
    tipoCasa: formData.get('tipoCasa') as string,
    numStanze: parseInt(formData.get('numStanze') as string, 10),
    metratura: parseInt(formData.get('metratura') as string, 10),
  }

  // Basic validation
  if (!data.nome || !data.email) {
    return { success: false, message: 'Compila tutti i campi obbligatori' }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, message: 'Inserisci un indirizzo email valido' }
  }

  // Config validation
  if (!data.tipoCasa || !data.numStanze || !data.metratura) {
    return { success: false, message: 'Dati configurazione mancanti' }
  }

  try {
    // Save to Payload CMS
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        nome: data.nome,
        email: data.email,
        telefono: data.telefono,
        messaggio: data.messaggio,
        source: data.source,
        status: 'nuovo',
        configurazione: {
          tipoCasa: data.tipoCasa as '1-piano' | '2-piani',
          numStanze: data.numStanze,
          metratura: data.metratura,
        },
      },
    })

    // Send notification to N8N webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'configuratore_quote',
            timestamp: new Date().toISOString(),
            data: {
              nome: data.nome,
              email: data.email,
              telefono: data.telefono,
              messaggio: data.messaggio,
              source: data.source,
              configurazione: {
                tipoCasa: data.tipoCasa,
                numStanze: data.numStanze,
                metratura: data.metratura,
              },
            },
          }),
        })
      } catch {
        // Don't block if webhook fails
        console.error('Webhook N8N fallito')
      }
    }

    revalidatePath('/configuratore')
    return {
      success: true,
      message:
        'Richiesta inviata con successo! Riceverai un preventivo personalizzato entro 48 ore.',
    }
  } catch (error) {
    console.error('Errore salvataggio preventivo:', error)
    return { success: false, message: 'Si è verificato un errore. Riprova più tardi.' }
  }
}

export default function ConfiguratorePage() {
  return <ConfiguratoreWrapper onSubmit={handleQuoteSubmission} />
}
