## CONTENT

For this folder to work, the `@nuxt/content` module was added in the `nuxt.config.js` (and `package.json`).

This folder contains [markdown][] formatted text files that can be used in the pages, defined in the `../pages`
folder.

The `../assets/helper.ts` function `i18nContent` is a helper that will choose the file matching to the locale
used for the page. For example, the `../pages/about.vue` loads the `./about_en.md` in the english locale 
with the `asyncData: i18nContent.bind(null, 'about')` statement.

---

More information about the usage of this directory in [the documentation](https://content.nuxtjs.org/).

[markdown]: https://guides.github.com/features/mastering-markdown/
