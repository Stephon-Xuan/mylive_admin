
const state = {
    currentUser:{},
    token:""
}
const actions = {}
const mutations = {
    updateCurrentUser(state,data){
        state.currentUser = data
    },
    updateToken(state){
        state.token = localStorage.getItem("living_token")
    },
    //退出登录
    logout (state, vm) {
        // Cookies.remove('user');
        // Cookies.remove('password');
        // Cookies.remove('access');
        // 恢复默认样式
        // let themeLink = document.querySelector('link[name="theme"]');
        // themeLink.setAttribute('href', '');
        // // 清空打开的页面等数据，但是保存主题数据
        // let theme = '';
        // if (localStorage.theme) {
        //     theme = localStorage.theme;
        // }
        // localStorage.clear();
        // if (theme) {
        //     localStorage.theme = theme;
        // }
        console.log("退出登录")
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}