const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mkFile = require('./mkFile.js')
const pagesPath = path.resolve(__dirname, '../src/pages')
const entryPath = path.resolve(__dirname, '../src/js')
const pagesFiles = fs.readdirSync(pagesPath, 'utf-8')
const matchNameReg = /\w+(?=\.)/

const genHtmlWebpackPlugin = (files) => {
  return files.map(fileName => {
    const chunkName = fileName.match(matchNameReg)[0]
    const entryFilePath = path.join(entryPath, chunkName + '.js')
    if (!fs.existsSync(entryFilePath)) {
      mkFile(path.join(entryFilePath))
    }
    return new HtmlWebpackPlugin({
      template: path.join(pagesPath, fileName),
      filename: fileName,
      chunks: ['commons', chunkName]
    })
  })
}

const genEntry = (entries) => {
  let entry = {}
  entries.forEach(entryName => {
    let _name = entryName.match(matchNameReg)[0]
    entry[_name] = path.join(entryPath, _name + '.js')
  })
  return entry
}

module.exports.HTMLWebpackPlugins = genHtmlWebpackPlugin(pagesFiles)
module.exports.entry = genEntry(pagesFiles)
