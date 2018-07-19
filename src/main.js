import Vue from 'vue'
import VueRoute from 'vue-router'
import App from './App.vue'
import { routes } from './route.js'
import { store } from './store/store.js';
// import VueLocalStorage from 'vue-localstorage'


// Vue.use(VueLocalStorage)
Vue.use(VueRoute)

const router = new VueRoute({
    routes,
    mode: 'history',
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})