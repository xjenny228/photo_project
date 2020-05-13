import Vue from 'vue'
import App from './App.vue'
import router from './router'
import cookies from 'vue-cookies'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);
Vue.use(cookies) 
axios.defaults.withCredentials=true

axios.defaults.baseURL = `http://www.luckycurve.cn:8090` 
      
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
