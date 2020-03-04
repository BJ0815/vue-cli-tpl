import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index.html',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about.html',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

let base = '/'
try {
  base = location.pathname.substr(0, location.pathname.lastIndexOf('/'))
} catch (err) {
  console.log(err)
}

export default new VueRouter({
  mode: 'history',
  base,
  pathToRegexpOptions: {
    strict: true
  },
  routes
})
