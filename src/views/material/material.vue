<template>
    <div>
        <Tabs value="image">
        <TabPane label="图片" name="image">
            <div style="float:right">
                 <Upload
                    multiple
                    :on-success="getImgList"
                    :action="getUploadUrl">
                    <Button type="primary" icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
            </div>
            <div style="margin-top:50px">
                <div style="">
                <template v-for="(item,index) in imgList">
                    <div :key="index" style="display:inline-block;">
                        <Card style="width:250px;height:280px;margin:10px">
                            <img 
                             style="width:200px;height:200px"
                            :src="item.img_url"/>
                            <p> 图片名：{{item.img_name && item.img_name.length > 10 ?item.img_name.substr(0,10) + '...' : item.img_name }}</p>
                            <div class="flex-bc">
                                <Button class="" @click="copy(item.img_url)"><Icon type="md-copy" />复制</Button>
                                <Button @click="deleteImg(item.img_id)"><Icon type="md-trash" />删除</Button></div>
                        </Card>
                    </div>
                </template>
            </div>
            </div>
            
        </TabPane>
    </Tabs>
    </div>
</template>

<script>
import baseEnv from "@/assets/js/config.js"
import {common} from "@/assets/js/common.js"
    export default {
        data(){
            return{
                user_id:'',
                imgList:[]
            }
        },
        computed:{
            getUploadUrl(){
                const result = `${baseEnv.webUrl}/upload/uploadImg?user_id=${this.user_id}`
            return result
        }
        },
        created(){
            this.user_id = localStorage.getItem('user_id')
            console.log("用户id",this.user_id)
            this.getImgList()
        },
        methods:{
            getImgList(){
                this.$api.uploadApi.getImgList(this.user_id).then(data=>{
                    console.log("获取的数据",data)
                    this.imgList = data
                }).catch(e=>{
                    console.log("获取错误",e)
                })
            },
            deleteImg(img_id){
                console.log("点击了",img_id)
                this.$api.uploadApi.deleteImg(img_id).then(data=>{
                    console.log("获取的数据",data)
                    this.getImgList()
                }).catch(e=>{
                    console.log("获取错误",e)
                })
            },
            copy(text){
                // console.log("复制的值",text)
                if(common.copy(text)){
                    this.$Message.success("复制成功")
                }else{
                    this.$Message.error("复制失败")
                }
            },
            

        }
        
    }
</script>

<style lang="less" scoped>
.flex-bc{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>