#!/bin/bash
cd "/Users/william/Cosmos Daily/images"

dl() {
  local id="$1"
  local article="$2"
  # Remove bad file first
  rm -f "${id}.jpg"
  # Try Wikipedia API
  local url=$(curl -sL -H "User-Agent: CosmosDaily/1.0" "https://en.wikipedia.org/api/rest_v1/page/summary/${article}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('thumbnail',{}).get('source',''))" 2>/dev/null)
  if [ -n "$url" ] && [ "$url" != "" ]; then
    curl -sL -H "User-Agent: CosmosDaily/1.0" -o "${id}.jpg" "$url"
    local size=$(wc -c < "${id}.jpg")
    if [ "$size" -gt 5000 ]; then
      echo "OK: $id ($size bytes)"
      return
    fi
  fi
  echo "RETRY: $id with alt..."
  # Try alternate
  local url2=$(curl -sL -H "User-Agent: CosmosDaily/1.0" "https://en.wikipedia.org/api/rest_v1/page/summary/${3}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('thumbnail',{}).get('source',''))" 2>/dev/null)
  if [ -n "$url2" ] && [ "$url2" != "" ]; then
    curl -sL -H "User-Agent: CosmosDaily/1.0" -o "${id}.jpg" "$url2"
    local size2=$(wc -c < "${id}.jpg")
    if [ "$size2" -gt 5000 ]; then
      echo "OK: $id (alt, $size2 bytes)"
      return
    fi
  fi
  echo "FAIL: $id"
  sleep 0.3
}

dl "archilochus-eclipse" "Archilochus" "Solar_eclipse"
dl "confucius-halleys-comet" "Confucius" "Halley%27s_Comet"
dl "discovery-of-neptune" "Neptune" "Neptune_(planet)"
dl "fall-of-aztec-empire" "Siege_of_Tenochtitlan" "Hernán_Cortés"
dl "first-olympic-games" "Olympic_Games" "Olympia,_Greece"
dl "hong-kong-protests" "2019_Hong_Kong_protests" "Hong_Kong"
dl "indus-valley-collapse" "Mohenjo-daro" "Harappa"
dl "irish-great-famine" "Great_Famine_(Ireland)" "Ireland"
dl "magellan-circumnavigation" "Ferdinand_Magellan" "Victoria_(ship)"
dl "mlk-assassination" "Martin_Luther_King_Jr." "Martin_Luther_King_Jr._Memorial"
dl "neptune-pluto-conjunction" "Nikola_Tesla" "Thomas_Edison"
dl "penicillin-mass-use" "Penicillin" "Alexander_Fleming"
dl "phoenician-alphabet" "Phoenicia" "Byblos"
dl "rise-of-uruk" "Uruk" "Sumer"
dl "sargon-of-akkad" "Akkadian_Empire" "Mesopotamia"
dl "stonehenge-phase-i" "Stonehenge" "Salisbury_Plain"
dl "treaty-of-westphalia" "Peace_of_Westphalia" "Thirty_Years%27_War"
dl "trojan-war-eclipse" "Troy" "Trojan_War"
dl "trump-attempt" "Donald_Trump" "Butler,_Pennsylvania"
dl "unification-of-egypt" "Ancient_Egypt" "Narmer_Palette"
dl "zhou-mandate-of-heaven" "Zhou_dynasty" "King_Wu_of_Zhou"

echo ""
echo "Done!"
