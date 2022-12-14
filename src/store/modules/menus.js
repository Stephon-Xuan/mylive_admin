import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util'

const state = {
    menuTheme: 'dark', // 主题
  cachePage: [],
  openedSubmenuArr: [], // 要展开的菜单数组
  pageOpenedList: [{
    title: '首页',
    path: '',
    name: 'home_index'
  }],
  currentPageName: '',
  currentPath: [
    {
        title: '首页',
        path: '',
        name: 'home_index'
    }
  ], // 面包屑数组
  menuList: [],
  routers: [
    otherRouter,
    ...appRouter,
  ],
  tagsList: [...otherRouter.children],
}
const actions = {}
const mutations = {
// 主题


// 菜单列表
updateMenulist (state) {
// let accessCode = parseInt(Cookies.get('access'));
let  accessCode = 200   //假定两百
let menuList = [];
appRouter.forEach((item, index) => {
    if (item.access !== undefined) {

        if (Util.showThisRoute(item.access, accessCode)) {
            if (item.children.length === 1) {
                menuList.push(item);
            } else {
                let len = menuList.push(item);
                let childrenArr = [];
                childrenArr = item.children.filter(child => {
                    if (child.access !== undefined) {
                        if (child.access === accessCode) {
                            return child;
                        }
                    } else {
                        return child;
                    }
                });
                menuList[len - 1].children = childrenArr;
            }
        }
    }
    else {
        if (item.children.length === 1) {
            menuList.push(item);
        } else {
            let len = menuList.push(item);
            let childrenArr = [];
            childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                    if (Util.showThisRoute(child.access, accessCode)) {
                        return child;
                    }
                } else {
                    return child;
                }
            });
            if (childrenArr === undefined || childrenArr.length === 0) {
                menuList.splice(len - 1, 1);
            } else {
                let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                handledItem.children = childrenArr;
                menuList.splice(len - 1, 1, handledItem);
            }
        }
    }
});
state.menuList = menuList;
},
changeMenuTheme (state, theme) {
    state.menuTheme = theme;
},
closePage (state, name) {
    state.cachePage.forEach((item, index) => {
        if (item === name) {
            state.cachePage.splice(index, 1);
        }
    });
},
initCachepage (state) {
    if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage);
    }
},
setOpenedList (state) {
    state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
},
setCurrentPath (state, pathArr) {
    state.currentPath = pathArr;
},



// 子菜单栏相关
setCurrentPageName (state, name) {
    state.currentPageName = name;
},
addOpenSubmenu (state, name) {
    let hasThisName = false;
    let isEmpty = false;
    if (name.length === 0) {
        isEmpty = true;
    }
    if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true;
    }
    if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name);
    }
},
clearOpenedSubmenu (state) {
    state.openedSubmenuArr.length = 0;
},
}
const getters = {}






export default {
  namespace:"menus",
  state,
  actions,
  mutations,
  getters
}