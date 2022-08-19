<template>
    <div>
        <Table  :columns="columns1" :data="userRoomList">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="examineShow(row,index)">课程考核</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="traineeShow(row,index)">学员学习分析</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(row,index)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <!-- 问题考核 -->
        <section>
            <Modal v-model="examineDig" width="800px" 
             :mask-closable="false" :footer-hide="true" :transfer="false">
               <Examine
                @close="examineDig = false"
                v-if="examineDig"
                :roomId = roomId
               ></Examine>
            </Modal>
        </section>

        <!-- 学员学习分析 -->
        <section>
            <Modal v-model="traineeDig" width="1000px" :mask-closable="false" :footer-hide="true" :transfer="false">
               <Trainees 
               v-if="traineeDig"
               :roomId = roomId
                @close="traineeDig = false"
               ></Trainees>
            </Modal>
        </section>


        <section>
            <Modal v-model="popupShow" width="550px" :mask-closable="false" :footer-hide="true" :transfer="false">
               <Edit
                :liveItem="liveItem"
                @close="handleClose"
                editType="edit"
               ></Edit>
            </Modal>
        </section>
    </div>
</template>

<script>
    import Edit from "./edit"
    import Examine from "./examine"
    import Trainees from "./trainees"
    import {mapActions,mapMutations,mapGetters,mapState} from "vuex"
    export default {
        name: "manage.vue",
        components:{
            Edit,
            Examine,
            Trainees
        },
        data(){
            return{
                popupShow:false,
                traineeDig:false,
                examineDig:false,
                roomId:'',
                columns1: [
                    {
                        title: '直播课',
                        key: 'title'
                    },
                    {
                        title: '直播课id',
                        key: 'id'
                    },
                    {
                        title: '专栏类型',
                        key: 'type_name'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 350,
                        align: 'center'
                    }
                ],
                data2: [
                    {
                        name: 'John Brown',

                    },
                ],
                liveItem:{}
            }
        },
        mounted(){
            //this.getRoomList()
            this.searchType()
            // console.log("直播列表",this.roomList)
        },
        computed:{
            ...mapState({
                roomList:state=>state.room.roomList
            }),
            userRoomList(){
                const  user_id = localStorage.getItem('user_id')
                const result =this.roomList.filter(item => {
                    return item.user_id === user_id
                })
                // console.log("直播列表",result)
                return result
            }
        },
        methods:{
            examineShow(row){
                console.log("关注的行",row)
                this.roomId = row.id
                this.examineDig = true
            },
            traineeShow(row){
                console.log("关注的行",row)
                this.roomId = row.id
                this.traineeDig = true
            },

            handleClose(){
                this.popupShow = false
                this.searchType()
            },

            ...mapActions([
                "setRoomList"
            ]),
            async searchType(data){
                let params = {}
                if(data){
                    params.type = data
                }
                this.setRoomList(params)

            },
            show (row,index) {
                this.liveItem = row
                this.popupShow = true
            },
            remove (index) {
                const rowItem = this.userRoomList[index]
                this.$api.livingRoomApi.deleteRoom({id:rowItem.id}).then(data => {
                    this.$Message.success("删除成功")
                    this.searchType()
                }).catch(e =>{
                     this.$Message.error("删除失败")
                })
            }
        }
    }
</script>

<style scoped>

</style>