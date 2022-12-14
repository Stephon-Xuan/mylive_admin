/*
 * @description: 直播间接口
 * @author: Stephon
 * @lastEditors: Stephon
 * @Date: 2020-08-31 15:39:16
 * @LastEditTime: 2020-10-15 01:17:08
 * @Copyright: 1.0.0
 */
import baseEnv from "@/assets/js/config.js"
import axios from "@/assets/js/http.js"

class LivingRoom{
    /**
     * @description: 获取直播间列表
     * @Date: 2020-08-31 16:08:17
     * @author: Stephon
     * @param {type} 
     * @return {type} 
     */
    getRoomList(params){
        if(params && params.type || (params && (params.user_id || params.channel_type)) ){
            //通过类型进行搜索
            return axios.get(`${baseEnv.webUrl}/livingRoom/roomListByType`,{params:params}).then(res=>{
                return res.data.data
            })
        }else{
            //通过输入的信息进行搜索
            return axios.get(`${baseEnv.webUrl}/livingRoom/roomList`,{params:params}).then(res=>{
                return res.data.data
            })
        }
    }


    /**
     * @description: 获取直播间详情
     * @Date: 2020-09-10 23:25:34
     * @author: Stephon
     * @param {type} 
     * @return {type} 
     */
    getRoomDetail(params){
        return axios.get(`${baseEnv.webUrl}/livingRoom/roomDetail`,{params:params}).then(res=>{
            return res.data.data
        })
    }

    /**
     * @description: 新增直播间
     * @Date: 2020-09-03 00:42:05
     * @author: Stephon
     * @param {type} 
     * @return {type} 
     */
    addRoom(params){
        return axios.post(`${baseEnv.webUrl}/livingRoom/addRoom`,params).then(res=>{
            return res.data
        })
    }

    /**
     * @description: 编辑直播间
     * @Date: 2020-09-03 00:42:17
     * @author: Stephon
     * @param {type} 
     * @return {type} 
     */
    editRoom(params){
        return axios.post(`${baseEnv.webUrl}/livingRoom/editRoom`,params).then(res=>{
            return res.data
        })
    }

    //删除直播间
    deleteRoom(params){
        return axios.get(`${baseEnv.webUrl}/livingRoom/deleteRoom`,{params}).then(res=>{
            return res.data.data
        })
    }
    getRoomType(){
         return axios.get(`${baseEnv.webUrl}/livingRoom/roomTypeList`).then(res=>{
            return res.data.data
        })
    }
}
const livingRoom = new LivingRoom()
export default livingRoom