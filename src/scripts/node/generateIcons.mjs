import fs from 'node:fs'

/**
 * Generates the icon and illustration types.
 * @param {fs.PathLike} rootPath
 * @param {string} typeName
 */
function generateType(rootPath, typeName) {
  const entries = fs.readdirSync(rootPath)
  let type = `export type ${typeName} = \n`
  for (const entry of entries) {
    const [iconName] = entry.split('.')
    type += `| '${iconName}'\n`
  }
  type += ';\n\n'
  fs.appendFileSync('./src/types/generated.ts', type)
}

fs.unlinkSync('./src/types/generated.ts')
fs.appendFileSync(
  './src/types/generated.ts',
  `
// This file is generated automatically by the generateIcons.mjs script. Any changes will be overwritten.
\n`,
)
generateType('./src/components/icons', 'IconName')

console.log('Icons generated.\n')
