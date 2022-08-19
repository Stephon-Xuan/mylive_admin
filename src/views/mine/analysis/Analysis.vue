<template>
  <div>
      <p style="color:#464c5b;margin:10px;font-size:'32px'">数据分析</p>
      <div>
          <Row>
            <Col span="11">
            <div>
               <span class="title"><span class="title_tip">|</span>用户基本信息</span>
            <Card style="width:90%;height:300px">
                <!-- <div class="flex_sc"> -->
                     <!-- </div> -->
                <div class="item">
                    头像：
                     <Avatar 
                        style="margin-right:10px;height:100px;width:100px"
                        icon="ios-person" shape="square" size="large" :src="userInfo.avatar"/>
                </div>
                <!-- <div class="item">用户id:{{userInfo.currentUser}}</div> -->
                <div class="item">管理员：{{userInfo.name}}</div>
                <div class="item">年龄：{{userInfo.age}}</div>
                <div class="item">邮箱：{{userInfo.email}}</div>
                <div class="item">
                </div>
            </Card>
          </div>        
        </Col>
        <Col span="11">
             <div>
            <div><span class="title"><span class="title_tip">|</span>数据分析</span></div>
            <Card style="width:90%;height:300px">
                <div class="item">专栏数量:{{numCount(userInfo.channel_num)}}</div>
                <div class="item">直播课数量:{{numCount(userInfo.lecture_num)}}</div>
                <div class="item">剩余积分:{{numCount(userInfo.integral_surplus)}}</div>
                <!-- <div class="item">获得积分:{{numCount(userInfo.integral)}}</div> -->
                <!-- <div class="item">支出积分:{{numCount(userInfo.integral)}}</div> -->
                <!-- <div class="item">到访数:{{numCount(userInfo.visited_total)}}</div> -->
            </Card>
        </div>  
        </Col>
        </Row> 
        <Row>
            <Col span="11">
        <div>
            <div><span class="title"><span class="title_tip">|</span>最近浏览的直播课</span></div>
            <div style="padding:10px 10px">
                <template v-for="(item,index) in history_list">
                    <div :key="index" class="room_title">
                        <Button style="width:200px;" @click="goLivingRoom(item.room_id)">{{item.title}}</Button>
                    </div>

                </template>
            </div>
        </div>
        </Col>
        <Col span="11">
        <div>
            <div><span class="title"><span class="title_tip">|</span>已购买的直播课</span></div>
            <div style="padding:10px 10px">
                <template v-for="(item,index) in room_list">
                    <div :key="index" class="room_title">
                        <Button style="width:200px;"  @click="goLivingRoom(item.room_id)">{{item.title}}</Button>
                    </div>
                </template>
            </div>
        </div>
        </Col>
        </Row>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // currentUser:'',
            userInfo:{},
            history_list:[],
            room_list:[]
        }
    },
    mounted(){
        if(Object.keys(this.currentUser).length === 0) return
        // console.log("用户信息",this.userInfo)
        console.log("拿到的用户数据",this.currentUser)
        this.getUserAnalysis()

    },
    computed:{
        currentUser(){
            return  this.$store.state.user.currentUser
        }
    },
    watch:{
        currentUser(val){
            if(val && val.id){
                this.getUserAnalysis()
            }
            
            // console.log("用户的值",val)
        }   
    },
    methods:{
        numCount(val){
            return val ? val : 0
        },
        getUserAnalysis(){
            console.log("id",this.currentUser.id)
             this.history_list = []
             this.room_list =[]
            this.$api.analysisApi.getAnalysisList({user_id:this.currentUser.id}).then(data =>{
                // console.log("请求成功",data)
                if(data && data.length > 0){
                    this.userInfo = data[0]
                    if(this.userInfo && this.userInfo.visit_history){
                        this.history_list = JSON.parse(this.userInfo.visit_history)
                    }
                    if(this.userInfo && this.userInfo.room_list){
                        this.room_list = JSON.parse(this.userInfo.room_list)
                    }
                }
            }).catch(e=>{
                console.log("错误",e)
            })
        },
        goLivingRoom(room_id){
            this.$router.push({path:`/room?room=${room_id}`})
        },  
    }
}
</script>

<style lang="less" scoped>

.title{
    font-size: 16px;
    font-weight: bold;
    .title_tip{
        display: inline-block;
        font-size: 32px;
        width: 5px;
        margin-right: 10px;
        color: #0090f2;
    }
}
.flex_sc{
    display: flex;
    align-items: center;
    justify-content: start;
    flex:1 1 auto;
    // width:300px
}
.item{
    font-size: 16px;
    padding: 10px;
}
.room_title{
    color: royalblue;
    margin: 10px;
}
</style>