import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueAnalytics from 'vue-analytics';

import 'animate.css/animate.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAnalytics, {
  id: 'UA-118273401-1',
});

new Vue({
  render: h => h(App),
}).$mount('#app');
