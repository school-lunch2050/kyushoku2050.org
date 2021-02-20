const { createHash } = require('crypto')
const { createWriteStream, promises: { readFile, writeFile, mkdir, stat, unlink, access }, createReadStream } = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const path = require('path')
const { request } = require('undici')
const extract = require('@leichtgewicht/extract-zip')
const yaml = require('js-yaml')
const subFont = require('subset-font')
const globby = require('globby')

// Using node_modules, this way its cached by the CI system
const cacheHome = path.join('node_modules', '.font')
const fonts = [
  {
    name: 'honya',
    source: {
      type: 'zip',
      file: 'honya.zip',
      files: {
        'font_honyajire/HonyaJi-Re.ttf': 'HonyaJi-Re.ttf'
      },
      url: 'http://honya.nyanta.jp/1504/font_honyajire.zip'
    },
    chars: [
      'lang/messages.ja*.yaml'
    ]
  },
  {
    name: 'caveat',
    source: {
      type: 'zip',
      file: 'caveat.zip',
      files: {
        'CaveatBrush-Regular.ttf': 'CaveatBrush-Regular.ttf'
      },
      url: 'https://fonts.google.com/download?family=Caveat+Brush'
    },
    chars: [
      'lang/messages.*.yaml',
      '!lang/messages.ja*.yaml'
    ]
  }
]

async function exists (path) {
  try {
    return (await stat(path)).isFile
  } catch (_) {
    return false
  }
}

function cacheFile (font, name) {
  if (name) {
    return path.join(cacheHome, font.name, name)
  }
  return path.join(cacheHome, font.name)
}

async function compileSha (font) {
  const hash = createHash('sha256')
  for (const file of Object.values(font.source.files)) {
    for await (const data of createReadStream(cacheFile(font, file))) {
      hash.update(data)
    }
  }
  return hash.digest('hex')
}

async function downloadFont (font) {
  const zipFile = path.resolve(cacheFile(font, font.source.file))
  const etagFile = cacheFile(font, 'etag.txt')
  const shaFile = cacheFile(font, 'sha.txt')
  if (await exists(etagFile)) {
    const [prevEtag, currentEtag] = await Promise.all([
      readFile(etagFile, 'utf-8'),
      request(font.source.url, { method: 'HEAD' }).then(({ headers }) => headers.etag)
    ])
    if (prevEtag === currentEtag) {
      return false
    }
  }
  const { body, headers } = await request(font.source.url)
  await pipeline(
    body,
    createWriteStream(zipFile)
  )
  await extract(zipFile, {
    dir: path.resolve(cacheFile(font)),
    encoding: 'shift-jis',
    filter: (entry) => {
      for (const from in font.source.files) {
        if (entry.fileName === from) {
          entry.fileName = font.source.files[from]
          entry.fileNameLength = entry.fileName.length
          return true
        }
      }
      return false
    }
  })
  await unlink(zipFile)
  if (headers.etag) {
    await writeFile(etagFile, headers.etag)
  }
  const currentSha = await compileSha(font)
  if (await exists(shaFile)) {
    const prevSha = await readFile(shaFile, 'utf-8')
    if (prevSha === currentSha) {
      return false
    }
  }
  await writeFile(shaFile, currentSha)
  return true
}

function addToDict (allChars, obj) {
  if (typeof obj === 'string') {
    for (const char of obj.replace(/<\/?\s*(ruby|rt|rp|rtc|br)\s*\/?>/ig, '')) {
      allChars[char] = 1
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const val of Object.values(obj)) {
      addToDict(allChars, val)
    }
  }
}

async function compileCharacters (font) {
  const allChars = {}
  const patterns = font.chars.filter(rule => !rule.startsWith('!'))
  const ignore = font.chars.filter(rule => rule.startsWith('!'))
  for (const charFile of await globby(patterns, { ignore })) {
    if (/\.ya?ml$/i.test(charFile)) {
      addToDict(allChars, yaml.load(await readFile(charFile, 'utf-8')))
    }
  }
  delete allChars['\n']
  return Object.keys(allChars).sort().join('')
}

function getCharsFile (font) {
  return cacheFile(font, 'chars.txt')
}

async function checkCharacters (font) {
  const charsFile = getCharsFile(font)
  const [oldChars, newChars] = await Promise.all([
    readFile(charsFile, 'utf-8').catch(() => ''),
    compileCharacters(font)
  ])
  if (oldChars === newChars) {
    return false
  }
  await writeFile(charsFile, newChars)
  return true
}

;(async () => {
  for (const font of fonts) {
    await mkdir(cacheFile(font), { recursive: true })
    const fontChanged = await downloadFont(font)
    const charsChanged = await checkCharacters(font)
    const force = charsChanged || fontChanged
    const openEntries = (await Promise.all(
      Object
        .values(font.source.files)
        .map((file) => {
          const fileNoEnding = file.replace(/\.(ttf|woff|woff2|otf)$/, '')
          const outfile = `static/font/${font.name}/${fileNoEnding}`
          return {
            file,
            outFiles: [
              { file: `${outfile}.truetype`, opts: { targetFormat: 'truetype' } },
              { file: `${outfile}.woff`, opts: { targetFormat: 'woff' } },
              { file: `${outfile}.woff2`, opts: { targetFormat: 'woff2' } }
            ]
          }
        })
        .map(async (entry) => {
          if (force) {
            return entry
          }
          let outFiles = []
          for (const outFile of entry.outFiles) {
            try {
              await access(outFile.file)
            } catch (err) {
              outFiles = [...outFiles, outFile]
            }
          }
          entry.outFiles = outFiles
          return entry
        })
    )).filter(entry => entry.outFiles.length > 0)
    if (openEntries.length === 0) {
      console.log(`Nothing to do for "${font.name}".`)
      continue
    }
    console.log(`Processing "${font.name}". (reason: ${fontChanged ? 'fonts changed. ' : ''}${charsChanged ? 'chars changed.' : ''}${!force ? 'fonts missing' : ''})`)
    const chars = await readFile(getCharsFile(font), 'utf-8')
    await Promise.all(openEntries.map(async ({ file, outFiles }) => {
      const inFont = await readFile(cacheFile(font, file))
      for (const { file, opts } of outFiles) {
        console.log(`Writing ${file}`)
        await mkdir(path.dirname(file), { recursive: true })
        await writeFile(file, await subFont(inFont, chars, opts))
      }
    }))
  }
})()
  .then(
    () => process.exit(),
    (err) => {
      console.error(err.stack)
      process.exit(1)
    }
  )
