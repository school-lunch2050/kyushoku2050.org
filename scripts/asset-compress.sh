#!/bin/bash

# Make sure to execute in parent directory
cd "`dirname "$0"`/.."

for file in chalkboard logo place_global place_local weather_15 weather_2p header_bg logo_feast_en logo_feast_ja logo_rihn_en logo_rihn_ja; do
  cwebp static/img/${file}_3x.png -o static/img/${file}.webp
done

for file in icon_menu icon_close; do
  npx svgo static/img/${file}.svg --disable removeViewBox
done

mkdir -p static/img/favicon

npx icofy static/img/favicon_3x.png static/img/favicon --which favicons,android,appleIcon
