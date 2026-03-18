#!/bin/bash
cd "/Users/william/Cosmos Daily/images"

download() {
  local id="$1"
  local article="$2"
  local url=$(curl -sL "https://en.wikipedia.org/api/rest_v1/page/summary/${article}" | grep -o '"source":"[^"]*"' | head -1 | sed 's/"source":"//;s/"//')
  if [ -n "$url" ]; then
    curl -sL -o "${id}.jpg" "$url"
    local type=$(file -b "${id}.jpg" | head -1)
    if echo "$type" | grep -qi "image\|jpeg\|png\|gif"; then
      echo "OK: $id"
    else
      echo "FAIL (not image): $id"
      rm -f "${id}.jpg"
    fi
  else
    echo "FAIL (no URL): $id"
  fi
  sleep 0.3
}

download "akhenaten-revolution" "Akhenaten"
download "archilochus-eclipse" "Archilochus"
download "armenian-genocide" "Armenian_genocide"
download "assyrian-eclipse-nineveh" "Nineveh"
download "aztec-tenochtitlan-founding" "Tenochtitlan"
download "birth-of-buddha" "Gautama_Buddha"
download "black-death-celestial-cause" "Black_Death"
download "cern-lhc" "Large_Hadron_Collider"
download "chinese-cultural-revolution" "Cultural_Revolution"
download "civil-rights-act" "Civil_Rights_Act_of_1964"
download "confucius-halleys-comet" "Confucius"
download "cuban-revolution" "Cuban_Revolution"
download "discovery-of-neptune" "Discovery_of_Neptune"
download "dot-com-crash" "Dot-com_bubble"
download "fall-of-aztec-empire" "Fall_of_Tenochtitlan"
download "fall-of-soviet-union" "Dissolution_of_the_Soviet_Union"
download "first-olympic-games" "Ancient_Olympic_Games"
download "gandhis-salt-march" "Salt_March"
download "hong-kong-protests" "2019%E2%80%932020_Hong_Kong_protests"
download "hurricane-katrina" "Hurricane_Katrina"
download "indus-valley-collapse" "Indus_Valley_Civilisation"
download "iphone-social-media" "IPhone_(1st_generation)"
download "irish-great-famine" "Great_Famine_(Ireland)"
download "korean-war" "Korean_War"
download "magellan-circumnavigation" "Magellan_expedition"
download "meiji-restoration" "Meiji_Restoration"
download "mlk-assassination" "Assassination_of_Martin_Luther_King_Jr."
download "nebra-sky-disk" "Nebra_sky_disc"
download "neptune-pluto-conjunction" "Nikola_Tesla"
download "nixon-ends-gold-standard" "Nixon_shock"
download "penicillin-mass-use" "Penicillin"
download "phoenician-alphabet" "Phoenician_alphabet"
download "rise-of-uruk" "Uruk"
download "salem-witch-trials" "Salem_witch_trials"
download "sargon-of-akkad" "Sargon_of_Akkad"
download "shang-oracle-bones" "Oracle_bone"
download "stonehenge-phase-i" "Stonehenge"
download "tiananmen-square" "1989_Tiananmen_Square_protests_and_massacre"
download "treaty-of-westphalia" "Peace_of_Westphalia"
download "trinity-nuclear-test" "Trinity_(nuclear_test)"
download "trojan-war-eclipse" "Trojan_War"
download "trump-attempt" "Attempted_assassination_of_Donald_Trump"
download "unification-of-egypt" "Narmer"
download "zhou-mandate-of-heaven" "Mandate_of_Heaven"

echo ""
echo "Done! Check for any FAIL messages above."
