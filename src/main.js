import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib'
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false

Vue.use(Vuetify);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default new Vuetify({
  icons: {
    iconfont: 'fa', // 'mdiSvg' ||'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
})
