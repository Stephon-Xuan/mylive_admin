import Main from '@/views/Main.vue';


// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  // path: '/login',
  // name: 'login',
  // meta: {
  //     title: 'Login - 登录'
  // },
  // component: () => import('@/views/login/login.vue')
};

export const oldRouter = [
  // {
  //   path: '/',
  //   redirect: {
  //       name: 'index'
  //   }
  // },
  // {
  //     path: '/index',
  //     name:"index",
  //     meta:{
  //         noHeader:false
  //     },
  //     component: () => import("@/views/home/roomList.vue"),
  // },
  // {
  //     path: "/room",
  //     name:"room",
  //     meta:{
  //         noHeader:false
  //     },
  //     component: () => import("@/views/live/room.vue")
  // }
]

export const appRouter = [
  {
    path: '/',
    name:"index",
    component:Main,
      title:"首页",
    children:[
      {
        path: "",
        name:"index",
        title:"直播间",
        component: () => import("@/views/home/roomList.vue")
      }
    ],
    
  },

  {
    path: "/room",
    name:"room",
    title:"直播间",
    component:Main,
    children:[
      {
        path: "",
        name:"room",
        title:"直播间",
        component: () => import("@/views/live/room.vue")
      }
    ]
  }
]



export const routers = [
  // loginRouter,
  // ...oldRouter,
  ...appRouter
]