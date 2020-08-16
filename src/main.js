import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import Vue2Filters from 'vue2-filters'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import VueTreeList from 'vue-tree-list'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(VueTreeList)
Vue.use(Vue2Filters)
Vue.use(BootstrapVue)
Vue.use(VModal)

import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store";
import { router } from "./router";

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
