/**
 * One-shot optimiser for the raster assets exported from Figma.
 *
 * Figma exports at 2x-4x the size anything is actually displayed at, which
 * put ~43 MB of PNGs in src/assets. This resizes each file to roughly twice
 * its largest on-screen box and re-encodes to WebP (alpha preserved), then
 * removes the original. Re-run after a fresh export from Figma.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const DIR = new URL('../src/assets/', import.meta.url).pathname.replace(/^\//, '')

/** file stem -> max width in px (2x the largest rendered width). */
const TARGET_WIDTH = {
  'hero-backdrop': 1920,
  rectangle5: 1800,
  background: 1800,
  background1: 1600,
  rectangle9986: 1800,
  rectangle9995: 1800,
  rectangle10006: 1800,
  rectangle23: 1100,
  rectangle10002: 1100,
  rectangle8: 620,
  rectangle12: 620,
  rectangle13: 620,
  rectangle14: 620,
  rectangle9996: 400,
  rectangle9997: 400,
  rectangle9998: 400,
  rectangle9999: 400,
  rectangle27: 400,
  rectangle28: 400,
  image32: 480,
  image33: 480,
  image34: 260,
  image35: 260,
  image36: 260,
  lombardini1: 640,
  'generac-power-systems-logo1': 320,
  'greaves-cotton287098336212081': 200,
  'chat-gpt-image-aug62026084046-pm1': 96,
  'chat-gpt-image-aug62026084425-pm1': 96,
  'chat-gpt-image-aug62026084659-pm1': 96,
  'chat-gpt-image-aug62026085012-pm1': 96,
  'chat-gpt-image-aug62026085929-pm1': 96,
  'chat-gpt-image-aug62026104324-pm1': 128,
  'chat-gpt-image-aug62026104328-pm1': 128,
  'chat-gpt-image-aug62026104333-pm1': 128,
  'chat-gpt-image-aug62026104336-pm1': 128,
}

let before = 0
let after = 0

for (const file of fs.readdirSync(DIR)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue

  const stem = path.basename(file, path.extname(file))
  const target = TARGET_WIDTH[stem]
  if (!target) {
    console.warn(`no target width for ${file} — left as-is`)
    continue
  }

  const src = path.join(DIR, file)
  const dest = path.join(DIR, `${stem}.webp`)
  before += fs.statSync(src).size

  const image = sharp(src)
  const { width = 0 } = await image.metadata()

  await image
    .resize({ width: Math.min(width, target), withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(dest)

  after += fs.statSync(dest).size
  fs.unlinkSync(src)
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`
console.log(`raster assets: ${mb(before)} -> ${mb(after)}`)
