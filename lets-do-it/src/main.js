import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import { remote } from 'electron'

Vue.config.productionTip = false

Vue.prototype.$db = remote.getGlobal('db');

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
