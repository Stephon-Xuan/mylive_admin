<style lang="less">
    @import 'index.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                直播间信息
            </p>
            <div>
                <div style="color:red;margin:20px;">创建说明：视频源可以不填，创建后可使用直播课id去第三方工具OBS studio进行直播！</div>
                <Form
                    ref="formValidate"
                    :rules="ruleValidate"
                    :model="livingForm"
                    :label-width="150"
                    label-position="right"
                >
                    <FormItem label="直播间名字：" prop="title" >
                        
                        <div style="display:inline-block;width:300px;">
                            
                            <Input v-model="livingForm.title" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="封面的链接：" prop="image" >
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="livingForm.image" ></Input>
                        </div>
                        <!-- <UploadImg></UploadImg> -->
                    </FormItem>
                    <FormItem label="直播分类：" prop="image" >
                        <div style="display:inline-block;width:300px;">
<!--                            <Input v-model="livingForm.type" ></Input>-->
                            <Cascader v-model="livingForm.type" :data="typeList" filterable></Cascader>
                        </div>
                    </FormItem>
                    <FormItem label="专栏：" prop="image" >
                        <div style="display:inline-block;width:300px;">
                            <Cascader v-model="livingForm.channelType" :data="channelList" filterable></Cascader>
                        </div>
                    </FormItem>
                    
                    <FormItem label="直播课描述:" prop="description">
                        <div style="display:inline-block;width:300px;">
                            <Input  v-model="livingForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </div>
                    </FormItem>
                    <FormItem label="其他视频源(.flv)：" prop="xxx" >
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="livingForm.live_url" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="所需积分:">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="livingForm.integral_fee" ></Input>
                        </div>
                    </FormItem>
                    
                    <div>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">确定</Button>
                    </div>
                    
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>

    // import edit from "../edit";
    import UploadImg from '@/components/uploadImg/Index.vue';

    export default {
        name: 'ownspace_index',
        components:{ UploadImg },
        data () {
            //视频源：
            /**
             * http://xiaogan.live.cjyun.org/video/s10139-xg.flv
             * */
            return {
                livingForm: {
                    title: '直播课',
                    image: 'http://localhost:8512/uploads/20190828000032-af65c680ce553bde026b9cdc853b9fea.png',
                    type:[],
                    channelType:[],
                    live_url:'http://xiaogan.live.cjyun.org/video/s10139-xg.flv',
                    description:'值得一看哦！',
                    integral_fee:''
                },
                save_loading:false,
                user_id:'',
                channelList:[],
                typeList:[],
                 ruleValidate: {
                    title: [{ required: true}],
                    image: [{ required: true}],
                    type:[{ required: true}],
                    channelType:[{ required: true}],
                    description:[{ required: true}]
                 }
            };
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
            this.getTypeList()
            this.getChannelList()
        },

        methods: {
            getTypeList(){
                this.$api.livingRoomApi.getRoomType().then(data=>{
                    this.typeList = data.map(item =>{
                        return {
                            label:item.type_name,
                            value:item.type_id
                        }
                    })
                }).catch(e =>{
                    console.log("请求失败",e)
                })
            },
            getChannelList(){
                this.$api.channelApi.getChannelList(this.user_id).then(data=>{
                    this.channelList = data.map(item =>{
                        return {
                            label:item.channel_name,
                            value:item.channel_id
                        }
                    })
                    console.log("专栏数据",data)
                }).catch(e=>{
                    console.log("请求错误",e)
                })
            },


            saveEdit() {
                const params = {
                    title:this.livingForm.title,
                    user_id:localStorage.getItem('user_id'),
                    image:this.livingForm.image,
                    type:this.livingForm.type[0],
                    channel_type:this.livingForm.channelType[0],
                    live_url: this.livingForm.live_url,
                    description:this.livingForm.description,
                    integral_fee:this.livingForm.integral_fee
                }
                let filter =[]

                Object.keys(params).map(item=>{
                    if(item === 'live_url' || item === 'integral_fee') return
                    if(!params[item]){
                        filter.push(item)
                    }
                })

                if(filter.length > 0){
                    this.$Message.warning("请把信息填写完毕！")
                    return
                }

               this.$api.livingRoomApi.addRoom(params).then(data=>{
                    // console.log("添加成功",data)
                    this.$Message.success("创建成功！")
                    this.$router.push({path:'/mylive'})
                }).catch("创建失败")


            }
        }
    };
</script>
