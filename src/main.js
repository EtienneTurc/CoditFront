import Vue from 'vue'
import App from './App.vue'

import router from "./router";
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueRouter)
Vue.use(VueAxios, axios);

// Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	render: h => h(App),
}).$mount('#app')
