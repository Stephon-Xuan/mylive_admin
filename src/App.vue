<template>
  <div id="app" class="app-main">
    <!-- <live-header v-if="!$route.meta.noHeader"></live-header> -->
     <!--使用keep-alive会将页面缓存-->
    <!-- <keep-alive>    
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> 
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
import {common} from "feather-common"
import liveHeader from "@/components/liveHeader"
export default {
  name: 'app',
  components: {
    liveHeader
  },
}
</script>

<style lang="less">
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}

</style>
