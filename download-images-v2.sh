#!/bin/bash
# Download Wikipedia images for failed events using MediaWiki Action API
# Usage: cd "/Users/william/Cosmos Daily" && bash download-images-v2.sh

IMG_DIR="/Users/william/Cosmos Daily/images"
mkdir -p "$IMG_DIR"

OK=0
FAIL=0
SKIP=0
COUNT=0

download_image() {
    local id="$1"
    local article="$2"
    COUNT=$((COUNT + 1))

    if [ -f "$IMG_DIR/${id}.jpg" ]; then
        echo "[$COUNT] SKIP: ${id}.jpg already exists"
        SKIP=$((SKIP + 1))
        return 0
    fi

    # Use MediaWiki Action API with prop=pageimages to get thumbnail
    local thumb_url=$(curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=${article}&prop=pageimages&format=json&pithumbsize=800" 2>/dev/null | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    pages = d.get('query', {}).get('pages', {})
    for pid, page in pages.items():
        if 'thumbnail' in page:
            print(page['thumbnail']['source'])
            break
except: pass
" 2>/dev/null)

    if [ -z "$thumb_url" ]; then
        echo "[$COUNT] FAIL: ${id} - no image for '${article}'"
        FAIL=$((FAIL + 1))
        return 1
    fi

    curl -s -L -o "$IMG_DIR/${id}.jpg" "$thumb_url" 2>/dev/null

    if [ -f "$IMG_DIR/${id}.jpg" ] && [ -s "$IMG_DIR/${id}.jpg" ]; then
        local size=$(wc -c < "$IMG_DIR/${id}.jpg" | tr -d ' ')
        echo "[$COUNT] OK: ${id}.jpg (${size} bytes)"
        OK=$((OK + 1))
    else
        echo "[$COUNT] FAIL: ${id} - download failed"
        rm -f "$IMG_DIR/${id}.jpg"
        FAIL=$((FAIL + 1))
    fi
}

echo "=== Downloading images (v2 - MediaWiki Action API) ==="
echo ""

download_image "trump-attempt" "Attempted_assassination_of_Donald_Trump"
download_image "rise-of-uruk" "Uruk"
download_image "unification-of-egypt" "Narmer"
download_image "stonehenge-phase-i" "Stonehenge"
download_image "sargon-of-akkad" "Sargon_of_Akkad"
download_image "nebra-sky-disk" "Nebra_sky_disc"
download_image "akhenaten-revolution" "Akhenaten"
download_image "shang-oracle-bones" "Oracle_bone"
download_image "trojan-war-eclipse" "Trojan_War"
download_image "zhou-mandate-of-heaven" "Mandate_of_Heaven"
download_image "phoenician-alphabet" "Phoenician_alphabet"
download_image "first-olympic-games" "Ancient_Olympic_Games"
download_image "assyrian-eclipse-nineveh" "Nineveh"
download_image "archilochus-eclipse" "Archilochus"
download_image "birth-of-buddha" "Gautama_Buddha"
download_image "confucius-halleys-comet" "Confucius"
download_image "indus-valley-collapse" "Indus_Valley_Civilisation"
download_image "aztec-tenochtitlan-founding" "Tenochtitlan"
download_image "black-death-celestial-cause" "Black_Death"
download_image "fall-of-aztec-empire" "Fall_of_Tenochtitlan"
download_image "magellan-circumnavigation" "Ferdinand_Magellan"
download_image "salem-witch-trials" "Salem_witch_trials"
download_image "treaty-of-westphalia" "Peace_of_Westphalia"
download_image "discovery-of-neptune" "Neptune"
download_image "irish-great-famine" "Great_Famine_(Ireland)"
download_image "meiji-restoration" "Meiji_Restoration"
download_image "neptune-pluto-conjunction" "Nikola_Tesla"
download_image "armenian-genocide" "Armenian_genocide"
download_image "gandhis-salt-march" "Salt_March"
download_image "korean-war" "Korean_War"
download_image "cuban-revolution" "Cuban_Revolution"
download_image "civil-rights-act" "Civil_Rights_Act_of_1964"
download_image "mlk-assassination" "Assassination_of_Martin_Luther_King_Jr."
download_image "nixon-ends-gold-standard" "Nixon_shock"
download_image "tiananmen-square" "1989_Tiananmen_Square_protests_and_massacre"
download_image "fall-of-soviet-union" "Dissolution_of_the_Soviet_Union"
download_image "dot-com-crash" "Dot-com_bubble"
download_image "hurricane-katrina" "Hurricane_Katrina"
download_image "hong-kong-protests" "2019%E2%80%932020_Hong_Kong_protests"
download_image "chinese-cultural-revolution" "Cultural_Revolution"
download_image "iphone-social-media" "IPhone_(1st_generation)"
download_image "penicillin-mass-use" "Penicillin"
download_image "cern-lhc" "Large_Hadron_Collider"
download_image "trinity-nuclear-test" "Trinity_(nuclear_test)"

echo ""
echo "=== Done ==="
echo "OK: $OK | SKIP: $SKIP | FAIL: $FAIL | Total: $COUNT"
