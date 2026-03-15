import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendContactNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, email, telefono, messaggio, source } = body

    if (!nome || !email || !messaggio) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      )
    }

    // Save to Payload CMS
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-submissions',
      data: {
        nome,
        email,
        telefono: telefono || undefined,
        messaggio,
        source: source || '/configuratore',
        status: 'nuovo',
      },
    })

    // Send email notification
    try {
      await sendContactNotification({
        nome,
        email,
        telefono,
        messaggio,
        source: source || '/configuratore',
      })
    } catch (emailError) {
      console.error('Errore invio email:', emailError)
      // Don't fail the request if email fails
    }

    // Also try N8N webhook (non-blocking)
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: source?.includes('configuratore') ? 'configuratore_lead' : 'contact_form',
          timestamp: new Date().toISOString(),
          data: { nome, email, telefono, messaggio, source },
        }),
      }).catch(() => console.error('Webhook N8N fallito'))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore salvataggio contatto:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}
