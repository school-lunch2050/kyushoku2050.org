# ASSETS

This directory contains your un-compiled assets.

## Styles

We use the `./css/site.scss` as the source for the css styles used in the site. It uses the scss variant of [sass][].
It will be transformed by Nuxt automatically.

## Data

In particular for this project we store the visual data for the lunches as [typescript](https://www.typescriptlang.org/) files.

`./ingredients.ts` contains the ingredient positions on the lunch with
pre-computed properties for the display of the icons.

`./bubbles.ts` contains the place and size information necessary to focus
on each part of the illustration, including linking to urls and connections
to ingredients.

`./lunches.ts` contains visual information for the lunch illustration, such
as the placements of the header text and what bubbles relate to it.

## Helpers

`./helpers.ts` contains typescript helper functions used in various places of the website.

[sass]: https://sass-lang.com/guide

---

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/assets#webpacked).
