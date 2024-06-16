import { readdirSync, readFileSync, statSync } from 'fs'

import { isJson } from 'my-gadgetry/type-check'

export const readJsonFileSync = (path: string, encode: BufferEncoding = 'utf-8') => {
  const json = isJson(readFileSync(path, encode))
  if (!json) {
    return {}
  }
  return json
}

export const getFiles = (dir: string, _files: string[] = []) => {
  const files = readdirSync(dir)
  for (const file of files) {
    const name = dir + '/' + file
    if (statSync(name).isDirectory()) {
      getFiles(name, _files)
    } else {
      _files.push(name)
    }
  }
  return _files
}
