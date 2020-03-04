const defaultTemp = 'v1'

module.exports = (api, options) => {
  api.extendPackage({
    scripts: {
      serve: "vue-cli-service serve",
      build: "vue-cli-service build",
      lint: "vue-cli-service lint"
    },
    dependencies: {
      "core-js": "^3.3.2",
      vue: "^2.6.10",
      "vue-router": "^3.0.3"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "^4.0.0",
      "@vue/cli-plugin-eslint": "^4.0.0",
      "@vue/cli-service": "^4.0.0",
      "@vue/eslint-config-standard": "^4.0.0",
      "babel-eslint": "^10.0.3",
      eslint: "^5.16.0",
      "eslint-plugin-vue": "^5.0.0",
      "lint-staged": "^9.4.2",
      "prerender-spa-plugin": "^3.4.0",
      "vue-template-compiler": "^2.6.10",
      "node-sass": "^4.13.1",
      "sass-loader": "^8.0.2"
    },
    gitHooks: {
      "pre-commit": "lint-staged"
    },
    "lint-staged": {
      "*.{js,vue}": ["vue-cli-service lint", "git add"]
    }
  });

  if (options.lodash) {
    api.extendPackage({
      'dependencies': {
        'lodash': '^4.17.11',
      }
    })
  }

  if (options['vue-echarts']) {
    api.extendPackage({
      'dependencies': {
        'vue-echarts': '^4.0.1',
      }
    })
  }

  api.render(`./template/${defaultTemp}`);
};
