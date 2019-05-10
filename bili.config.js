module.exports = {
    banner: true,
    input: 'src/index.js',
    output: {
        format: ['umd', 'umd-min'],
        extractCSS: false,
        moduleName: 'Thanos',
        sourceMap: false
    }
}