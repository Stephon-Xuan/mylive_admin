

let util = {

};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
      return true;
  } else {
      return false;
  }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
  let title = '';
  let isOtherRouter = false;
  console.log("菜单路由",vm.$store.state.menus.routers)
  vm.$store.state.menus.routers.forEach(item => {
    console.log("选项",item)
      if (item.children && item.children.length === 1) {
          if (item.children[0].name === name) {
              title = util.handleTitle(vm, item);
              if (item.name === 'otherRouter') {
                  isOtherRouter = true;
              }
          }
      } else {
          item.children.forEach(child => {
              if (child.name === name) {
                  title = util.handleTitle(vm, child);
                  if (item.name === 'otherRouter') {
                      isOtherRouter = true;
                  }
              }
          });
      }
  });
  let currentPathArr = [];
  if (name === 'home_index') {
      currentPathArr = [
          {
              title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.menus.routers, 'home_index')),
              path: '',
              name: 'home_index'
          }
      ];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
      currentPathArr = [
          {
              title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.menus.routers, 'home_index')),
              path: '/home',
              name: 'home_index'
          },
          {
              title: title,
              path: '',
              name: name
          }
      ];
  } else {
      let currentPathObj = vm.$store.state.menus.routers.filter(item => {
          if (item.children.length <= 1) {
              return item.children[0].name === name;
          } else {
              let i = 0;
              let childArr = item.children;
              let len = childArr.length;
              while (i < len) {
                  if (childArr[i].name === name) {
                      return true;
                  }
                  i++;
              }
              return false;
          }
      })[0];
      if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
          currentPathArr = [
              {
                  title: '首页',
                  path: '',
                  name: 'home_index'
              }
          ];
      } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
          currentPathArr = [
              {
                  title: '首页',
                  path: '/home',
                  name: 'home_index'
              },
              {
                  title: currentPathObj.title,
                  path: '',
                  name: name
              }
          ];
      } else {
          let childObj = currentPathObj.children.filter((child) => {
              return child.name === name;
          })[0];
          currentPathArr = [
              {
                  title: '首页',
                  path: '/home',
                  name: 'home_index'
              },
              {
                  title: currentPathObj.title,
                  path: '',
                  name: currentPathObj.name
              },
              {
                  title: childObj.title,
                  path: currentPathObj.path + '/' + childObj.path,
                  name: name
              }
          ];
      }
  }
  vm.$store.menus.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};
export default util;