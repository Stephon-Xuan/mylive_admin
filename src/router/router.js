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
        path: "/",
        name:"index",
        title:"首页",
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
  },

    {
        path: '/analysis',
        name:"analysis",
        component:Main,
        title:"数据分析",
        children:[
            {
                path: "/",
                name:"analysis",
                title:"数据分析",
                component: () => import("@/views/temp/temp.vue")
            }
        ],
    },
    {
        path: '/live',
        name:"live",
        component:Main,
        title:"课程直播",
        children:[
            {
                path: "/",
                name:"live",
                title:"课程直播",
                component: () => import("@/views/temp/temp.vue")
            }
        ],
    },
    {
        path: '/sort',
        name:"sort",
        component:Main,
        title:"直播分类",
        children:[
            {
                path: "/",
                name:"sort",
                title:"直播分类",
                component: () => import("@/views/temp/temp.vue")
            }
        ],
    },
    {
        path: '/manager',
        name:"manager",
        component:Main,
        title:"直播管理",
        children:[
            {
                path: "/add",
                name:"manager_add",
                title:"创建直播间",
                component: () => import("@/views/temp/temp.vue")
            },
            {
                path: "/",
                name:"manager_aa",
                title:"直播管理",
                component: () => import("@/views/temp/temp.vue")
            },
        ],
    },

]



export const routers = [
  // loginRouter,
  // ...oldRouter,
  ...appRouter
]