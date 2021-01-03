import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(VueAxios, axios)

//引用mock
//名字默认写index.js，在引入的时候就可以不用写文件名
//require(".mock/index.js")
//mock里面默认请求index.js
import './mock/index.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
