import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index"

//引入iview
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

Vue.config.productionTip = false

//将baseEnv注入到vue原型中
import baseEnv from "@/assets/js/config.js"
Vue.prototype.$baseEnv = baseEnv;

//将common注入到vue原型中
import {common} from "@/assets/js/common.js"
Vue.prototype.$commonFunc = common

//将api注入到vue原型中
import api from "@/api/index.js"
Vue.prototype.$api = api

//将socket注入到vue原型中
import {sockBarrage,socketBarrage} from "@/api/socket.js"
Vue.prototype.$sockBarrage = sockBarrage
Vue.prototype.$socketBarrage = socketBarrage

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
    // iview-admin检查更新
  },
}).$mount('#app') 
