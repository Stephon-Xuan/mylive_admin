
<template>
<div>
    <Card>
        <div>
            <span>当前专栏：</span>
            <div style="display:inline-block;width:300px;">
                <Cascader v-model="channelType" :data="channelList" filterable></Cascader>
            </div>
        </div>
        <div class="home">
        <div class="room-list">
            <div class="room-box" v-for="(item,index) in userRoomList" :key="'room-'+index"  @click="goLivingRoom(item.room_id)">
                <div class="room-box-img">
                    <img :src="item.image"/>
                    <div class="room-box-img-type">{{item.type_name}}</div>
                </div>
                <div class="room-box-title">{{item.title}}</div>
                <p class="fee">{{item.integral_fee ? '￥'+ item.integral_fee : '免费'}}</p>

                <!-- <div class="live-line"></div> -->
                <div class="room-box-user">
                    <img :src="item.avatar"/>
                    <div class="room-box-user-name">{{item.name}}</div>
                </div>
            </div>
            
            
        </div>
    </div>
    </Card>
    <!-- <div class="page">
        <Page :total="100" show-elevator></Page>
    </div> -->
</div>
    
</template>
<script>
import {mapActions,mapMutations,mapGetters,mapState} from "vuex"
export default {
    name:"roomList",
    data(){
        return {
            channelList:[],
            user_id:'',
            channelType:[],
            userRoomList:[]
        }
    },
    computed:{
        // ...mapState({
        //     roomList:state=>state.room.roomList
        // }),
        // userRoomList(){
        //     const  user_id = localStorage.getItem('user_id')
        //     const result =this.roomList.filter(item => {
        //         return item.user_id === user_id
        //     })
        //     return result
        // }
    },
    mounted(){
        this.user_id = localStorage.getItem('user_id')
            if(!this.user_id){
                this.$Message.error({
                    background: false,
                    content: '请登录!'
            });
            return
        }
        this.getChannelList()
        this.getRoomList()
        // this.searchType()
        console.log("直播列表",this.roomList)
    },
    watch:{
        channelType(){
            this.getRoomList()
        }
    },
    methods:{
        // ...mapActions([
        //     "setRoomList"
        // ]),
        getRoomList(){
            const params = {
                user_id:this.user_id,
                channel_type:this.channelType.length > 0 ? this.channelType[0
                ] :undefined
            }
            this.$api.livingRoomApi.getRoomList(params).then(data=>{
                console.log("获取列表成功",data)
                this.userRoomList = data
            }).catch(e=>{
                this.$Message.warning("获取列表失败")
            })
        },


        getChannelList(){
            this.$api.channelApi.getChannelList(this.user_id).then(data=>{
                this.channelList.push({value:'',label:'全部专栏'})
                data.map(item =>{
                     this.channelList.push({
                        label:item.channel_name,
                        value:item.channel_id
                    })
                })
                
                console.log("专栏数据",data)
            }).catch(e=>{
                console.log("请求错误",e)
            })
        },

        /**
         * @description: 跳转到直播间
         * @Date: 2020-09-03 01:08:26
         * @author: Stephon
         * @param {type} 
         * @return {type} 
         */
        goLivingRoom(room_id){
            //window.open(`${window.location.origin}/live?room=${room_id}`,"_blank")
            this.$router.push({path:`/room?room=${room_id}`})
        },

        /**
         * @description: 根据类型搜索直播间
         * @Date: 2020-09-03 01:09:09
         * @author: Stephon
         * @param {type} 
         * @return {type} 
         */
        // async searchType(data){
        //     let params = {}
        //     if(data){
        //         params.type = data
        //     }
        //     this.setRoomList(params)
            
        // }
    },
}
</script>
<style lang="less" scoped>
.home{
    display: flex;
    justify-content: flex-start;
}
.type-list{
    background: #2f3035;
    height: calc(100vh - 60px);
    width: 250px;
    min-width: 250px;
    color: #8d919a;
    padding-top:10px;
    &-box{
        &-title{
            font-size: 20px;
            &-icon{
                margin-left: 5px;
                margin-right: 10px;
            }
        }
        &-tap{
            &-list{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                margin:10px;
            }
            &-item{
                font-size: 14px;
                text-align: center;
                background: #38393e;
                padding: 3px 8px;
                margin: 2px;
                width: 72px;
                overflow-x: hidden;
                cursor: pointer;
                &:hover{
                    color: @primary-color;
                }
            }
        }
    }
}
.room-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    .room-box{
        display: inline-block;
        width: 300px;
        height: 280px;
        background: #fff;
        border-radius: 10px;
        margin:10px;
        cursor: pointer;
        overflow: hidden;
        &-img{
            height: 200px;
            box-sizing: border-box;
            background: #eee;
            position: relative;
            &-type{
                position: absolute;
                right: 10px;
                top: 5px;
                background: rgba(0,0,0,0.5);
                color: #fff;
                padding: 2px 8px;
            }
            img{
                width:100%;
            }
        }
        &-title{
            margin: 5px 10px;
            &:hover{
                color: @primary-color;
            }
        }
        &-user{
            margin: 5px 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img{
                width:26px;
                height: 26px;
                border-radius: 50%;
                border: 0.5px solid #ccc;
                margin-right: 5px;
            }
        }
        &:hover{
            box-shadow: 0 0 8px #bbb;
        }
    }
}
.page{
    display: flex;
    align-items: center;
    justify-content: center;
}
.fee{
    color: salmon;
    float: right;
    font-weight: bold;
    font-size: 16px;
    padding: 5px;
}
</style>