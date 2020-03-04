const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const routes = ['/index.html', '/about.html']

module.exports = {
  publicPath: './',
  outputDir: path.join(__dirname, `dist`),
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
          staticDir: path.join(__dirname, `dist`),
          outputDir: path.join(__dirname, `dist`),
          indexPath: path.join(__dirname, 'dist', `/index.html`),
          routes,
          postProcess(renderedRoute) {
            if (renderedRoute.route.endsWith('.html')) {
              renderedRoute.outputPath = path.join(__dirname, `dist`, renderedRoute.route)
            }
            return renderedRoute
          }
        })
      ]
    }
  }
}
