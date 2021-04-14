import {otherRouter, appRouter} from '@/router/router';

const state = {
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
    // otherRouter,
    ...appRouter
  ],
}
const actions = {}
const mutations = {
  updateMenulist (state) {
    let accessCode = parseInt(Cookies.get('access'));
    let menuList = [];
    appRouter.forEach((item, index) => {
      console.log("路由菜单",item)
        // if (item.access !== undefined) {
        //     if (Util.showThisRoute(item.access, accessCode)) {
        //         if (item.children.length === 1) {
        //             menuList.push(item);
        //         } else {
        //             let len = menuList.push(item);
        //             let childrenArr = [];
        //             childrenArr = item.children.filter(child => {
        //                 if (child.access !== undefined) {
        //                     if (child.access === accessCode) {
        //                         return child;
        //                     }
        //                 } else {
        //                     return child;
        //                 }
        //             });
        //             menuList[len - 1].children = childrenArr;
        //         }
        //     }
        // } else {
        //     if (item.children.length === 1) {
        //         menuList.push(item);
        //     } else {
        //         let len = menuList.push(item);
        //         let childrenArr = [];
        //         childrenArr = item.children.filter(child => {
        //             if (child.access !== undefined) {
        //                 if (Util.showThisRoute(child.access, accessCode)) {
        //                     return child;
        //                 }
        //             } else {
        //                 return child;
        //             }
        //         });
        //         if (childrenArr === undefined || childrenArr.length === 0) {
        //             menuList.splice(len - 1, 1);
        //         } else {
        //             let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
        //             handledItem.children = childrenArr;
        //             menuList.splice(len - 1, 1, handledItem);
        //         }
        //     }
        // }
    });
    state.menuList = menuList;
  },
  setCurrentPath (state, pathArr) {
    state.currentPath = pathArr;
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