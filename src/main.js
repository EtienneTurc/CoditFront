import Vue from 'vue'
import App from './App.vue'

import router from "./router";
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import axios from "axios";
import VueAxios from "vue-axios";

import './assets/main.css'
import './assets/loader.css'

Vue.use(VueRouter)
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status == 401) {
		router.replace("/")
	}
	return Promise.reject(error);
});

Vue.prototype.$alert = new Vue()

// Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	render: h => h(App),
}).$mount('#app')
