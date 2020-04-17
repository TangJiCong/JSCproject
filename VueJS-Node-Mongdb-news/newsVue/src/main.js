import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './until/http'
//import http from 'axios'

Vue.use(ElementUI)
Vue.prototype.$axios = http
//Vue.prototype.baseUrl = "http://192.168.1.6:2021"
Vue.prototype.baseUrl = "http://49.235.78.245:2021"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
