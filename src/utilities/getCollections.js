import fs from 'fs'
import path from 'path'

function readCollection(collectionPath = '../collections') {
  const filesAndFolders = []
  const items = fs.readdirSync(collectionPath)

  for (const item of items) {
    const itemPath = path.join(collectionPath, item)
    const stat = fs.statSync(itemPath)

    if (stat.isDirectory()) {
      const indexContent = fs.readFileSync(itemPath + '\\index.ts', 'utf-8')
      const slug = extractSlug(indexContent)
      filesAndFolders.push({ label: item, value: slug })
    } else {
      const fileContent = fs.readFileSync(itemPath, 'utf-8')
      const slug = extractSlug(fileContent)
      const label = item.replace('.ts', '')
      filesAndFolders.push({ label: label, value: slug })
    }
  }

  return filesAndFolders
}

function extractSlug(fileContent) {
  const slugPattern = new RegExp(`slug\s*:.*`)
  const slugMatch = fileContent.match(slugPattern) || ''
  const slug = slugMatch[0]
    .replace('slug', '')
    .replace(':', '')
    .replaceAll("'", '')
    .replaceAll('\"', '')
    .replace(',', '')
    .trim()
  return slug
}

console.log(readCollection())
