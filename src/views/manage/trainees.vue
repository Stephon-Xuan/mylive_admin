

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                学员情况分析
            </p>
            <div>
                <Table :columns="columns1" height="400" :data="stuInfo">
                    <template slot-scope="{ row }" slot="name">
                        <Poptip trigger="hover" placement="right">
                            <div class="api" slot="content">
                                
                                <p>年龄：{{row.age}}</p>
                                <p>邮箱：{{row.email}}</p>
                            </div>
                            <div style="width:100px;" class="flex_sc"><img style="heigth:40px;width:40px;border-radius:5px" :src="row.avatar"/><strong>{{ row.name}}</strong></div>
                         </Poptip>
                    </template>
                    <template slot-scope="{ row }" slot="fininsh_homework">
                        <strong>{{ row.stu_answer ? '是' : '否' }}</strong>
                    </template>
                    <template slot-scope="{ row }" slot="watch_time">
                        <strong>{{ row.watch_time ? row.watch_time : 0 }}</strong>
                    </template>
                    <template slot-scope="{ row }" slot="stu_answer">
                        <strong><Button v-if="row.stu_answer" @click="handleAnswer(row.stu_answer)" type="error" label="small">查看答案</Button> <span v-else>暂无提交</span></strong>
                    </template>
                    <template slot-scope="{ row }" slot="score">
                        <strong><span>{{row.score ? row.score : '未评分'}}</span></strong>
                    </template>
                    <template slot-scope="{ row }" slot="action">
                        <!-- <span>{{row.score}}</span> -->
                        <Button type="error" label="small" @click="showScoreDig(row)">评分</Button>
                        <!-- <strong><Button v-if="!row.score" type="error" label="small" @click="handleScore(row)">评分</Button> <span v-else>{{row.score}}</span></strong> -->
                    </template>
                </Table>

                <Modal
                v-model="answerShow"
                    title="查看学生的答案"
                    widht="500px"
                    height='500px'
                    >
                    <div style="height:300px;overflow:auto">
                        <template v-for="(item,index) in stu_answer">
                        <div :key="index" style="background-color:#fdffbd;margin-bottom:10px;font-weight:bold;">
                             <p style="padding:5px">问题：{{item.problem}}</p>
                             <p style="color:#ffa200;padding:5px">参考答案：{{item.answer}}</p>
                             <p style="padding:5px">学生的答案:{{item.stu_answer}}</p>
                        </div>
                    </template>
                    </div>
                </Modal>


                <Modal
                    v-model="scoreShow"
                    :footer-hide="true"
                    title="评分"
                    >
                    <p>
                        <Input v-model="stu_scoreInfo.score" style="margin-bottom:20px"></Input>
                        <Button @click="handleScore()">评分</Button>
                    </p>
                </Modal>
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
                stu_scoreInfo:{
                    score:'',
                    user_id:'',
                    room_id:''
                },
                answerShow:false,
                scoreShow:false,
                stu_answer:[],
                columns1: [
                    {
                        title: '学员',
                        key: 'name',
                        slot:'name'
                    },
                    {
                        title: '是否完成作业',
                        key: 'fininsh_homework',
                        slot: 'fininsh_homework'
                    },
                    // {
                    //     title: '观看时长',
                    //     key: 'watch_time',
                    //     slot:'watch_time'
                    // },
                    {
                        title: '答案',
                        key: 'stu_answer',
                        slot:'stu_answer',
                        align: 'center'
                    },
                    {
                        title: '分数',
                        key: 'score',
                        slot:'score',
                        align: 'center'
                    },
                    {
                        title: '评分',
                        key: 'action',
                        slot:'action',
                        align: 'center'
                    },

                ],
                stuInfo: []
            };
        },
        mounted(){
           this.getTraineesInfo()
        },

        methods: {
            getTraineesInfo(){
                if(!this.roomId){
                    return this.$Message.warning("直播间不存在")
                }
                this.$api.traineesApi.getTraineesInfo(this.roomId).then(data=>{
                    // console.log("请求成功",data)
                    this.stuInfo = data
                }).catch(e=>{
                    console.log("请求失败")
                })
            },
            showScoreDig(row){
                const {score,user_id,room_id } = row
                this.stu_scoreInfo = {score:score ? score : '',user_id,room_id }
                this.scoreShow = true
                
            },

            handleScore(){
                // score

                // const params ={
                //     score:row.score ? row.score : '',
                //     user_id:row.user_id,
                //     room_id:row.room_id
                // }
                this.$api.traineesApi.editTrainees(this.stu_scoreInfo).then(data =>{
                    console.log("数据",data)
                    this.$Message.success("评分成功")
                    this.getTraineesInfo()
                    this.scoreShow = false
                }).catch(e=>{
                    // console.log("")
                    this.$Message.error("评分失败")
                })
            },
            handleAnswer(answer){
              
                this.stu_answer = JSON.parse(answer)
                this.answerShow = true
                console.log("学生的答案",answer,this.stu_answer)

            }

        }
    };
</script>
<style lang="less" scoped>
.flex_sc{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>