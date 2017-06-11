import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import 'spectre.css/dist/spectre.css'
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
const portscanner = require('portscanner')

Vue.use(VueLodash, lodash)
Vue.prototype.$portscanner = portscanner

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
