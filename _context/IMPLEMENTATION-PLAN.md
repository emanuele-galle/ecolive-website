# EcoLive Website Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign completo del sito ecolive.srl mantenendo stack e design system, ricostruendo contenuti e struttura secondo il design doc validato.

**Architecture:** Next.js 16 App Router con route groups (frontend/payload). Payload CMS 3 per contenuti dinamici (progetti, news, contatti). Dati statici in TypeScript per tipologie e sistema X-Frame. Configuratore come client component con Zustand per state.

**Tech Stack:** Next.js 16.1.6, React 19, Payload CMS 3.79, PostgreSQL, MinIO S3, Tailwind CSS 4.2, Framer Motion 12, Zustand 5, Lucide React

---

## Cosa PRESERVARE (non toccare)

- `src/app/globals.css` — design system completo
- `src/app/layout.tsx` — root layout
- `src/payload.config.ts` — CMS config
- `src/collections/*` — tutte le collections CMS
- `src/globals/SiteSettings.ts` — settings globali
- `src/components/ui/*` — tutti i componenti UI (BlurText, GlassCard, ScrollReveal, SpotlightCard, CountUp, ImageLightbox, InfiniteMarquee, SectionTransition, Button)
- `src/components/ImageGallery.tsx`
- `src/components/RichTextRenderer.tsx`
- `src/components/JsonLd.tsx`
- `src/components/NewsCardPremium.tsx`
- `docker-compose.yml`, `Dockerfile`, `.env.docker`
- `package.json` (aggiungere dipendenze se necessario)
- `src/payload-types.ts`

## Cosa MODIFICARE

- `src/components/Header.tsx` — aggiornare navigazione
- `src/components/Footer.tsx` — aggiornare link e rimuovere riferimenti Edilius
- `src/data/tipologie.ts` — arricchire con dati da brochure e contesto
- `src/app/(frontend)/page.tsx` — home page completamente nuova
- Sezioni home esistenti — ricostruire secondo design

## Cosa CREARE

- Sotto-pagine sistema X-Frame (pareti, solai, coperture, trasporto-montaggio, confronto)
- Pagina /il-processo
- Pagina /professionisti
- Configuratore v3 (5 step con planimetria 2D)
- Dati tecnici X-Frame (`src/data/xframe.ts`)
- Dati processo (`src/data/processo.ts`)
- Dati confronto (`src/data/confronto.ts`)
- Aggiornare FAQ con contenuti reali

## Cosa RIMUOVERE

- `src/app/(frontend)/area-tecnica/` — sostituita da sotto-pagine X-Frame
- `src/app/(frontend)/glamping/` — spostata sotto /tipologie/glamping
- `src/app/(frontend)/smartsuite/` — spostata sotto /tipologie/smartsuite
- `src/app/(frontend)/luxury/` — spostata sotto /tipologie/luxury
- `src/app/(frontend)/residenziali/` — spostata sotto /tipologie/residenziali
- `src/types/gaussian-splats-3d.d.ts` — non più necessario
- `src/app/(frontend)/api/viewer-session/route.ts` — non più necessario

---

## Sprint 1: Fondamenta + Navigazione

### Task 1.1: Aggiornare Navigazione Header

**Files:**
- Modify: `src/components/Header.tsx`

Aggiornare `menuItems` con la nuova struttura:
```typescript
const menuItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Sistema X-Frame',
    href: '/sistema-x-frame',
    submenu: [
      { label: 'Panoramica', href: '/sistema-x-frame' },
      { label: 'Pareti', href: '/sistema-x-frame/pareti' },
      { label: 'Solai', href: '/sistema-x-frame/solai' },
      { label: 'Coperture', href: '/sistema-x-frame/coperture' },
      { label: 'Trasporto e Montaggio', href: '/sistema-x-frame/trasporto-montaggio' },
      { label: 'Confronto', href: '/sistema-x-frame/confronto' },
    ],
  },
  { label: 'Tipologie', href: '/tipologie' },
  { label: 'Configuratore', href: '/configuratore' },
  { label: 'Progetti', href: '/progetti' },
  {
    label: 'Azienda',
    href: '/chi-siamo',
    submenu: [
      { label: 'Chi Siamo', href: '/chi-siamo' },
      { label: 'Il Processo', href: '/il-processo' },
      { label: 'Professionisti', href: '/professionisti' },
      { label: 'Franchising', href: '/franchising' },
    ],
  },
  { label: 'News', href: '/news' },
]
```

CTA cambia da "Richiedi Preventivo" → "Configura la tua Casa" con href="/configuratore"

### Task 1.2: Aggiornare Footer

**Files:**
- Modify: `src/components/Footer.tsx`

Aggiornare link rapidi e servizi per riflettere nuova struttura.
Aggiornare telefono con dati corretti dalla brochure: (0963) 530945 / 366.2037106
Rimuovere ogni riferimento a Edilius.

### Task 1.3: Creare Dati X-Frame

**Files:**
- Create: `src/data/xframe.ts`

Dati tecnici del sistema X-Frame estratti dalla brochure e dal contesto:
- Stratigrafie pareti (componenti A-Q con spessori e materiali)
- Stratigrafie solai
- Stratigrafie coperture
- Dati prestazionali (trasmittanza, sfasamento, spessori)
- Tabella comparativa X-Frame vs Telaio vs X-Lam (14 parametri)
- Tabella comparativa vs Muratura
- Certificazioni
- Listino prezzi 2025

### Task 1.4: Arricchire Dati Tipologie

**Files:**
- Modify: `src/data/tipologie.ts`

Aggiornare i percorsi href da `/glamping` → `/tipologie/glamping`, ecc.
Aggiungere campo `priceRange` con riferimento al listino.
Aggiungere campo `modules` con le dimensioni modulari disponibili.

### Task 1.5: Creare Dati Processo

**Files:**
- Create: `src/data/processo.ts`

I 7 step del processo con titolo, descrizione, icona, dettagli.
Tabelle pagamenti (grezzo avanzato + chiavi in mano).

---

## Sprint 2: Home Page

### Task 2.1: Ricostruire Hero con CTA aggiornate

**Files:**
- Modify: `src/components/sections/HeroFullscreen.tsx`

Aggiornare CTA:
- Primaria: "Configura la tua Casa" → /configuratore
- Secondaria: "Scopri il Sistema X-Frame" → /sistema-x-frame

Aggiornare trust indicators con dati reali.

### Task 2.2: Ricostruire sezione Pilastri (ex ValueProposition)

**Files:**
- Modify: `src/components/sections/ValueProposition.tsx`

3 pilastri: Velocità (struttura in 1 giorno), Precisione (laboratorio), Durabilità (50 anni).
Con numeri animati (CountUp), icone, descrizioni concise.

### Task 2.3: Creare sezione "Sistema in 30 Secondi"

**Files:**
- Create: `src/components/sections/SystemPreview.tsx`

Animazione/immagine spaccato parete X-Frame.
Testo sintetico che spiega il vantaggio.
CTA verso /sistema-x-frame.

### Task 2.4: Creare sezione Tipologie Preview

**Files:**
- Create: `src/components/sections/TipologiePreview.tsx`

4 card orizzontali con immagine, nome, range, prezzo.
Link a pagine dedicate /tipologie/{id}.

### Task 2.5: Creare sezione Progetto in Evidenza

**Files:**
- Create: `src/components/sections/FeaturedProject.tsx`

Showcase progetto da CMS (fetch server-side).
Rendering grande, dati chiave, CTA "Vedi tutti i progetti".

### Task 2.6: Creare sezione Processo Preview

**Files:**
- Modify: `src/components/sections/ProcessJourney.tsx`

Timeline orizzontale semplificata dei 7 step.
CTA "Scopri come lavoriamo" → /il-processo.

### Task 2.7: Creare sezione Confronto Rapido

**Files:**
- Create: `src/components/sections/QuickComparison.tsx`

Tabella compatta EcoLive vs Muratura (5 parametri chiave).
CTA verso /sistema-x-frame/confronto.

### Task 2.8: Ricostruire CTA Finale

**Files:**
- Modify: `src/components/sections/ContactCTA.tsx`

3 percorsi: "Hai un terreno?" → configuratore, "Sei un professionista?" → professionisti, "Vuoi affiliarti?" → franchising.

### Task 2.9: Assemblare Home Page

**Files:**
- Modify: `src/app/(frontend)/page.tsx`

Comporre tutte le sezioni nell'ordine del design.

---

## Sprint 3: Sistema X-Frame (6 pagine)

### Task 3.1: Pagina overview /sistema-x-frame

**Files:**
- Modify: `src/app/(frontend)/sistema-x-frame/page.tsx`
- Modify: `src/app/(frontend)/sistema-x-frame/layout.tsx`

Overview con video/immagine, intro narrativa, 5 card navigazione sotto-pagine.

### Task 3.2: Sotto-pagina /sistema-x-frame/pareti

**Files:**
- Create: `src/app/(frontend)/sistema-x-frame/pareti/page.tsx`

Spaccato animato strato per strato (da immagini brochure o framer-motion).
Dati tecnici: 29 cm, 0.159 W/m²K, 18.8 ore sfasamento.
Sezioni: monoblocco finestra, base XPS, dettagli materiali.

### Task 3.3: Sotto-pagina /sistema-x-frame/solai

**Files:**
- Create: `src/app/(frontend)/sistema-x-frame/solai/page.tsx`

Spaccato solaio copertura e interpiano.
Dati: 40 cm, 0.137 W/m²K, 14.5 ore.
Moduli 2.10m x 13m.

### Task 3.4: Sotto-pagina /sistema-x-frame/coperture

**Files:**
- Create: `src/app/(frontend)/sistema-x-frame/coperture/page.tsx`

3 tipologie tetto con dettagli.
Manto finale di copertura: pannelli grecati, tegole, alluminio.

### Task 3.5: Sotto-pagina /sistema-x-frame/trasporto-montaggio

**Files:**
- Create: `src/app/(frontend)/sistema-x-frame/trasporto-montaggio/page.tsx`

Trasporto orizzontale, ottimizzazione carichi.
Timeline montaggio 1 giorno.
Gallery time-lapse/drone.

### Task 3.6: Sotto-pagina /sistema-x-frame/confronto

**Files:**
- Create: `src/app/(frontend)/sistema-x-frame/confronto/page.tsx`

Tabella X-Frame vs Telaio vs X-Lam (14 parametri).
Tabella X-Frame vs Muratura.
Sezione narrativa "Perché costiamo di più e perché vale di più".

---

## Sprint 4: Tipologie + Progetti + Pagine Azienda

### Task 4.1: Ristrutturare route tipologie

**Files:**
- Modify: `src/app/(frontend)/tipologie/page.tsx` — listing con 4 card
- Create: `src/app/(frontend)/tipologie/glamping/page.tsx`
- Create: `src/app/(frontend)/tipologie/smartsuite/page.tsx`
- Create: `src/app/(frontend)/tipologie/residenziali/page.tsx`
- Create: `src/app/(frontend)/tipologie/luxury/page.tsx`
- Remove: vecchie route `/glamping`, `/smartsuite`, `/luxury`, `/residenziali`

Template condiviso per pagina singola tipologia: hero, descrizione, gallery, specs, features, CTA configuratore.

### Task 4.2: Pagina /il-processo

**Files:**
- Create: `src/app/(frontend)/il-processo/page.tsx`

Timeline visiva 7 step.
Tabelle pagamenti (grezzo avanzato + chiavi in mano).
Sezione "Cosa include il grezzo avanzato" e "Cosa include il chiavi in mano".

### Task 4.3: Pagina /professionisti

**Files:**
- Create: `src/app/(frontend)/professionisti/page.tsx`

Contenuti tecnici per professionisti.
Dettaglio stratigrafia con codici A-Q.
CTA "Diventa partner tecnico".

### Task 4.4: Aggiornare /chi-siamo

**Files:**
- Modify: `src/app/(frontend)/chi-siamo/page.tsx`

Riscrivere con contesto reale: storia, filosofia, stabilimento, team.
Payoff: "La bioedilizia più innovativa parte dal Sud".

### Task 4.5: Aggiornare /franchising

**Files:**
- Modify: `src/app/(frontend)/franchising/page.tsx`

Riscrivere con visione affiliazione, vantaggi, modello.

### Task 4.6: Aggiornare /faq

**Files:**
- Modify: `src/app/(frontend)/faq/page.tsx`

Ristrutturare per categorie: costi, tempi, materiali, garanzie, terreno, confronto.

---

## Sprint 5: Configuratore V3 (5 step con planimetria 2D)

### Task 5.1: Creare dati e tipi configuratore

**Files:**
- Create: `src/lib/configuratore-v3/types.ts`
- Create: `src/lib/configuratore-v3/configurations.ts`
- Create: `src/lib/configuratore-v3/price-calculator.ts`

Tipi per: tipologia, dimensione modulare, finitura, stanza, configurazione completa.
Moduli basati su griglia 4-4.5m x 7m.
Calcolo prezzo da riferimento 1.250 €/mq (premium residenziale).

### Task 5.2: Creare store Zustand configuratore

**Files:**
- Create: `src/lib/configuratore-v3/store.ts`

Store con: currentStep, tipologia, dimensione, finitura, stanze, tetto, contatto.
Actions per navigazione step, selezione, reset.

### Task 5.3: Step 1 — Selezione Tipologia

**Files:**
- Create: `src/components/configuratore-v3/StepTipologia.tsx`

4 card selezionabili con immagine, nome, range.

### Task 5.4: Step 2 — Dimensione Modulare

**Files:**
- Create: `src/components/configuratore-v3/StepDimensione.tsx`

Griglia moduli disponibili per tipologia.
Mostra m², livelli, ingombro.

### Task 5.5: Step 3 — Livello Finitura

**Files:**
- Create: `src/components/configuratore-v3/StepFinitura.tsx`

3 card: Essenziale, Premium, Passiva.
Spaccato parete che cambia visivamente.

### Task 5.6: Step 4 — Planimetria 2D Interattiva

**Files:**
- Create: `src/components/configuratore-v3/StepPlanimetria.tsx`
- Create: `src/components/configuratore-v3/FloorPlanCanvas.tsx`

Canvas 2D con griglia modulare.
Stanze draggabili e ridimensionabili.
Vincoli strutturali automatici.
Selezione tipo tetto.

### Task 5.7: Step 5 — Riepilogo e Lead Form

**Files:**
- Create: `src/components/configuratore-v3/StepRiepilogo.tsx`

Riepilogo completo, range prezzo, disclaimer.
Form contatto con salvataggio in Payload CMS.
CTA "Prenota visita in sede" + "Salva e ricevi via email".

### Task 5.8: Pagina configuratore

**Files:**
- Modify: `src/app/(frontend)/configuratore/page.tsx`

Assemblare i 5 step con navigazione, progress bar, animazioni transizione.

---

## Sprint 6: Cleanup + SEO + Polish

### Task 6.1: Rimuovere vecchie route

Eliminare directory/file non più necessari (area-tecnica, vecchie tipologie standalone, gaussian-splats, viewer-session).

### Task 6.2: Aggiornare sitemap e robots

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`

Aggiungere tutte le nuove route.

### Task 6.3: Aggiornare metadata e OpenGraph

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/opengraph-image.tsx`

Keywords, description, OG image aggiornati.

### Task 6.4: Schema markup JSON-LD

Aggiornare Organization schema nella home.
Aggiungere Product schema per tipologie.
FAQ schema per /faq.
HowTo schema per /il-processo.

### Task 6.5: Lint + Knip + Build check

```bash
cd /var/www/projects/ecolive-website
npm run check  # lint + knip
npm run build  # verifica build
```

### Task 6.6: Commit + Push + Deploy

```bash
git add .
git commit -m "feat: complete website redesign with real business context"
git push origin main  # → deploy automatico
```
