#!/bin/bash
# Run this from your terminal: cd "/Users/william/Cosmos Daily" && bash download-images.sh
# Downloads public domain images from Wikimedia Commons for Cosmos Daily events

DIR="./images"
mkdir -p "$DIR"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

download() {
  local file="$1" url="$2"
  if [ -f "$DIR/$file" ]; then
    echo "SKIP: $file (exists)"
    return
  fi
  curl -sS -o "$DIR/$file" -H "User-Agent: $UA" -H "Referer: https://en.wikipedia.org/" "$url"
  if [ $? -eq 0 ] && [ -s "$DIR/$file" ]; then
    echo "OK: $file ($(wc -c < "$DIR/$file") bytes)"
  else
    echo "FAIL: $file"
    rm -f "$DIR/$file"
  fi
  sleep 1.5
}

echo "=== Downloading images for Cosmos Daily ==="
echo ""

# Significance 5 events
download "great-pyramid.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/800px-Kheops-Pyramid.jpg"
download "star-bethlehem.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Giotto_-_Scrovegni_-_-18-_-_Adoration_of_the_Magi.jpg/800px-Giotto_-_Scrovegni_-_-18-_-_Adoration_of_the_Magi.jpg"
download "exodus.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Crossing_the_Red_Sea.jpg/800px-Crossing_the_Red_Sea.jpg"
download "muhammad-death.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Kaaba_at_night.jpg/800px-Kaaba_at_night.jpg"
download "genghis-khan.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/800px-YuanEmperorAlbumGenghisPortrait.jpg"
download "gutenberg.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/800px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg"
download "reformation.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg/800px-Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg"
download "american-independence.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg/800px-Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg"
download "darwin.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Charles_Darwin_seated_crop.jpg/800px-Charles_Darwin_seated_crop.jpg"
download "civil-war-us.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Battle_of_Gettysburg%2C_by_Currier_and_Ives.png/800px-Battle_of_Gettysburg%2C_by_Currier_and_Ives.png"
download "einstein.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg"
download "wwi.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Cheshire_Regiment_trench_Somme_1916.jpg/800px-Cheshire_Regiment_trench_Somme_1916.jpg"
download "spanish-flu.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Spanish_flu_hospital.png/800px-Spanish_flu_hospital.png"
download "wall-street-crash.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Crowd_outside_nyse.jpg/800px-Crowd_outside_nyse.jpg"
download "pearl-harbor.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/The_USS_Arizona_%28BB-39%29_burning_after_the_Japanese_attack_on_Pearl_Harbor_-_NARA_195617_-_Edit.jpg/800px-The_USS_Arizona_%28BB-39%29_burning_after_the_Japanese_attack_on_Pearl_Harbor_-_NARA_195617_-_Edit.jpg"
download "china-revolution.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Mao_Zedong_in_1959_%28cropped%29.jpg/800px-Mao_Zedong_in_1959_%28cropped%29.jpg"
download "world-wide-web.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/First_Web_Server.jpg/800px-First_Web_Server.jpg"

# Significance 4 events
download "vesuvius.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg/800px-Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg"
download "cleopatra.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/The_Death_of_Cleopatra_arthur.jpg/800px-The_Death_of_Cleopatra_arthur.jpg"
download "galileo.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Justus_Sustermans_-_Portrait_of_Galileo_Galilei%2C_1636.jpg/800px-Justus_Sustermans_-_Portrait_of_Galileo_Galilei%2C_1636.jpg"
download "napoleon-rise.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg/800px-David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg"
download "napoleon-waterloo.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Andrieux_-_La_bataille_de_Waterloo.jpg/800px-Andrieux_-_La_bataille_de_Waterloo.jpg"
download "chernobyl.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Chernobyl_NPP_Site_Panorama_with_NSC_Construction_-_June_2013.jpg/800px-Chernobyl_NPP_Site_Panorama_with_NSC_Construction_-_June_2013.jpg"
download "indian-partition.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Mountbatten_with_Gandhi_%28IND_4953%29.jpg/800px-Mountbatten_with_Gandhi_%28IND_4953%29.jpg"
download "haitian-revolution.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Haitian_Revolution.jpg/800px-Haitian_Revolution.jpg"
download "rome.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Thomas_Cole_-_The_Course_of_Empire_Destruction_-_WGA05143.jpg/800px-Thomas_Cole_-_The_Course_of_Empire_Destruction_-_WGA05143.jpg"

echo ""
echo "=== Done! ==="
echo "Total images: $(ls -1 $DIR/*.jpg 2>/dev/null | wc -l)"
