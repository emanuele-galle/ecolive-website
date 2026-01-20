#!/bin/bash

# Seed script for Ecolive website
# Uploads images and creates projects/news via Payload API

API_URL="http://localhost:3010/api"
TOKEN="$1"

if [ -z "$TOKEN" ]; then
  echo "Usage: ./seed-content.sh <JWT_TOKEN>"
  exit 1
fi

AUTH="Authorization: Bearer $TOKEN"

echo "=== ECOLIVE CONTENT SEED ==="
echo ""

# Function to upload image and get ID
upload_image() {
  local file="$1"
  local alt="$2"

  response=$(curl -s -X POST "$API_URL/media" \
    -H "$AUTH" \
    -F "file=@$file" \
    -F "alt=$alt")

  echo "$response" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2
}

# Function to create project
create_project() {
  local data="$1"
  curl -s -X POST "$API_URL/projects" \
    -H "$AUTH" \
    -H "Content-Type: application/json" \
    -d "$data"
}

# Function to create news
create_news() {
  local data="$1"
  curl -s -X POST "$API_URL/news" \
    -H "$AUTH" \
    -H "Content-Type: application/json" \
    -d "$data"
}

echo "1. Uploading images..."

# Upload project images
echo "   - Polistena..."
IMG_POLISTENA=$(upload_image "/tmp/ecolive-images/progetti/polistena.jpg" "Villa Polistena - Casa in legno Ecolive")
echo "     ID: $IMG_POLISTENA"

echo "   - Girifalco..."
IMG_GIRIFALCO=$(upload_image "/tmp/ecolive-images/progetti/girifalco.jpg" "Bifamiliare Girifalco - Casa in legno Ecolive")
echo "     ID: $IMG_GIRIFALCO"

echo "   - Limbadi..."
IMG_LIMBADI=$(upload_image "/tmp/ecolive-images/progetti/limbadi.jpeg" "Casa Limbadi - Casa in legno Ecolive")
echo "     ID: $IMG_LIMBADI"

echo "   - Squillace..."
IMG_SQUILLACE=$(upload_image "/tmp/ecolive-images/progetti/squillace.jpg" "Villa Squillace - Casa in legno Ecolive")
echo "     ID: $IMG_SQUILLACE"

echo "   - Lamezia..."
IMG_LAMEZIA=$(upload_image "/tmp/ecolive-images/progetti/lamezia.jpg" "Casa Lamezia - Casa in legno Ecolive")
echo "     ID: $IMG_LAMEZIA"

echo "   - Hero..."
IMG_HERO=$(upload_image "/tmp/ecolive-images/generale/hero.jpg" "Villa moderna Ecolive - Sistema X-Frame")
echo "     ID: $IMG_HERO"

echo "   - Chi Siamo..."
IMG_CHISIAMO=$(upload_image "/tmp/ecolive-images/generale/chi-siamo.jpg" "Team Ecolive - Chi siamo")
echo "     ID: $IMG_CHISIAMO"

# Upload team images
echo "   - Dominik..."
IMG_DOMINIK=$(upload_image "/tmp/ecolive-images/team/dominik-galle.jpeg" "Dominik Galle - Amministratore Ecolive")
echo "     ID: $IMG_DOMINIK"

echo "   - Pasquale..."
IMG_PASQUALE=$(upload_image "/tmp/ecolive-images/team/pasquale-zaffino.jpg" "Pasquale Zaffino - Architetto Ecolive")
echo "     ID: $IMG_PASQUALE"

echo "   - Luisa..."
IMG_LUISA=$(upload_image "/tmp/ecolive-images/team/luisa-baffa-trasci.jpg" "Luisa Baffa Trasci - Commerciale Ecolive")
echo "     ID: $IMG_LUISA"

echo ""
echo "2. Creating projects..."

# Project 1: Polistena
echo "   - Villa Polistena..."
create_project '{
  "title": "Villa Residenziale Polistena",
  "slug": "villa-polistena",
  "category": "residenziale",
  "featuredImage": '"$IMG_POLISTENA"',
  "description": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Una dimora di prestigio che fonde estetica contemporanea con principi di sostenibilita, costruita con il sistema X-Frame innovativo di Ecolive. Piano terra di 225 mq con open space (cucina, soggiorno, sala da pranzo) e porticato in legno. Primo piano di 130 mq con camere da letto e terrazze panoramiche."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "location": "Polistena (RC), Calabria",
  "year": 2020,
  "area": 355,
  "floors": 2,
  "features": [
    {"feature": "Sistema X-Frame classe A4"},
    {"feature": "Open space piano terra"},
    {"feature": "Porticato in legno"},
    {"feature": "Terrazze panoramiche"}
  ],
  "certifications": ["classe-a-plus"],
  "seo": {
    "metaTitle": "Villa Residenziale Polistena | Case in Legno Ecolive",
    "metaDescription": "Villa di 355 mq su due piani a Polistena, realizzata con sistema X-Frame classe A4."
  },
  "_status": "published"
}' > /dev/null

# Project 2: Girifalco
echo "   - Bifamiliare Girifalco..."
create_project '{
  "title": "Bifamiliare Girifalco",
  "slug": "bifamiliare-girifalco",
  "category": "residenziale",
  "featuredImage": '"$IMG_GIRIFALCO"',
  "description": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Progetto bifamiliare con due unita abitative indipendenti, costruite con sistema X-Frame. Ogni unita dispone di 130 mq al piano terra e 60 mq al primo piano. Zona giorno accogliente con soggiorno, sala da pranzo e cucina."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "location": "Girifalco (CZ), Calabria",
  "year": 2020,
  "area": 190,
  "floors": 2,
  "features": [
    {"feature": "Due unita abitative"},
    {"feature": "Sistema X-Frame classe A4"},
    {"feature": "Zona giorno open space"}
  ],
  "certifications": ["classe-a-plus"],
  "_status": "published"
}' > /dev/null

# Project 3: Limbadi
echo "   - Casa Limbadi..."
create_project '{
  "title": "Casa Moderna Limbadi",
  "slug": "casa-limbadi",
  "category": "residenziale",
  "featuredImage": '"$IMG_LIMBADI"',
  "description": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Abitazione moderna di 100 mq su un unico piano, con porticato esterno di 40 mq. Design contemporaneo e sostenibile con ampie vetrate e vista panoramica. Zona giorno open space, 3 camere da letto e 2 bagni moderni."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "location": "Limbadi (VV), Calabria",
  "year": 2020,
  "area": 100,
  "floors": 1,
  "features": [
    {"feature": "Porticato 40 mq"},
    {"feature": "3 camere da letto"},
    {"feature": "Ampie vetrate panoramiche"}
  ],
  "certifications": ["classe-a-plus"],
  "_status": "published"
}' > /dev/null

# Project 4: Squillace
echo "   - Villa Squillace..."
create_project '{
  "title": "Villa Squillace",
  "slug": "villa-squillace",
  "category": "residenziale",
  "featuredImage": '"$IMG_SQUILLACE"',
  "description": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Villa di 230 mq che rappresenta eccellenza della bioedilizia moderna. Design contemporaneo con tetto spiovente a due piani, terrazze e portico in legno. Spazi abitativi luminosi e aperti, perfettamente integrati con la natura circostante."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "location": "Squillace (CZ), Calabria",
  "year": 2020,
  "area": 230,
  "floors": 2,
  "features": [
    {"feature": "Tetto spiovente design"},
    {"feature": "Terrazze e portico in legno"},
    {"feature": "Integrazione con la natura"}
  ],
  "certifications": ["classe-a-plus"],
  "_status": "published"
}' > /dev/null

# Project 5: Lamezia
echo "   - Casa Lamezia..."
create_project '{
  "title": "Casa Lamezia",
  "slug": "casa-lamezia",
  "category": "residenziale",
  "featuredImage": '"$IMG_LAMEZIA"',
  "description": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Casa di 207 mq con garage esterno di 72 mq. Design moderno con tetto spiovente, ampie finestre e porte scorrevoli. Piano terra con cucina, sala da pranzo e soggiorno. Camere da letto al primo piano con eccellente illuminazione naturale."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "location": "Lamezia Terme (CZ), Calabria",
  "year": 2020,
  "area": 207,
  "floors": 2,
  "features": [
    {"feature": "Garage 72 mq"},
    {"feature": "Tetto spiovente"},
    {"feature": "Ampie finestre e porte scorrevoli"}
  ],
  "certifications": ["classe-a-plus"],
  "_status": "published"
}' > /dev/null

echo ""
echo "3. Creating news..."

# News 1
echo "   - Innovazione X-Frame..."
create_news '{
  "title": "Il Sistema X-Frame: Innovazione nella Bioedilizia",
  "slug": "sistema-x-frame-innovazione-bioedilizia",
  "publishedDate": "2025-01-10T10:00:00.000Z",
  "excerpt": "Scopri come Ecolive sta rivoluzionando il settore della bioedilizia con il sistema costruttivo X-Frame 2.0, combinando telaio, X-Lam e Post&Beam.",
  "content": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Il sistema X-Frame rappresenta evoluzione edilizia in legno. Sviluppato internamente da Ecolive tra il 2015 e il 2018, questo sistema ibrido combina i vantaggi del telaio tradizionale, X-Lam e Post&Beam per creare strutture di massima resistenza e efficienza energetica."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        },
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Grazie a questo sistema proprietario, siamo in grado di realizzare abitazioni in classe energetica A4/A+++ in soli 30 giorni, garantendo massima efficienza energetica e rispetto per ambiente."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "tags": ["innovazione", "bioedilizia"],
  "_status": "published"
}' > /dev/null

# News 2
echo "   - 25 anni di esperienza..."
create_news '{
  "title": "25 Anni di Esperienza nella Bioedilizia",
  "slug": "25-anni-esperienza-bioedilizia",
  "publishedDate": "2024-12-01T10:00:00.000Z",
  "excerpt": "Dal 1999 ad oggi: il percorso di Ecolive dalla costruzione in block-house al rivoluzionario sistema X-Frame.",
  "content": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Nel 1999 Ecolive iniziava la sua avventura nel mondo delle case in legno con il sistema block-house. Oggi, dopo 25 anni di esperienza e continua innovazione, siamo leader nel settore con il sistema X-Frame di nostra progettazione."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        },
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Tappe fondamentali: 2008 adozione sistema Platform, 2012 tecnologia X-Lam, 2015-2018 sviluppo X-Frame, 2024 consolidamento come leader di settore in Calabria e Sud Italia."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "tags": ["bioedilizia", "sostenibilita"],
  "_status": "published"
}' > /dev/null

# News 3
echo "   - Case in legno Calabria..."
create_news '{
  "title": "Case in Legno in Calabria: Vantaggi e Opportunita",
  "slug": "case-legno-calabria-vantaggi",
  "publishedDate": "2024-11-15T10:00:00.000Z",
  "excerpt": "Perche scegliere una casa in legno in Calabria? Scopri i vantaggi del sistema X-Frame per il clima mediterraneo.",
  "content": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "La Calabria offre condizioni ideali per le case in legno: clima mediterraneo, disponibilita di terreni e crescente attenzione alla sostenibilita. Il sistema X-Frame di Ecolive e stato progettato per rispondere perfettamente a queste esigenze."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        },
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "I nostri progetti a Polistena, Girifalco, Limbadi, Squillace e Lamezia dimostrano come sia possibile costruire abitazioni belle, efficienti e sostenibili nel Sud Italia."}],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "version": 1
    }
  },
  "tags": ["progetti", "sostenibilita"],
  "_status": "published"
}' > /dev/null

echo ""
echo "=== SEED COMPLETED ==="
echo ""
echo "Summary:"
echo "- 10 images uploaded"
echo "- 5 projects created"
echo "- 3 news articles created"
echo ""
echo "Image IDs for reference:"
echo "  Hero: $IMG_HERO"
echo "  Chi Siamo: $IMG_CHISIAMO"
echo "  Dominik: $IMG_DOMINIK"
echo "  Pasquale: $IMG_PASQUALE"
echo "  Luisa: $IMG_LUISA"
