import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import Vue2Filters from 'vue2-filters'
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(Vue2Filters)
Vue.use(VModal)

import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store";
import {router} from "./router";

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
