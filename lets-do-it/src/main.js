import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { remote } from 'electron';
import path from 'path';

Vue.config.productionTip = false

Vue.prototype.$db = remote.getGlobal('db');

console.log('nedb location: ' + path.join(remote.app.getPath('userData'), '/data.db'));

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
