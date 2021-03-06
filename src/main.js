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
		router.replace("/login")
	}
	return Promise.reject(error);
});

// Markown code highlight
import marked from "marked"
import Prism from "prismjs"

marked.setOptions({
	highlight: function (code, lang) {
		if (!["py", "python", "javascript"].includes(lang))
			lang = "markup"
		return Prism.highlight(code, Prism.languages[lang], lang)

	}
})

Vue.prototype.$alert = new Vue()

Prism.silent = true

new Vue({
	router,
	vuetify,
	marked,
	render: h => h(App),
}).$mount('#app')
