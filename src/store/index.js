/*
 * @description: vuex统一入口
 * @author: Stephon
 * @lastEditors: Stephon
 * @Date: 2020-09-01 13:41:36
 * @LastEditTime: 2020-11-23 00:22:52
 * @Copyright: 1.0.0
 */
import Vue from 'vue'
import Vuex from 'vuex'
import room from "./modules/room"
import user from "./modules/user"
import barrage from "./modules/barrage"
import menus from "./modules/menus"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        room,
        user,
        barrage,
        menus
    }
})