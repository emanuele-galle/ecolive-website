export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import ConfiguratoreV3 from './ConfiguratoreV3'

export const metadata: Metadata = {
  title: 'Configuratore - Progetta la Tua Casa',
  description: 'Configura la tua casa EcoLive in legno: scegli tipologia, dimensione, finitura e visualizza la planimetria. Range prezzo indicativo in tempo reale.',
  keywords: [
    'configuratore casa prefabbricata',
    'casa legno configuratore',
    'progetta casa modulare',
    'X-Frame system',
    'case prefabbricate preventivo',
  ],
}

export async function submitConfiguratoreLead(
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  'use server'

  const data = {
    nome: formData.get('nome') as string,
    email: formData.get('email') as string,
    telefono: (formData.get('telefono') as string) || undefined,
    messaggio: formData.get('messaggio') as string,
    source: '/configuratore-v3',
  }

  if (!data.nome || !data.email) {
    return { success: false, message: 'Compila tutti i campi obbligatori' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, message: 'Inserisci un indirizzo email valido' }
  }

  try {
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
      },
    })

    // N8N webhook notification
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'configuratore_lead',
            timestamp: new Date().toISOString(),
            data,
          }),
        })
      } catch {
        console.error('Webhook N8N fallito')
      }
    }

    return {
      success: true,
      message: 'Richiesta inviata! Ti contatteremo entro 24 ore.',
    }
  } catch (error) {
    console.error('Errore salvataggio lead:', error)
    return { success: false, message: 'Si è verificato un errore. Riprova più tardi.' }
  }
}

export default function ConfiguratorePage() {
  return <ConfiguratoreV3 />
}
