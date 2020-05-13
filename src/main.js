import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

axios.defaults.withCredentials = true

axios.defaults.baseURL = `http://www.luckycurve.cn:8090` 
// axios.interceptors.request.use(config => {
//   console.log(config)
//   //console.log("登录")

//   config.headers.Authorization = window.sessionStorage.getItem('cookie');
//   return config
// })       
Vue.prototype.$http = axios
Vue.config.productionTip = false





Vue.prototype.$http =axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
