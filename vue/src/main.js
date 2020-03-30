import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import router from './router'
import store from './store.js'

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
