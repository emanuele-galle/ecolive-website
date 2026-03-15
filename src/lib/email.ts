import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'info@ecolive.srl',
    pass: process.env.SMTP_PASS || '',
  },
})

interface ContactEmailData {
  nome: string
  email: string
  telefono?: string
  messaggio: string
  source: string
}

export async function sendContactNotification(data: ContactEmailData) {
  // Email to EcoLive team
  await transporter.sendMail({
    from: `"EcoLive Sito Web" <${process.env.SMTP_FROM || 'info@ecolive.srl'}>`,
    to: 'info@ecolive.srl',
    subject: `Nuovo contatto da ${data.source}: ${data.nome}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1D1D1F; padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #A0845C; margin: 0; font-size: 24px;">Nuovo Contatto</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0;">dal sito web EcoLive</p>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #86868B; width: 120px;">Nome</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600;">${data.nome}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #86868B;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${data.email}" style="color: #A0845C;">${data.email}</a></td></tr>
            ${data.telefono ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #86868B;">Telefono</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;"><a href="tel:${data.telefono}" style="color: #A0845C;">${data.telefono}</a></td></tr>` : ''}
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #86868B;">Origine</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">${data.source}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #F5F5F7; border-radius: 8px;">
            <p style="color: #86868B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Messaggio</p>
            <p style="color: #1D1D1F; white-space: pre-wrap; margin: 0;">${data.messaggio}</p>
          </div>
        </div>
        <div style="background: #F5F5F7; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #86868B; font-size: 12px; margin: 0;">EcoLive S.r.l. — Via Conte Ruggiero 128, Spadola (VV)</p>
        </div>
      </div>
    `,
  })

  // Confirmation email to the submitter
  await transporter.sendMail({
    from: `"EcoLive S.r.l." <${process.env.SMTP_FROM || 'info@ecolive.srl'}>`,
    to: data.email,
    subject: 'Grazie per averci contattato — EcoLive',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1D1D1F; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: #A0845C; margin: 0; font-size: 24px;">Grazie, ${data.nome}!</h1>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5;">
          <p style="color: #1D1D1F; line-height: 1.6;">Abbiamo ricevuto la tua richiesta e ti risponderemo entro 24 ore lavorative.</p>
          <p style="color: #1D1D1F; line-height: 1.6;">Nel frattempo, puoi contattarci direttamente:</p>
          <ul style="color: #48484A; line-height: 2;">
            <li>Telefono: <a href="tel:+390963530945" style="color: #A0845C;">(0963) 530945</a></li>
            <li>Cellulare: <a href="tel:+3909631951395" style="color: #A0845C;">+39 0963 1951395</a></li>
            <li>Email: <a href="mailto:info@ecolive.srl" style="color: #A0845C;">info@ecolive.srl</a></li>
          </ul>
          <p style="color: #1D1D1F; line-height: 1.6;">Ti aspettiamo a Spadola per mostrarti dal vivo la qualit&agrave; del sistema X-Frame.</p>
          <p style="color: #A0845C; font-weight: 600; margin-top: 20px;">Il Team EcoLive</p>
        </div>
        <div style="background: #F5F5F7; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #86868B; font-size: 12px; margin: 0;">EcoLive S.r.l. — Via Conte Ruggiero 128, 89822 Spadola (VV)</p>
          <p style="color: #86868B; font-size: 11px; margin: 4px 0 0;"><a href="https://www.ecolive.srl" style="color: #A0845C;">www.ecolive.srl</a></p>
        </div>
      </div>
    `,
  })
}
