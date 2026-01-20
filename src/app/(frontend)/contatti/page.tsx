import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import ContactPageClient from './ContactPageClient'

export const metadata = {
  title: 'Contatti | Ecolive - Case Prefabbricate in Legno',
  description: 'Contattaci per informazioni sulle nostre case prefabbricate in legno. Richiedi un preventivo gratuito o prenota una visita allo stabilimento.',
}

async function handleContactSubmission(formData: FormData): Promise<{ success: boolean; message: string }> {
  'use server'

  const data = {
    nome: formData.get('nome') as string,
    email: formData.get('email') as string,
    telefono: formData.get('telefono') as string || undefined,
    messaggio: formData.get('messaggio') as string,
    source: '/contatti',
  }

  // Validazione base
  if (!data.nome || !data.email || !data.messaggio) {
    return { success: false, message: 'Compila tutti i campi obbligatori' }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, message: 'Inserisci un indirizzo email valido' }
  }

  try {
    // Salva in Payload CMS
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

    // Invia notifica a N8N webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'contact_form',
            timestamp: new Date().toISOString(),
            data: {
              nome: data.nome,
              email: data.email,
              telefono: data.telefono,
              messaggio: data.messaggio,
              source: data.source,
            },
          }),
        })
      } catch {
        // Non bloccare se il webhook fallisce
        console.error('Webhook N8N fallito')
      }
    }

    revalidatePath('/contatti')
    return { success: true, message: 'Messaggio inviato con successo! Ti contatteremo al più presto.' }

  } catch (error) {
    console.error('Errore salvataggio contatto:', error)
    return { success: false, message: 'Si è verificato un errore. Riprova più tardi.' }
  }
}

export default function ContattiPage() {
  return <ContactPageClient onSubmit={handleContactSubmission} />
}
