<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'0px':'200px', overflow: shrink ? 'visible' : 'auto'}">

            <scroll-bar ref="scrollBar">
                 <!-- :theme="menuTheme"  -->
                <shrinkable-menu
                        :shrink="shrink"
                        @on-change="handleSubmenuChange"
                        :before-push="beforePush"
                        :open-names="openedSubmenuArr"
                        :menu-list="menuList">
                    <div slot="top" class="logo-con">
                        <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
                        <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
                    </div>
                </shrinkable-menu>
            </scroll-bar>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
<!--                        <Icon type="navicon" size="32"></Icon>-->
<!--                        <Icon type="ios-keypad" size="32"/>-->
                        <Icon type="md-menu" size="32"/>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
<!--                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>-->
                    <!--
                    <lock-screen></lock-screen>
                    <message-tip v-model="mesCount"></message-tip>
                    <theme-switch></theme-switch> -->

<!--                    <div class="user-dropdown-menu-con">-->
<!--                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">-->
<!--                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">-->
<!--                                <a href="javascript:void(0)">-->
<!--                                    <span class="main-user-name">{{ userName }}</span>-->
<!--                                    <Icon type="arrow-down-b"></Icon>-->
<!--                                </a>-->
<!--                                <DropdownMenu slot="list">-->
<!--                                    <DropdownItem name="ownSpace">????????????</DropdownItem>-->
<!--                                    <DropdownItem name="loginout" divided>????????????</DropdownItem>-->
<!--                                </DropdownMenu>-->
<!--                            </Dropdown>-->
<!--                            <Avatar :src="avatorPath"  style="background: #619fe7;margin-left: 10px;"></Avatar>-->
<!--                        </Row>-->
<!--                    </div>-->
                    <Header></Header>


                </div>
            </div>
            <!-- <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div> -->
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from '@/components/main-components/shrinkable-menu/shrinkable-menu.vue';
    // import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from '@/components//main-components/breadcrumb-nav.vue';
    import fullScreen from '@/components//main-components/fullscreen.vue';
    // import lockScreen from './main-components/lockscreen/lockscreen.vue';
    // import messageTip from './main-components/message-tip.vue';
    // import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    // import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import scrollBar from '@/components/my-components/scroll-bar/vue-scroller-bars';
    import Header from "@/components/Header";//???????????????
    export default {
        components: {
            shrinkableMenu,
            // tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            // lockScreen,
            // messageTip,
            // themeSwitch,
            scrollBar,
            Header
        },
        data () {
            return {
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.menus.openedSubmenuArr
            };
        },
        computed: {
            menuList () {
                const menuList = this.$store.state.menus.menuList
                return menuList;
            },
            pageTagsList () {
                return this.$store.state.menus.pageOpenedList; // ??????????????????????????????
            },
            currentPath () {
                return this.$store.state.menus.currentPath; // ?????????????????????
            },
            avatorPath () {
                // return localStorage.avatorImgPath;
                return 'http://p1.music.126.net/HHld8HW1sje1MP6PuzFWZg==/109951164045790653.jpg?param=180y180'
            },
            cachePage () {
                return this.$store.state.menus.cachePage;
            },
        //     lang () {
        //         return this.$store.state.app.lang;
        //     },
            menuTheme () {
                return this.$store.state.menus.menuTheme;
            },
        //     mesCount () {
        //         return this.$store.state.app.messageCount;
        //     }
        },
        methods: {
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                // this.userName = Cookies.get('user');
                // let messageCount = 3;
                // this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                // this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                // if (name === 'ownSpace') {
                //     util.openNewPage(this, 'ownspace_index');
                //     this.$router.push({
                //         name: 'ownspace_index'
                //     });
                // } else if (name === 'loginout') {
                    // ????????????
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                // }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  ??????????????????????????????????????????????????????????????????????????????????????????
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                if (name === 'accesstest_index') {
                    return false;
                } else {
                    return true;
                }
                return true;
            },
            fullscreenChange (isFullScreen) {
                console.log(isFullScreen);
            },
            scrollBarResize () {
                this.$refs.scrollBar.resize();
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
        //     lang () {
        //         util.setCurrentPath(this, this.$route.name); // ???????????????????????????????????????
        //     },
            openedSubmenuArr () {
                setTimeout(() => {
                    this.scrollBarResize();
                }, 300);
            }
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.scrollBarResize);
        },
        // created () {
        //     // ??????????????????????????????
        //     this.$store.commit('setOpenedList');
        // },
        dispatch () {
            window.removeEventListener('resize', this.scrollBarResize);
        }
    };
</script>
