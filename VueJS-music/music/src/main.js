import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import weui from 'weui.js'
import 'weui'



Axios.defaults.withCredentials = true;
Vue.prototype.$weui = weui;
Vue.prototype.$axios  = Axios;
Vue.prototype.HOST = "/baiduapi"
Vue.prototype.HOST2 = "/wangyiyunapi"
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
