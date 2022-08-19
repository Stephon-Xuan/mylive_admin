<template>
    <div>
        <div style="margin:10px 5px;">
          <Input v-model="channel_name" placeholder="请输入专栏昵称" clearable style="width: 200px;margin-right:20px" />
          <Button type="primary" @click="addChannel">添加专栏</Button>
        </div>
        <Table  :columns="columns1" :data="channelList">
            <template slot-scope="{row}" slot="name"> 
                {{row.channel_name}}
                <!-- <Input v-model="row.channel_name" placeholder="请输入专栏昵称" clearable style="width: 200px;margin-right:20px" /> -->
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(row,index)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <section>
            <Modal v-model="popupShow" width="550px" center  :mask-closable="false" :footer-hide="true" :transfer="false">
                <div>
                    专栏标题：
                    <Input v-model="editRow.channel_name" placeholder="请输入专栏昵称" clearable style="width: 200px;margin-right:20px" />
                     <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(editRow)">编辑</Button>
                </div>
            </Modal>
        </section>
    </div>
</template>

<script>
    import Edit from "../addRoom/index"
    // import {  }
    import {mapActions,mapMutations,mapGetters,mapState} from "vuex"
    export default {
        name: "manage.vue",
        components:{
            Edit
        },
        data(){
            return{
                channel_name:'',
                popupShow:false,
                columns1: [
                    {
                        title: '专栏名称',
                        key: 'channel_name',
                        slot:'name'
                    },
                    
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data2: [
                    {
                        name: 'John Brown',

                    },
                ],
                liveItem:{},
                channelList:[],
                editRow:{}
            }
        },
        mounted(){
            //this.getRoomList()
            this.getChannelList()
        },
        methods:{
            addChannel(){
                const  user_id = localStorage.getItem('user_id')
                if(!user_id){
                    this.$Message.error({
                        background: false,
                        content: '请登录后，再添加专栏'
                    });
                    return
                }
                if(!this.channel_name){
                    this.$Message.warning("请输入专栏名称")
                    return
                }
                const params = {
                    user_id,
                    channel_name:this.channel_name
                }
                this.$api.channelApi.addChannel(params).then(data =>{
                    console.log("请求成功",data)
                    this.getChannelList()
                }).catch(e =>{
                    this.$Message.error({
                        background: false,
                        content: '添加专栏失败！'
                    });
                })
            },
            getChannelList(){
                const  user_id = localStorage.getItem('user_id')
                 console.log("用户id",user_id)
                this.$api.channelApi.getChannelList(user_id).then(data =>{
                    console.log("获取的数据",data)
                    this.channelList = data
                }).catch(e=>{
                    console.log("请求错误")
                })
            },
            show (row,index) {
                this.editRow = {...row}
                this.popupShow = true
            },
            handleEdit(){
                if(!this.editRow.channel_name){
                    this.$Message.warning("请输入专栏名称")
                    return
                }
                const params ={
                    channel_id:this.editRow.channel_id,
                    channel_name:this.editRow.channel_name
                }
                this.$api.channelApi.editChannel(params).then(data =>{
                    this.$Message.success("编辑成功！")
                    this.getChannelList()
                }).catch(e=>{    
                    this.$Message.error("编辑失败")
                }).finally(()=>{
                    this.popupShow = false
                })
            },


            remove (index) {
                const rowItem = this.channelList[index]
                this.$api.channelApi.deleteChannel(rowItem.channel_id).then(data => {
                    this.getChannelList()
                    this.$Message.success("删除成功");
                }).catch(e =>{


                    console.log("删除失败")
                })
            }
        }
    }
</script>

<style scoped>

</style>