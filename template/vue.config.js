const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const BASE_URL = '/202002_toeicTalent'


module.exports = {
  publicPath: BASE_URL,
  outputDir: `dist${BASE_URL}`,
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    disableHostCheck: true
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, `dist${BASE_URL}`),
          outputDir: path.join(__dirname, `dist${BASE_URL}`),
          indexPath: path.join(__dirname, 'dist', `${BASE_URL}/index.html`),
          routes: ['/index.html'],
          postProcess(renderedRoute) {
            if (renderedRoute.route.endsWith('.html')) {
              renderedRoute.outputPath = path.join(__dirname, `dist${BASE_URL}`, renderedRoute.route)
            }
            return renderedRoute
          }
        })
      ]
    }
  }
}
