# EcoLive S.r.l. — Design Fase 1: Sito Web Potenziato

**Data:** 2026-03-14
**Stato:** Validato
**Stack:** Next.js 16 + Payload CMS 3 + PostgreSQL + MinIO + Tailwind CSS 4 + Framer Motion

---

## 1. Understanding Summary

### Cosa si costruisce
Sito web completamente rinnovato per EcoLive S.r.l. — unico attore che gestisce produzione, vendita, progettazione e costruzione di case prefabbricate in legno con sistema costruttivo ibrido X-Frame (combinazione di Platform Frame, X-Lam e Post and Beam).

### Perché esiste
Il sito attuale (ecolive.fodivps2.cloud) era stato costruito senza il contesto aziendale reale. Ora che la visione completa del business è disponibile, il sito deve diventare lo strumento principale per:
- Comunicare l'eccellenza del sistema X-Frame
- Educare il mercato calabrese/sud-italiano sulla bioedilizia
- Convertire visitatori in clienti che prenotano la visita in sede a Spadola

### Per chi è
- **Primario:** Privati che vogliono costruire casa (giovani coppie, famiglie)
- **Secondario:** Professionisti/tecnici (architetti, ingegneri, geometri)
- **Terziario:** Costruttori/imprenditori che vogliono affiliarsi

### Tono del brand
Artigianato d'eccellenza + rivoluzione costruttiva. Credibilità attraverso la sapienza artigianale e la cura sartoriale, messaggio dirompente sulla velocità e il metodo quando si confronta con la tradizione.

### Vincoli
- Stack tecnico confermato (Next.js 16 + Payload CMS 3 + PostgreSQL + MinIO)
- Design attuale come base estetica, da evolvere
- Traffico locale/regionale, poche centinaia visite/mese
- EcoLive è l'unico attore (Edilius non esiste più)
- Contesto fornito dal cliente ha priorità sulla brochure 2025
- Logo e identità visiva invariati

### Non-goal (Fase 1)
- Area riservata clienti con upload documenti
- CRM/gestionale commesse
- Gestione fornitori/fatturazione
- Multilingua
- Chatbot AI

### Fasi future
- **Fase 2:** Area cliente (upload documenti, stato commessa, interazione strutturata)
- **Fase 3:** CRM/Gestionale (acquisizione lead, mandato, progettazione, ordini, cantiere, fatturazione, fornitori, contabilità)

---

## 2. Architettura delle Pagine

```
/ (Home)
│
├── /sistema-x-frame
│   ├── /sistema-x-frame/pareti
│   ├── /sistema-x-frame/solai
│   ├── /sistema-x-frame/coperture
│   ├── /sistema-x-frame/trasporto-montaggio
│   └── /sistema-x-frame/confronto
│
├── /tipologie
│   ├── /tipologie/glamping
│   ├── /tipologie/smartsuite
│   ├── /tipologie/residenziali
│   └── /tipologie/luxury
│
├── /configuratore
│
├── /progetti
│   └── /progetti/[slug] (singolo progetto — da CMS)
│
├── /il-processo
│
├── /professionisti
│
├── /franchising
│
├── /chi-siamo
│
├── /news
│   └── /news/[slug] (singolo articolo — da CMS)
│
├── /faq
│
├── /contatti
│
├── /privacy
├── /cookie-policy
└── /termini-servizio
```

**Totale: 22+ pagine** (+ dinamiche da CMS per progetti e news)

---

## 3. Home Page — Struttura Scroll

### Sezione 1: Hero
- Video/animazione di sfondo: time-lapse costruzione casa (mattina → sera)
- Headline: messaggio dirompente sulla velocità e qualità
- Sottotitolo: posizionamento artigianato d'eccellenza calabrese
- CTA primaria: "Configura la tua casa"
- CTA secondaria: "Scopri il sistema X-Frame"

### Sezione 2: I 3 Pilastri
- **Velocità** — "Struttura montata in 1 giornata"
- **Precisione** — "Produzione in laboratorio, zero imprevisti"
- **Durabilità** — "Garanzia 50 anni, antisismicità certificata"

### Sezione 3: Il Sistema in 30 Secondi
- Animazione spaccato parete X-Frame che si "esplode" mostrando gli strati
- Testo sintetico + CTA "Approfondisci il sistema X-Frame"

### Sezione 4: Le Tipologie
- 4 card: Glamping / SmartSuite / Residenziali / Luxury
- Immagine rendering, nome, range dimensione e prezzo
- CTA per ognuna

### Sezione 5: Progetto in Evidenza
- Showcase progetto rappresentativo (rendering, dati, link time-lapse)
- CTA "Vedi tutti i progetti"

### Sezione 6: Il Processo — Preview
- Timeline orizzontale semplificata dei 7 step
- CTA "Scopri come lavoriamo"

### Sezione 7: Confronto Rapido
- Tabella compatta: EcoLive X-Frame vs Muratura Tradizionale (4-5 parametri)
- CTA "Vedi il confronto completo"

### Sezione 8: CTA Finale
- "Hai un terreno? Inizia da qui" → configuratore
- "Sei un professionista?" → professionisti
- "Vuoi affiliarti?" → franchising

### Sezione 9: Footer
- Contatti, sede, mappa, social, link legali

---

## 4. Sistema X-Frame — Contenuti Tecnici

### /sistema-x-frame (overview)
- Video/animazione: casa che si smonta mostrando tutti i componenti
- Intro narrativa: cos'è X-Frame, ibrido Platform Frame + X-Lam + Post and Beam
- Card navigazione verso 5 sotto-pagine

### /sistema-x-frame/pareti
Spaccato interattivo animato strato per strato:
- **B:** Telaio strutturale Bilam (6x24 / 6x16)
- **C:** Pannelli lamellari 3 strati μXlam (~20mm)
- **D:** Lana minerale doppia densità (16 cm)
- **E:** μSughero alta densità (3 cm) — sostituito con XPS nelle zone umide
- **O:** Rasatura Mapetherm + acril-silossanico
- **H:** Pannelli tecno-gesso HD (25mm) interno

**Dati:** Spessore 29 cm | Trasmittanza 0,159 W/m²K | Sfasamento 18,8 ore

**Monoblocco finestra:** Mazzette complete con paraspigoli, Purenit HD sul 4° lato inferiore (vasca protettiva impermeabile), posa rapida e precisa.

**Base XPS (evoluzione 2025-26):** Sostituzione del cordolo perimetrale in cemento con XPS ad altissima densità (700 kPa). Vantaggi: semplificazione platea, eliminazione ponti termici, protezione umidità di risalita.

### /sistema-x-frame/solai
**Solaio di copertura:**
- **A:** Struttura portante lamellare (16x32)
- **C:** Pannelli tre strati a vista (levigati e trattati)
- **D:** Lana di roccia 22 cm
- **I:** Pannelli OSB strutturali
- **F:** Freno vapore (interno) + membrana traspirante (esterno)

**Dati:** Spessore 40 cm | Trasmittanza 0,137 W/m²K | Sfasamento 14,5 ore

Moduli 2,10m x fino a 13m. Immediatamente calpestabili, stoccabili all'aperto.

**Solaio interpiano:** Spazi tecnici integrati per corrugati elettrici, tubazioni, impianti idraulici. Passaggio trasversale tramite interspazi nel tavolato di abete. Pavimentazione: SPC diretto o massetto alleggerito 5-10 cm per gres/ceramica.

### /sistema-x-frame/coperture
Tre tipologie:
- **Tetto piano** con leggera pendenza + pannelli metallici coibentati
- **Tetto a una falda** con struttura inclinata a vista
- **Tetto a due falde** con tegole (per pendenze >10%)

Monoblocchi già dotati di camera di ventilazione e contro-listelli per ancoraggio tegole.

Manto finale: pannelli grecati coibentati (basse pendenze/tetti non a vista) | pannelli strutturali con tegola antichizzata o moderna | tegole tradizionali in argilla/laterizi.

Gronde e scossaline pluviali in alluminio.

### /sistema-x-frame/trasporto-montaggio
**Trasporto orizzontale** (vantaggio esclusivo X-Frame):
- Pareti e solai viaggiano in posizione orizzontale (vs verticale della concorrenza)
- Vantaggi: stabilità, sicurezza, quantità doppia per viaggio, facilità di movimentazione
- **"Dimezziamo i carichi"** — dove altri usano 4 bilici, EcoLive ne usa 2
- Organizzazione carico ottimizzata: sotto i monoblocchi tetto/solaio, sopra pareti/travi/pilastri
- Travatura viaggia dentro i monoblocchi solaio interpiano

**Montaggio (struttura fino a 150 mq, 1 livello, 1 giornata):**
- Mattina: piastre base + pilastri (~30 min), poi pareti perimetrali (~2 ore)
- Pomeriggio: monoblocchi copertura
- Giorno dopo: fissaggio definitivo
- Risorse: 8-12 operatori, 1 autogru (30m+ sbraccio), 3 squadre specializzate
- Coordinatore generale (supervisore sicurezza)

**Tempi di riferimento (struttura ~100 mq):**
- Grezzo di base: 3 giorni
- Grezzo avanzato: 7 giorni
- Chiavi in mano: 30 giorni

### /sistema-x-frame/confronto

**Confronto 1: X-Frame vs Telaio vs X-Lam (14 parametri)**
Dati dalla brochure 2025. X-Frame eccelle in: prefabbricazione, tempi cantiere, capacità dissipativa, resistenza fuoco, trasmittanza, sfasamento, flessibilità impiantistica, prezzo a parità di classe. Punteggi inferiori solo in diffusione storica e numero costruzioni (sistema nuovo).

**Confronto 2: X-Frame vs Muratura Tradizionale**

| Parametro | EcoLive X-Frame | Muratura Tradizionale |
|---|---|---|
| Tempo struttura | 3-7 giorni | 12-48 mesi |
| Chiavi in mano | 30 giorni | Non definibile |
| Classe energetica base | A1 | B-C (con cappotto) |
| Classe energetica max | A4 (passiva) | A1 (raro, costoso) |
| Trasmittanza pareti | 0,159 W/m²K | 0,28-0,40 W/m²K |
| Sfasamento | 18,8 ore | 8-12 ore |
| Antisismicità | Eccellente (capacità dissipativa) | Dipende da esecuzione |
| Prefabbricazione | 95%+ in laboratorio | 0% (tutto in cantiere) |
| Ponti termici | Eliminati (base XPS) | Presenti (cordoli, pilastri) |
| Controllo qualità | Laboratorio controllato | Cantiere (intemperie) |
| Garanzia struttura | 50 anni | Non standard |
| Durabilità | Praticamente eterna | 30-50 anni |

Sezione narrativa: "Perché costiamo di più e perché vale di più"

---

## 5. Configuratore Visivo 2D

### Flusso a 5 Step

**Step 1: Tipologia**
4 card selezionabili: Glamping, SmartSuite, Residenziali, Luxury
Ogni card: rendering, range m², range prezzo, breve descrizione

**Step 2: Dimensione Modulare**
Griglia basata su maglia strutturale 4-4,5m x 7m
Combinazioni modulari per tipologia. Esempio Residenziali: 56 m², 112 m², 168 m², ecc.
Mostra: dimensione totale, livelli, ingombro

**Step 3: Livello di Finitura**
- **Essenziale** — OSB, cappotto polistirene, struttura standard
- **Premium** — Tre strati, sughero, finiture complete (riferimento: 1.250 €/mq GA, +430 €/mq CiM)
- **Passiva** — Premium + Therma V R290 + FV bi-facciali 700W → Classe A4

Spaccato parete che cambia visivamente

**Step 4: Planimetria Interattiva 2D**
Vista dall'alto. Layout di default proposto.
Drag & resize di stanze predefinite (soggiorno, cucina, camere, bagni).
Vincoli strutturali automatici (pareti portanti, moduli).
Tipo tetto selezionabile.

**Step 5: Riepilogo e Azione**
- Rendering di riferimento
- Riepilogo: tipologia, m², finitura, stanze, tetto
- **Range prezzo indicativo** (calcolato dal riferimento 1.250 €/mq premium residenziale)
- Disclaimer: preventivo definitivo dopo visita
- **CTA: "Prenota la tua visita in sede"**
- **CTA: "Salva e ricevi via email"**
- Form: nome, email, telefono, località terreno, note
- Lead salvato in Payload CMS

---

## 6. Pagine Secondarie

### /il-processo — Timeline 7 Step
1. Primo contatto → invito in sede con documentazione (bozza, rilievo, catastale)
2. Visita in sede → sistema dal vivo, firma mandato (nessun costo alla visita)
3. Progettazione → sopralluogo drone, Revit, rendering fotorealistici (pagamento 50%+50%, scorporato dal prezzo casa)
4. Contratto → appalto formale, termini essenziali, fasi definite
5. Preparazione cantiere → platea a cura cliente, documentazione foto/video, verifica EcoLive
6. Produzione → laboratorio EcoLive, ambiente controllato, 1-2 bilici
7. Montaggio → 1 giornata, squadre coordinate, documentazione time-lapse/drone

Tabella pagamenti dal listino 2025:
- **Grezzo avanzato:** 10% firma + 30% 60gg prima + 30% grezzo base + 30% grezzo avanzato
- **Chiavi in mano:** 30% impianti + 40% infissi + 20% pavimenti + 10% consegna

### /professionisti
- Linguaggio tecnico: Eurocodice 5, stratigrafie con codici A-Q, dati trasmittanza/sfasamento
- Prospettiva BIM su Revit
- Vantaggi: differenziazione, materiale di presentazione, supporto tecnico
- CTA: "Diventa partner tecnico"

### /franchising
- Visione: decentralizzare la produzione
- Vantaggio unico: "Noi ti diamo il cliente"
- Offerta: know-how, formazione, macchinari (~€100k), flusso clienti garantito
- Modello: royalty + fee d'ingresso
- CTA → contatto Area legale/Affiliazioni

### /chi-siamo
- Storia e filosofia: "Poche case, ma perfette — sartoriali"
- Stabilimento Spadola (VV), centro di trasformazione autorizzato
- Team: Dominik Gallè (Amm.), Arch. Pasquale Zaffino (Dir. tecnico), Ing. Luisa Baffa (Commerciale), Dott.ssa Sara Santaguida (Legale/Affiliazioni)
- Materia prima: legno lamellare (con visione filiera locale futura)
- Payoff: "La bioedilizia più innovativa parte dal Sud"

### /contatti
- Mappa + sede: Via Conte Ruggero 128, 89822 Spadola (VV)
- Tel: (0963) 530945 / 366.2037106
- Email: info@ecolive.srl
- Form con campo "oggetto": privato / professionista / affiliazione
- Lead in Payload CMS

### /faq
Strutturata per categorie:
- **Costi:** Quanto costa una casa? Come funzionano i pagamenti?
- **Tempi:** Quanto ci vuole? Cosa devo preparare prima?
- **Materiali:** Che legno usate? Il sughero vs polistirene?
- **Garanzie:** Quanto dura? Cosa copre?
- **Terreno:** Devo avere un terreno? Che caratteristiche serve?
- **Confronto:** Perché EcoLive costa di più? Differenze con muratura?

### /news (Blog)
Articoli SEO da CMS Payload su:
- Bioedilizia e sostenibilità
- Efficienza energetica e casa passiva
- Confronti costruttivi
- Normative e incentivi
- Novità EcoLive e cantieri

---

## 7. Dati Tecnici di Riferimento

### Listino Prezzi 2025 (Parete Premium Residenziale)
- **Grezzo avanzato:** 1.250 €/mq — Classe energetica A1
- **Chiavi in mano:** +430 €/mq (totale ~1.680 €/mq)
- **Optional Classe A4:** +€10.000 (piccole/medie) | +€18.000 (medie/grandi)

### Specifiche Tecniche Chiavi in Mano
- Infissi PVC 76mm Libra Horizon SPI, 3 guarnizioni, Ug=0.7
- Portone blindato RC3 UNI-EN 1627 con Wm2 1.3
- Frangisole orientabili motorizzati in alluminio estruso
- VMC puntuale con recupero entalpico
- Climatizzatori HVAC multisplit LG dual inverter (A+++) con ionizzatori
- ACS pompa calore dual inverter LG WH20S con accumulo 300Lt + pannelli solari termici
- Domotica Alexa/Apple HomeKit
- Pannelli gesso fibro-rinforzati classe A1 (UNI EN 15283-2)
- Pavimentazione SPC Xfloor o Gres
- Porte filo muro con cerniere a scomparsa e serrature magnetiche
- Optional: LG Therma V R290 (A+++) + FV bi-facciali 700W

### Certificazioni
- Classe A4 CliMAX
- Passive House Institute / PHIUS
- ARCA (Certificazione di Qualità e Sostenibilità)
- LEED for Homes
- Woodworks for Residential Construction

### Garanzie
- Struttura (grezzo avanzato): **50 anni**
- Chiavi in mano: **10 anni** (fornitori/subappaltatori)

### Incentivi
- Casa campione/esposizione: **sconto 5%** (prima costruzione in un distretto, attiva 2 anni)
- Aumento 3-5% per costruzioni Centro/Nord (trasporto, trasferte)

---

## 8. Dati Aziendali

**ECOLIVE S.r.l.**
Via Conte Ruggero, 128 — 89822 SPADOLA (VV)
P.IVA 03607430794
Tel: (0963) 530945 — 366.2037106
Email: info@ecolive.srl
Web: www.ecolive.srl

### Team
| Nome | Ruolo | Telefono |
|---|---|---|
| Dominik Gallè | Amministratore | 366.2037106 |
| Arch. Pasquale Zaffino | Direttore tecnico | 340.9013774 |
| Ing. Luisa Baffa | Resp. commerciale | 328.7107639 |
| Dott.ssa Sara Santaguida | Area legale / Affiliazioni | 338.7774250 |

---

## 9. Asset Multimediali Disponibili

| Tipo | Stato | Note |
|---|---|---|
| Rendering/animazioni 3D case | Disponibili | Da Revit/Blender/Twinmotion |
| Video time-lapse costruzioni | Disponibili | Cantieri precedenti |
| Riprese drone cantieri/siti | Disponibili | |
| Spaccati tecnici X-Frame | Disponibili | Dalla brochure + nuovi |
| Foto professionali case finite | Da produrre | |
| Video stabilimento produttivo | Da produrre | |
| Brochure 2025 completa | Disponibile | storage.fodivps2.cloud |

---

## 10. SEO Strategy (Fase 1)

### Target Keywords (locale/regionale)
- "case prefabbricate in legno Calabria"
- "bioedilizia Sud Italia"
- "costruttore case legno Calabria"
- "case passive Calabria"
- "casa prefabbricata legno prezzo"
- "sistema costruttivo X-Frame"
- "EcoLive case legno"
- "case legno vs muratura"

### Struttura SEO
- Ogni sotto-pagina X-Frame targettizza keyword specifiche
- Blog/News per contenuti educativi e long-tail
- Schema markup: LocalBusiness, Product, FAQ, HowTo
- Meta tag ottimizzati per ogni pagina

---

## 11. Decision Log

| # | Decisione | Alternative | Motivazione |
|---|---|---|---|
| 1 | Evoluzione graduale 3 fasi | Tutto insieme, solo sito | Complessità gestibile, ROI incrementale |
| 2 | Funnel primario privato + percorsi B2B | Funnel unico, solo B2B | Privato = cliente principale, professionisti/imprenditori = moltiplicatori |
| 3 | Tono: artigianato + rivoluzione | Solo tecnico, solo emozionale | Credibilità artigianale + messaggio dirompente |
| 4 | Configuratore visivo 2D | Semplice, 3D, wizard | Equilibrio impatto/fattibilità |
| 5 | Storytelling a Imbuto | Hub centrale, Config-first | Percorso logico, SEO forte, scalabile |
| 6 | EcoLive unico attore | Doppio brand | Evoluzione aziendale reale |
| 7 | Stack confermato | Altro stack | Infrastruttura funzionante |
| 8 | Design attuale come base | Design da zero | Estetica funziona, mancavano contenuti |
| 9 | Contesto > brochure | Brochure prioritaria | Contesto più aggiornato |
| 10 | Prezzi come range indicativo | Listino dettagliato, nessun prezzo | Riferimento 1.250€/mq, dettagli dopo visita |
| 11 | 4 tipologie confermate | Ridurre/aggiungere | Copertura completa gamma |
| 12 | Confronto a 3 vie | Solo vs muratura | Dati brochure + contesto |

---

## 12. Priorità di Implementazione (Fase 1)

### Sprint 1: Fondamenta
- Setup nuovo progetto (o clean slate su esistente)
- Layout globale (header, footer, navigazione)
- Home page completa
- Pagina Chi Siamo
- Pagina Contatti con form

### Sprint 2: Sistema X-Frame
- Pagina overview + 5 sotto-pagine tecniche
- Spaccati interattivi animati
- Tabelle comparative

### Sprint 3: Tipologie + Progetti
- 4 pagine tipologie con dati da tipologie.ts evoluto
- Pagina listing progetti (da CMS)
- Template singolo progetto

### Sprint 4: Configuratore
- Wizard 5 step
- Planimetria 2D interattiva
- Calcolo range prezzo
- Form lead + salvataggio CMS

### Sprint 5: Pagine Secondarie + SEO
- Il Processo (timeline)
- Professionisti
- Franchising
- FAQ
- Blog/News
- Schema markup + meta tag + sitemap

### Sprint 6: Polish + Deploy
- Performance optimization
- Mobile responsive
- Test cross-browser
- SEO audit finale
- Deploy su dominio www.ecolive.srl
