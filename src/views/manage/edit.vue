

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                编辑直播间信息
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
    import UploadImg from '@/components/uploadImg/Index.vue';

    export default {
        name: 'ownspace_index',
        components:{ UploadImg },
        props:{
            liveItem:{
                type:Object,
                defadult:{}
            },
            editType:{
                type:String,
                default:'edit'
            }
        },
        watch:{
            liveItem(val){
                // 如果是编辑
                console.log("编辑的",val,this.editType)
                if(this.editType === 'edit' && val && val.id){
                    const {id,user_id,title,image,type,description,channel_type,live_url,integral_fee} = val
                    this.livingForm = { id,user_id,title,image,type:[+type],description,channelType:[+channel_type],live_url,integral_fee }
                }
            }
        },
        data () {
            //视频源：
            /**
             * http://xiaogan.live.cjyun.org/video/s10139-xg.flv
             * */
            return {
                livingForm: {
                    title: '',
                    image: '',
                    type:[],
                    channelType:[],
                    live_url:'',
                    description:'',
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
                const {id,user_id,title,image,type,description,channelType,live_url,integral_fee} = this.livingForm
                const params = {
                    id,
                    title:title,
                    user_id,
                    image,
                    type:type[0],
                    channel_type:channelType[0],
                    live_url,
                    description,
                    integral_fee
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

               this.$api.livingRoomApi.editRoom(params).then(data=>{
                    console.log("数据",data)
                    if(data && data.code === 200){
                        this.$emit('close')
                        this.$Message.success("编辑成功！")
                    }else{
                        this.$Message.error("编辑失败")
                    }
                    
                }).catch(()=>{
                     this.$Message.error("编辑失败")
                })


            }
        }
    };
</script>
