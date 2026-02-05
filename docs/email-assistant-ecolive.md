# Email Assistant Ecolive - Workflow N8N

## Informazioni
- **Workflow ID:** MX5DazHAkt07tmKf
- **Nome:** Email Assistant Ecolive v2
- **Stato:** ATTIVO
- **URL:** https://n8n.fodivps2.cloud/workflow/MX5DazHAkt07tmKf

## Funzionamento
Il workflow monitora la casella info@ecolive.srl ogni 2 minuti e classifica automaticamente le email in arrivo usando Gemini AI.

### Flusso
1. **Email Trigger**: Legge email IMAP da info@ecolive.srl (INBOX, marca come lette)
2. **Gemini**: Classifica l'email in una delle 4 categorie
3. **Router a cascata (IF nodes)**:
   - amministrazione → amministrazione@ecolive.srl
   - tecnico → areatecnica@ecolive.srl
   - spam → ignorata (NoOp)
   - commerciale (default) → contatti@ecolive.srl

### Categorie AI
| Categoria | Criteri | Destinazione |
|-----------|---------|--------------|
| amministrazione | Fatture, pagamenti, contratti | amministrazione@ecolive.srl |
| tecnico | Supporto, bug, server, IT | areatecnica@ecolive.srl |
| commerciale | Vendite, clienti, preventivi | contatti@ecolive.srl |
| spam | Marketing, newsletter | Ignorata |

## Credenziali Utilizzate
- **IMAP:** aruba-imap-ecolive (ovrcw4wr2EBFWHiX)
- **SMTP:** aruba-smtp-ecolive (Xw45O3EPY6ltzj5f)
- **AI:** google-gemini-api (gzFUDV45zb3wMQSM)

## Monitoring
```bash
# Verifica stato workflow
curl -H "X-N8N-API-KEY: YOUR_KEY" http://127.0.0.1:5678/api/v1/workflows/MX5DazHAkt07tmKf | jq '.active'

# Verifica executions recenti
curl -H "X-N8N-API-KEY: YOUR_KEY" http://127.0.0.1:5678/api/v1/executions?workflowId=MX5DazHAkt07tmKf
```

## Note Tecniche
- Polling: ogni 2 minuti
- Email processate: marcate come lette
- Temperature Gemini: 0 (deterministica)
- Max tokens: 20 (solo categoria)
- Fallback: categoria "commerciale" se classificazione fallisce

## Data Creazione
2026-01-12
