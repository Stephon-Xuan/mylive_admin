import Main from '@/views/Main.vue';


// 不作为Main组件的子页面展示的页面单独写，如下
export const oldRouter = [
    {
        path: '/login',
        name: 'login',
        title:"登录",
        meta: {
            title: 'Login - 登录'
        },
        component: () => import('@/views/login/login.vue')
    }
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/livings',
    component: Main,
    children: [
        // { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/roomList.vue') },
        {
            path: "/room",
            name: "room_index",
            title:"直播间",
            component: () => import("@/views/live/room.vue")
        },
    ]
};

//作为Main组件的子页面展示的页面,name要根据路由的名字写
export const appRouter = [
    {
        path: '/livings',
        name:"livings",
        component:Main,
        icon: 'key',
        title:"直播大厅",
        children:[
            {
                path: "/",
                name:"livings",
                title:"直播大厅",
                component: () => import("@/views/home/roomList.vue")
            },
        ],
    },
    
    {
        path: '/mylive',
        name:"mylive",
        icon: 'social-buffer',
        component:Main,
        title:"我的直播间",
        children:[
            {
                path: "/",
                name:"list",
                title:"我的直播间",
                component: () => import("@/views/myRoom/myRoomList.vue")
            },
        ],
    },
    {
        path: '/manage',
        name:"manage",
        icon: 'social-buffer',
        component:Main,
        title:"直播管理",
        children:[
            {
                path: "/add",
                name:"manager_add",
                title:"创建直播课",
                component: () => import("@/views/manage/addRoom/index.vue")
            },
            {
                path: "/living_manage",
                name:"manage_living_manage",
                title:"直播管理",
                component: () => import("@/views/manage/manage.vue")
            },
            {
                path: "/channel_setting",
                name:"manage_sort",
                title:"专栏设置",
                component: () => import("@/views/manage/channelSetting/channelSetting.vue")
            }
        ],
    },
   
    {
        path: '/mine',
        name:"mine",
        component:Main,
        title:"个人中心",
        icon: 'social-buffer',
        children:[
            {
                path: "/account",
                name:"mine_account",
                title:"账号管理",
                component: () => import("@/views/mine/own-space/own-space.vue")
            },
            {
                path: "/analysis",
                name:"mine_analysis",
                title:"数据分析（积分）",
                component: () => import('@/views/mine/analysis/Analysis.vue')
            }
        ],
    },
     {
        path: '/material',
        name:"material",
        icon: 'social-buffer',
        component:Main,
        title:"我的素材库",
        children:[
            {
                path: "/",
                name:"material",
                title:"我的素材库",
                component: () => import("@/views/material/material.vue")
            },
        ],
    },
    
]

// 单独的对象,不需要解构,数组才需要解构
export const routers = [
  otherRouter,
  ...appRouter,
]