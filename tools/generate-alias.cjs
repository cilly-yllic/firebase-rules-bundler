const fsEx = require('fs-extra')
const fs = require('fs')
const path = require('path')

const getFiles = (dir, files_) => {
  files_ = files_ || []
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const name = dir + '/' + file
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      files_.push(name)
    }
  }
  return files_
}

const srcPath = path.join(__dirname, '..', 'src')
const regExp = new RegExp(`^${srcPath}/`)

const aliasRoot = getFiles(srcPath)
  .map(path => path.replace(regExp, '').replace(/\.ts$/, ''))
  .filter(path => !/^internal|^cli|^templates|\.json$/.test(path))
aliasRoot
  .map(alias => path.resolve(__dirname, `../${alias}`))
  .forEach(alias => {
    if (fsEx.pathExistsSync(alias)) {
      fsEx.removeSync(alias)
    }
    fsEx.ensureDirSync(alias)
  })

const PREFIX = 'lib/src'

aliasRoot.forEach(alias => {
  const relative = alias
    .split(/\//g)
    .map(() => '..')
    .join('/')
  const pkgManifest = {
    name: `alter-firestore-${alias.split(/\//g).join('-')}`,
    types: `${relative}/${PREFIX}/${alias}.d.ts`,
    main: `${relative}/${PREFIX}/${alias}.js`,
    sideEffects: false,
  }

  fsEx.writeJson(path.resolve(__dirname, `../${alias}/package.json`), pkgManifest, { spaces: 2 })
})
