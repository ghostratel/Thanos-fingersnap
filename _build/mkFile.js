const fs = require('fs')

const mkFile = (path) => {
  return fs.closeSync(fs.openSync(path, 'w'))
}

module.exports = mkFile
