#!/bin/bash

#
#  Compresses and optimizes files generated with the assets/assets.sketch file
#
#  For this script to work you need the "cwebp" programm which converts pngs to webp files (much smaller!)
#  https://developers.google.com/speed/webp/docs/cwebp
#


# Making sure to execute in parent directory
cd "`dirname "$0"`/.."

for file in chalkboard logo place_global place_local weather_15 weather_2p header_bg logo_feast_en logo_feast_ja logo_rihn_en logo_rihn_ja; do
  # We use the large png file because the resulting webp file will be about the same size as the small png
  cwebp static/img/${file}_3x.png -o static/img/${file}.webp
done

for file in icon_menu icon_close icon_info icon_close_dark; do
  # Optimizing the svg files without removing the viewbox. This allows for proper scaling.
  npx svgo static/img/${file}.svg --disable removeViewBox
done

# We generate a detailed set of favicons (more than the nuxt built-in amount)
mkdir -p static/img/favicon
npx icofy static/img/favicon_3x.png static/img/favicon --which favicons,android,appleIcon
