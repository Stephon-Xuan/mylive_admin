
<template>
    <div class="home">
         <!-- <Input v-model="power" placeholder="请输入权限访问密码" style="width: 300px" /> -->

        <div class="room-list">
            <div class="room-box" v-for="(item,index) in roomList" :key="'room-'+index"  @click="goLivingRoom(item.id)">
                <div class="room-box-img">
                    <img :src="item.image"/>
                    <div class="room-box-img-type">
                        {{item.type_name}}
                       
                    </div>
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
        <!-- <div v-else class="no_power">暂无访问权限</div> -->
    </div>
</template>
<script>
import {mapActions,mapMutations,mapGetters,mapState} from "vuex"
export default {
    name:"roomList",
    data(){
        return {}
    },
    computed:{
        ...mapState({
            roomList:state=>state.room.roomList
        }),
        // hasPower(){
        //     const user_id = localStorage.getItem('user_id')
        //     return 
        // }
    },
    mounted(){
        //this.getRoomList()

        this.searchType()
    },
    methods:{
        ...mapActions([
            "setRoomList"
        ]),

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
        async searchType(data){
            let params = {}
            if(data){
                params.type = data
            }
            this.setRoomList(params)
            
        }
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
.no_power{
    display: flex;
    justify-content: center;
    align-items: center;
}
.fee{
    color: salmon;
    float: right;
    font-weight: bold;
    font-size: 16px;
    padding: 5px;
}
</style>