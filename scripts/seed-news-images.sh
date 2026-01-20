#!/bin/bash

# Seed script for News images
# Downloads images from MinIO and uploads to Payload, then links to news articles

API_URL="http://localhost:3010/api"

echo "=== SEED NEWS IMAGES ==="
echo ""

# Get credentials from .env
source /var/www/projects/ecolive-website/.env 2>/dev/null

# Login to get token
echo "1. Authenticating..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"admin@ecolive.it\", \"password\": \"admin123\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "   ERROR: Could not authenticate. Trying default credentials..."
  LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/users/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"info@ecolive.srl\", \"password\": \"Ecolive2024!\"}")
  TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
fi

if [ -z "$TOKEN" ]; then
  echo "   ERROR: Authentication failed. Please check credentials."
  exit 1
fi

echo "   Token obtained: ${TOKEN:0:20}..."
AUTH="Authorization: Bearer $TOKEN"

# Create temp directory
mkdir -p /tmp/news-images

# Download images from MinIO
echo ""
echo "2. Downloading images from MinIO..."

curl -s "https://storage.fodivps2.cloud/ecolive-media/news/rai-interview.png" -o /tmp/news-images/rai-interview.png
echo "   - rai-interview.png downloaded"

curl -s "https://storage.fodivps2.cloud/ecolive-media/news/evento-serra.jpg" -o /tmp/news-images/evento-serra.jpg
echo "   - evento-serra.jpg downloaded"

curl -s "https://storage.fodivps2.cloud/ecolive-media/news/innovazione.jpg" -o /tmp/news-images/innovazione.jpg
echo "   - innovazione.jpg downloaded"

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

# Function to update news article with image
update_news_image() {
  local slug="$1"
  local image_id="$2"

  # First get the news ID by slug
  news_response=$(curl -s "$API_URL/news?where[slug][equals]=$slug" -H "$AUTH")
  news_id=$(echo "$news_response" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

  if [ -n "$news_id" ]; then
    # Update the news with the image
    curl -s -X PATCH "$API_URL/news/$news_id" \
      -H "$AUTH" \
      -H "Content-Type: application/json" \
      -d "{\"featuredImage\": $image_id}" > /dev/null
    echo "   Updated news ID $news_id with image ID $image_id"
  else
    echo "   WARNING: News with slug '$slug' not found"
  fi
}

echo ""
echo "3. Uploading images to Payload..."

# Upload RAI Interview image
echo "   - Uploading rai-interview.png..."
IMG_RAI=$(upload_image "/tmp/news-images/rai-interview.png" "Intervista RAI 3 - Casa del Futuro Ecolive")
echo "     Media ID: $IMG_RAI"

# Upload Evento Serra image
echo "   - Uploading evento-serra.jpg..."
IMG_SERRA=$(upload_image "/tmp/news-images/evento-serra.jpg" "Evento Serra San Bruno - Bioedilizia Ecolive")
echo "     Media ID: $IMG_SERRA"

# Upload Innovazione image
echo "   - Uploading innovazione.jpg..."
IMG_INNOV=$(upload_image "/tmp/news-images/innovazione.jpg" "Innovazione Produzione Case in Legno Italia")
echo "     Media ID: $IMG_INNOV"

echo ""
echo "4. Linking images to news articles..."

# Link images to news articles
update_news_image "intervista-rai-3-casa-futuro" "$IMG_RAI"
update_news_image "evento-serra-san-bruno-bioedilizia" "$IMG_SERRA"
update_news_image "innovazione-produzione-case-legno-italia" "$IMG_INNOV"

echo ""
echo "5. Cleanup..."
rm -rf /tmp/news-images

echo ""
echo "=== DONE ==="
echo "Visit http://72.61.184.133:3010/news to verify images"
