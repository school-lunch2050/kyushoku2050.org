const { createHash } = require('crypto')
const { createWriteStream, promises: { readFile, writeFile, mkdir, stat, unlink }, createReadStream } = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const path = require('path')
const { request } = require('undici')
const extract = require('@leichtgewicht/extract-zip')
const yaml = require('js-yaml')
const subFont = require('subset-font')
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
      'lang/messages.ja.yaml',
      'lang/messages.ja-simple.yaml'
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
      'lang/messages.en.yaml'
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
    return path.join('.font', font.name, name)
  }
  return path.join('.font', font.name)
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
  for (const charFile of font.chars) {
    addToDict(allChars, yaml.load(await readFile(charFile, 'utf-8')))
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
    if (!charsChanged && !fontChanged) {
      console.log(`Neither Font nor charset for "${font.name}" has changed.`)
      continue
    }
    console.log(`Updating "${font.name}.`)
    const chars = await readFile(getCharsFile(font), 'utf-8')
    await Promise.all(Object.values(font.source.files).map(async (file) => {
      const fileNoEnding = file.replace(/\.(ttf|woff|woff2|otf)$/, '')
      const inFont = await readFile(cacheFile(font, file))
      const outFile = `static/font/${font.name}/${fileNoEnding}`
      await mkdir(path.dirname(outFile), { recursive: true })
      await writeFile(`${outFile}.ttf`, await subFont(inFont, chars, { targetFormat: 'truetype' }))
      await writeFile(`${outFile}.woff`, await subFont(inFont, chars, { targetFormat: 'woff' }))
      await writeFile(`${outFile}.woff2`, await subFont(inFont, chars, { targetFormat: 'woff2' }))
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
