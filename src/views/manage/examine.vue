

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                课程考核
            </p>
            <div>
                <!-- <div style="color:red;margin:20px;">创建说明：视频源可以不填，创建后可使用直播课id去第三方工具OBS studio进行直播！</div> -->
                <Button @click="addProblem">添加问题</Button>
                <Form
                    :label-width="150"
                    label-position="right"
                    v-model="examine"
                    style="height:350px;overflow:auto;"
                >
                    <template v-for="(item,index) in examine">
                        <div :key="index">
                        <FormItem :label="`${index + 1}、问题：`" prop="title" >
                            <div style="display:flex;width:370px;">
                                <Input v-model="item.problem" ></Input> <Button style="margin-left:10px" @click="deleteProblem(item,index)">删除</Button>
                            </div>
                        </FormItem>
                        <FormItem label='参考答案：' prop="title" >
                            <div style="display:flex;width:300px;">
                                <Input v-model="item.answer" ></Input>
                            </div>
                        </FormItem>
                        </div>
                    </template>
                </Form>
                <div style="margin-top:100px;width:100%;" class="btn">
                        <Button type="primary"  @click="onSubmit()">确定</Button>
                </div>
                    
            </div>
        </Card>
    </div>
</template>

<script>

    export default {
        props:{
            roomId:{
                props:[String],
                default:''
            }
        },
        watch:{
        },
        data () {
            return {
                examine:[{problem:'',answer:''}],
                examine_id:'',
            };
        },
        mounted(){
           this.getExamineInfo()
        },

        methods: {
            addProblem(){
                this.examine.push({problem:'',answer:''})
            },
            deleteProblem(item,index){
                this.examine.splice(index,1)
                return this.$Message.success("删除成功")
            },

            // 查看考核题目
            getExamineInfo(){
                if(!this.roomId){
                    return this.$Message.warning("直播间不存在")
                }
                this.$api.examineApi.getExamineInfo(this.roomId).then(data=>{
                    console.log("获取数据",data)
                    if(data && data.examine_list){
                        this.examine = JSON.parse(data.examine_list).map(item=>{
                            return {...item,isOld:true}
                        })
                        this.examine_id = data.examine_id
                        console.log("考核的题目",this.examine)
                    }else{
                        this.examine_id = ''
                        this.examine = [{problem:'',answer:''}]
                    }
                }).catch(e =>{
                    console.log("请求失败",e)
                })
            },

            onSubmit(){
                if(!this.roomId){
                    return this.$Message.warning("直播间不存在")
                }
                const params ={
                    room_id:this.roomId,
                    examine_id:this.examine_id,
                    examine_list:JSON.stringify(this.examine)
                }
                this.$api.examineApi.addExamine(params).then(data=>{
                    console.log("请求成功",data)
                    this.$emit('close')
                    this.$Message.success("提交成功！")
                }).catch(e=>{
                    console.log("错误",e)
                })

            }
        }
    };
</script>

<style lang="less" scoped>
.btn{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>