#
#  Resizes, compresses and optimizes the original illustrations as received by Sustena
#
#  For this script to work you need the "cwebp" programm which converts pngs to webp files (much smaller!)
#  https://developers.google.com/speed/webp/docs/cwebp
#
#  You will also need the `exiftool` which allows to write exif and xmp metadata for the licenses
#


# Making sure to execute in parent directory
cd "`dirname "$0"`/.."

set_license () {
  exiftool \
    "$1" \
    -overwrite_original \
    -copyright="$2 ($3), see: $4 $5" \
    -XMP-xmpRights:Owner="$2" \
    -XMP-plus:licensorURL="$3" \
    -XMP-xmpRights:WebStatement="$4"
}

if [ ! -d ../Original ]; then
  echo "The original folder doesn't exist. You need to get the original illustrations from the FEAST team or Sustena"
  exit 1
fi

set_sustena () {
  set_license "$1" \
    "Sustena Inc." \
    "http://www.sustena.org/" \
    "https://github.com/school-lunch2050/kyushoku2050.org/tree/main/static/img/illustration" \
    ", please contact info@sustena.org if you are interested in licensing the material."
}


process_illustration () {
  input="../Original/$1"
  output="static/img/illustration/$2"
  # Specifying the licenses that are missing in the original data
  set_sustena "$input"
  cwebp -q 75 -resize 2288 0 -hint picture -print_psnr -print_ssim -print_lsim -mt -metadata xmp,exif "$input" -o "$output.webp"
  npx sharp-cli -i "$input" -o "$output.jpg" -q 90 -- resize 2525
  set_sustena "$output.jpg"
}

process_illustration "国内だけで何とか生きていく.jpg" "desperate"
process_illustration "地球をかけていちかばちか.jpg" "gamble"
process_illustration "環境にやさしい世界のまぼろし.jpg" "cosmopolitan"
process_illustration "食べ物でいっぱいの庭.jpg" "garden"
