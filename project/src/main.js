import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// require('./utils/element-ui')
import './utils/element-ui'
import './utils/st.css'


import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')