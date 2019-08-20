const fs = require('fs')
const path = require('path')
const yarn = require('@yarnpkg/lockfile')
const files = ['package-lock.json', 'npm-shrinkwrap.json', 'yarn.lock'].map(f => path.resolve(__dirname, f))
module.exports = function() {
  files.map((file) => {
    if (file.includes('yarn') && fs.existsSync(file)) {
      return yarn.parse(fs.readFileSync(file, 'utf8'))
    }
    if (fs.existsSync(file)) {
      return require(file)
    }
    return {}
  }).map((pkg) => {
    if(pkg.dependencies) {
      let deps = pkg.dependencies
      let keys = Object.keys(deps)
      let notResolved = keys.filter(k => !deps[k].resolved)
      console.log(notResolved)
    }
  })
}