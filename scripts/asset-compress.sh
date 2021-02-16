#!/bin/bash

# Make sure to execute in parent directory
cd "`dirname "$0"`/.."

for file in chalkboard logo place_global place_local weather_15 weather_2p header_bg; do
  cwebp static/img/${file}_3x.png -o static/img/${file}.webp
done

mkdir -p static/img/favicon

npx icofy static/img/logo_3x.png static/img/favicon --which favicons,android,appleIcon
