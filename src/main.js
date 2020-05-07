import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL='http://www.luckycurve.cn:8090'

Vue.prototype.$http =axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
