import { NextRequest, NextResponse } from 'next/server'

// In-memory storage per le sessioni attive
// In produzione con multiple istanze, usare Redis
const activeSessions = new Map<string, number>()

// Timeout sessione: 15 secondi senza heartbeat
const SESSION_TIMEOUT = 15000

// Pulizia sessioni scadute
function cleanExpiredSessions() {
  const now = Date.now()
  for (const [sessionId, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > SESSION_TIMEOUT) {
      activeSessions.delete(sessionId)
    }
  }
}

// GET: Ottieni numero utenti attivi
export async function GET() {
  cleanExpiredSessions()

  return NextResponse.json({
    activeUsers: activeSessions.size,
    threshold: 5,
    useLocal: activeSessions.size < 5
  })
}

// POST: Registra/aggiorna heartbeat sessione
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
    }

    // Pulisci sessioni scadute
    cleanExpiredSessions()

    // Aggiorna timestamp sessione
    activeSessions.set(sessionId, Date.now())

    return NextResponse.json({
      activeUsers: activeSessions.size,
      threshold: 5,
      useLocal: activeSessions.size < 5,
      sessionId
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// DELETE: Rimuovi sessione (quando utente lascia la pagina)
export async function DELETE(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (sessionId) {
      activeSessions.delete(sessionId)
    }

    cleanExpiredSessions()

    return NextResponse.json({
      activeUsers: activeSessions.size,
      removed: true
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
