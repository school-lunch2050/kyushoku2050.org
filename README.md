# kyushoku2050.org website

This repository holds the source code for the [kyushoku2050.org](https://kyushoku2050.org) website.

Changes to the `main` [branch][git-branch] will automatically be built and published using the [netlify][netlify] github integration.

This repository contains the text files and instructions to create the html, css files served to a visitor of the page. To turn this into a website it uses the [Nuxt][] framework (v2) which is based on [node.js][].

If you have node.js installed _(version 12 is recommended as its the one used by netlify)_ you can [clone][git-clone] the data in this respository to your computer and start a build process on your computer. This allows you to preview any changes you make on the source material. For more see ["build setup"](#build-setup).

There is thorough documentation on how Nuxt works on [their website](http://nuxtjs.org/docs/2.x/). _Briefly summarized:_ Nuxt assumes that different files for the website are in different folders depending on their use. _Simplified example:_ every file in the `./pages` folder results in a url of the same name. `./pages/introduction.vue` results in the page shown on `https://kyushoku2050.org/ja/introduction`. Since every subfolder is supposed to contain different parts of the website, you will find further information in the `README.md` file of each folder.

## Contributions

We are open to contributions through the github interface. If you find something broken or odd, please open a [new issue][]. We are also open to code contributions using [Pull Requests][git-pr]. When you submit a Pull Requests, please make sure that `npm run ci` runs.

## Build Setup

After having installed Node version 12 and cloned this repository you will need to install software dependencies that we use to build the system in a terminal. → `$ npm install`.

With all dependencies installed the command `$ npm run generate` to build the website from the material. The files to be published will be in the `./dist` folder which is not part of the repository data (see [.gitignore][git-ignore])

However, since this is pretty tedious for continuous, there is the much more convenient `$ npm run dev` command which will start a local webserver and will show all the changes immediately a local webbrowser.

_Note:_ The build system has not been tested for Windows. It may be a good idea to use the "[linux subsystem][]" of windows or a vm ([docker][docker-windows], etc.) to run the build process.

## Starting point

While reading the documentation for each subsystem may be helpful. In the end all the pieces come together in the `./nuxt.config.js`. It may be good to start with this to get an overview.

## Images

Adding new images can be as simply as adding it to the `./static/img` folder. You may find the `/scripts/asset_compress.sh` handy to compress raw files into files usable on the website.

However: it may be wise to add the images to the `assets/assets.sketch` file, which is made with [Sketch App][] for Mac _([Lunacy][] for Windows **should** be able to edit these files as well.)_. as it contains presets for the resolution.

_Note:_ `.webp` files are much smaller than `.jpg` or `.png` files which is why we prefer these, however in on older iOS devices this image format is not supported so you will need to have a fallback for these.

## Fonts

The Japanese Font "honya" that we use has the license restriction that the font may not be offert for download which is why it the fonts used are not included in this repository. During `npm install`, however, we execute the `./scripts/font.js` script that downloads the fonts we use from the respective provider and puts them to the `./static/font` folder removing the unused characters (which is particularly important for javascript). The characters are decided based on the `./lang/*.yaml`  and `./content/*.md` folder. For details on how this work look in the source code of `./scripts/font.js`.

## License

The website's code is provided under the [MIT][mit-license], but the assets used have been licensed under various, different licenses. Have a look in the [LICENSE](./LICENSE.md) file for detailed information.

[git-branch]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-branches
[netlify]: https://www.netlify.com/
[Nuxt]: https://nuxtjs.org/
[node.js]: https://nodejs.org
[git-clone]: https://github.com/git-guides/git-clone
[git-ignore]: https://git-scm.com/docs/gitignore
[mit-license]: https://mit-license.org/
[git-pr]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[new issue]: https://github.com/school-lunch2050/kyushoku2050.org/issues/new
[Sketch App]: https://www.sketch.com/
[Lunacy]: https://icons8.com/lunacy
[linux subsystem]: https://ubuntu.com/tutorials/ubuntu-on-windows#1-overview
[docker-windows]: https://docs.docker.com/docker-for-windows/install/
