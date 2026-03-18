#!/bin/bash
# Download Wikipedia/Wikimedia images for all 61 events
# Uses direct Wikimedia Commons URLs (most reliable)
# Usage: cd "/Users/william/Cosmos Daily" && bash download-images-v3.sh

IMG_DIR="/Users/william/Cosmos Daily/images"
mkdir -p "$IMG_DIR"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

OK=0
FAIL=0
SKIP=0

download() {
    local file="$1" url="$2"
    if [ -f "$IMG_DIR/$file" ]; then
        echo "SKIP: $file (exists)"
        SKIP=$((SKIP + 1))
        return
    fi
    curl -sS -L -o "$IMG_DIR/$file" -H "User-Agent: $UA" -H "Referer: https://en.wikipedia.org/" "$url"
    if [ $? -eq 0 ] && [ -s "$IMG_DIR/$file" ]; then
        echo "OK: $file ($(wc -c < "$IMG_DIR/$file" | tr -d ' ') bytes)"
        OK=$((OK + 1))
    else
        echo "FAIL: $file"
        rm -f "$IMG_DIR/$file"
        FAIL=$((FAIL + 1))
    fi
    sleep 0.5
}

echo "=== Downloading images for 61 Cosmos Daily events ==="
echo ""

# 1. trump-attempt
download "trump-attempt.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Trump_assassination_attempt_-_2024-07-13.jpg/800px-Trump_assassination_attempt_-_2024-07-13.jpg"

# 2. epstein-arrest
download "epstein-arrest.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ghislaine_Maxwell_and_Jeffrey_Epstein_%28cropped%29.jpg/800px-Ghislaine_Maxwell_and_Jeffrey_Epstein_%28cropped%29.jpg"

# 3. operation-paperclip
download "operation-paperclip.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Project_Paperclip_Team_at_Fort_Bliss.jpg/800px-Project_Paperclip_Team_at_Fort_Bliss.jpg"

# 4. gulf-of-tonkin
download "gulf-of-tonkin.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/USS_Maddox_%28DD-731%29.jpg/800px-USS_Maddox_%28DD-731%29.jpg"

# 5. oklahoma-city
download "oklahoma-city.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Oklahomacitybombing-DF-ST-98-01356.jpg/800px-Oklahomacitybombing-DF-ST-98-01356.jpg"

# 6. maxwell-trial
download "maxwell-trial.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ghislaine_Maxwell_%28cropped%29.jpg/800px-Ghislaine_Maxwell_%28cropped%29.jpg"

# 7. ufo-disclosure
download "ufo-disclosure.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Go_Fast_UFO.png/800px-Go_Fast_UFO.png"

# 8. bitcoin-whitepaper
download "bitcoin-whitepaper.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"

# 9. nato-formed
download "nato-formed.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Flag_of_NATO.svg/800px-Flag_of_NATO.svg.png"

# 10. rigveda-eclipse
download "rigveda-eclipse.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Rigveda_MS2097.jpg/800px-Rigveda_MS2097.jpg"

# 11. rise-of-uruk
download "rise-of-uruk.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Warka_Vase%2C_Uruk%2C_c._3200-3000_BC.jpg/800px-Warka_Vase%2C_Uruk%2C_c._3200-3000_BC.jpg"

# 12. unification-of-egypt
download "unification-of-egypt.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Narmer_Palette.jpg/800px-Narmer_Palette.jpg"

# 13. stonehenge-phase-i
download "stonehenge-phase-i.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/800px-Stonehenge2007_07_30.jpg"

# 14. sargon-of-akkad
download "sargon-of-akkad.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sargon_of_Akkad.jpg/800px-Sargon_of_Akkad.jpg"

# 15. venus-tablet-ammisaduqa
download "venus-tablet-ammisaduqa.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Venus_Tablet_of_Ammisaduqa.jpg/800px-Venus_Tablet_of_Ammisaduqa.jpg"

# 16. nebra-sky-disk
download "nebra-sky-disk.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Nebra_Scheibe.jpg/800px-Nebra_Scheibe.jpg"

# 17. akhenaten-revolution
download "akhenaten-revolution.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/GD-EG-Caire-Mus%C3%A9e061.JPG/800px-GD-EG-Caire-Mus%C3%A9e061.JPG"

# 18. shang-oracle-bones
download "shang-oracle-bones.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Shang_dynasty_inscribed_tortoise_plastron.jpg/800px-Shang_dynasty_inscribed_tortoise_plastron.jpg"

# 19. trojan-war-eclipse
download "trojan-war-eclipse.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/The_Burning_of_Troy_%281759%29.jpg/800px-The_Burning_of_Troy_%281759%29.jpg"

# 20. joshuas-eclipse
download "joshuas-eclipse.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Joshua_Commanding_the_Sun_to_Stand_Still_upon_Gibeon.jpg/800px-Joshua_Commanding_the_Sun_to_Stand_Still_upon_Gibeon.jpg"

# 21. zhou-mandate-of-heaven
download "zhou-mandate-of-heaven.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Song_of_the_Western_Zhou.jpg/800px-Song_of_the_Western_Zhou.jpg"

# 22. phoenician-alphabet
download "phoenician-alphabet.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Phoenician_alphabet.svg/800px-Phoenician_alphabet.svg.png"

# 23. first-olympic-games
download "first-olympic-games.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Olympia-Stadium.jpg/800px-Olympia-Stadium.jpg"

# 24. assyrian-eclipse-nineveh
download "assyrian-eclipse-nineveh.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Nineveh_Mashki_Gate_Exterior.JPG/800px-Nineveh_Mashki_Gate_Exterior.JPG"

# 25. archilochus-eclipse
download "archilochus-eclipse.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Total_solar_eclipse_1999_in_France.jpg/800px-Total_solar_eclipse_1999_in_France.jpg"

# 26. birth-of-buddha
download "birth-of-buddha.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kamakura_Budda_Daibutsu_front_1885.jpg/800px-Kamakura_Budda_Daibutsu_front_1885.jpg"

# 27. confucius-halleys-comet
download "confucius-halleys-comet.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Confucius_Tang_Dynasty.jpg/800px-Confucius_Tang_Dynasty.jpg"

# 28. indus-valley-collapse
download "indus-valley-collapse.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mohenjo-daro_Priesterk%C3%B6nig.jpeg/800px-Mohenjo-daro_Priesterk%C3%B6nig.jpeg"

# 29. aztec-tenochtitlan-founding
download "aztec-tenochtitlan-founding.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/The_Founding_of_Tenochtitlan.jpg/800px-The_Founding_of_Tenochtitlan.jpg"

# 30. black-death-celestial-cause
download "black-death-celestial-cause.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Plague_in_an_Ancient_City_LACMA_AC1997.10.1_%281_of_2%29.jpg/800px-Plague_in_an_Ancient_City_LACMA_AC1997.10.1_%281_of_2%29.jpg"

# 31. fall-of-aztec-empire
download "fall-of-aztec-empire.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/The_Conquest_of_Tenochtitlan.jpg/800px-The_Conquest_of_Tenochtitlan.jpg"

# 32. fall-of-inca-empire
download "fall-of-inca-empire.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Inca-Spanish_confrontation.jpg/800px-Inca-Spanish_confrontation.jpg"

# 33. magellan-circumnavigation
download "magellan-circumnavigation.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Portrait_of_Ferdinand_Magellan.jpg/800px-Portrait_of_Ferdinand_Magellan.jpg"

# 34. salem-witch-trials
download "salem-witch-trials.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/SalemWitchcraftTrial.jpg/800px-SalemWitchcraftTrial.jpg"

# 35. treaty-of-westphalia
download "treaty-of-westphalia.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Westfaelischer_Friede_in_Muenster_%28Gerard_Terborch_1648%29.jpg/800px-Westfaelischer_Friede_in_Muenster_%28Gerard_Terborch_1648%29.jpg"

# 36. discovery-of-neptune
download "discovery-of-neptune.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/800px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"

# 37. discovery-of-pluto
download "discovery-of-pluto.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/800px-Pluto_in_True_Color_-_High-Res.jpg"

# 38. irish-great-famine
download "irish-great-famine.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Bridget_O%27Donnel.jpg/800px-Bridget_O%27Donnel.jpg"

# 39. meiji-restoration
download "meiji-restoration.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Meiji_emperor_ukiyoe.jpg/800px-Meiji_emperor_ukiyoe.jpg"

# 40. neptune-pluto-conjunction
download "neptune-pluto-conjunction.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/800px-N.Tesla.JPG"

# 41. armenian-genocide
download "armenian-genocide.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Morgenthau336.jpg/800px-Morgenthau336.jpg"

# 42. gandhis-salt-march
download "gandhis-salt-march.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Salt_March.jpg/800px-Salt_March.jpg"

# 43. gandhi-assassination
download "gandhi-assassination.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/800px-Mahatma-Gandhi%2C_studio%2C_1931.jpg"

# 44. korean-war
download "korean-war.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Korean_War_Montage_2.png/800px-Korean_War_Montage_2.png"

# 45. cuban-revolution
download "cuban-revolution.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/FidelCastro1950s.jpg/800px-FidelCastro1950s.jpg"

# 46. civil-rights-act
download "civil-rights-act.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Lyndon_Johnson_signing_Civil_Rights_Act%2C_July_2%2C_1964.jpg/800px-Lyndon_Johnson_signing_Civil_Rights_Act%2C_July_2%2C_1964.jpg"

# 47. mlk-assassination
download "mlk-assassination.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/800px-Martin_Luther_King%2C_Jr..jpg"

# 48. nixon-ends-gold-standard
download "nixon-ends-gold-standard.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Richard_M._Nixon%2C_ca._1935_-_1982_-_NARA_-_530679.jpg/800px-Richard_M._Nixon%2C_ca._1935_-_1982_-_NARA_-_530679.jpg"

# 49. iranian-revolution
download "iranian-revolution.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mass_demonstration_in_Iran%2C_date_unknown.jpg/800px-Mass_demonstration_in_Iran%2C_date_unknown.jpg"

# 50. tiananmen-square
download "tiananmen-square.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tianasquare.jpg/800px-Tianasquare.jpg"

# 51. fall-of-soviet-union
download "fall-of-soviet-union.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/RIAN_archive_848095_Signing_the_Agreement_to_eliminate_the_USSR_and_establish_the_Commonwealth_of_Independent_States.jpg/800px-RIAN_archive_848095_Signing_the_Agreement_to_eliminate_the_USSR_and_establish_the_Commonwealth_of_Independent_States.jpg"

# 52. dot-com-crash
download "dot-com-crash.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Nasdaq_IXIC_-_dot-com_bubble.png/800px-Nasdaq_IXIC_-_dot-com_bubble.png"

# 53. hurricane-katrina
download "hurricane-katrina.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hurricane_Katrina_August_28_2005_NASA.jpg/800px-Hurricane_Katrina_August_28_2005_NASA.jpg"

# 54. hong-kong-protests
download "hong-kong-protests.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Hong_Kong_protests_-_IMG_20190818_170929.jpg/800px-Hong_Kong_protests_-_IMG_20190818_170929.jpg"

# 55. chatgpt-ai-revolution
download "chatgpt-ai-revolution.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/800px-ChatGPT_logo.svg.png"

# 56. chinese-cultural-revolution
download "chinese-cultural-revolution.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Cultural_Revolution_poster.jpg/800px-Cultural_Revolution_poster.jpg"

# 57. iphone-social-media
download "iphone-social-media.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/800px-IPhone_1st_Gen.svg.png"

# 58. penicillin-mass-use
download "penicillin-mass-use.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Penicillin-G_3D.png/800px-Penicillin-G_3D.png"

# 59. cern-lhc
download "cern-lhc.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/CERN-20060225-_09.jpg/800px-CERN-20060225-_09.jpg"

# 60. trinity-nuclear-test
download "trinity-nuclear-test.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trinity_Detonation_T%26B.jpg/800px-Trinity_Detonation_T%26B.jpg"

# 61. sputnik
download "sputnik.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/800px-Sputnik_asm.jpg"

echo ""
echo "=== Done ==="
echo "OK: $OK | SKIP: $SKIP | FAIL: $FAIL"
echo "Total images: $(ls -1 "$IMG_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')"
