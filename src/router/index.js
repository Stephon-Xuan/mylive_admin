import Vue from 'vue'
import Router from 'vue-router'
import baseEnv from "@/assets/js/config.js"
import { routers } from './router';
Vue.use(Router)

export default new Router({
    mode:baseEnv.mode==="electron"?"hash":"history",
    routes:routers
})