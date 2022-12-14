/*
 * @description: 用户接口
 * @author: Stephon
 * @lastEditors: Stephon
 * @Date: 2020-08-31 15:39:08
 * @LastEditTime: 2020-10-15 01:00:20
 * @Copyright: 1.0.0
 */
import baseEnv from "@/assets/js/config.js"
import axios from "@/assets/js/http.js"

class User{
    /**
     * @description: 用户登录接口
     * @Date: 2020-09-03 10:00:32
     * @author: Stephon
     * @param {type} 
     * @return {type} 
     */
    userLogin(params){
        return axios.post(`${baseEnv.webUrl}/users/login`,params).then(res=>{
            // return res.data
            return res.data
        })
    }

    /**
     * @description: 获取用户信息
     * @Date: 2020-08-31 16:03:52
     * @author: Stephon
     * @param {type} 
     * @return {type} 
     */
    getUserInfo(id="LNsKeo69KLCuGrbNg0nlg2jwQDQub28C"){
        return axios.get(`${baseEnv.webUrl}/users/getUserInfo`,{params:{id:id}}).then(res=>{
            return res.data
        })
    }

    /**
     * @description: 新增用户
     * @Date: 2020-08-31 16:06:33
     * @author: Stephon
     * @param {type} 
     * @return {type} 
     */
    addUser(params){
        console.log("新增用户参数",params)
        return axios.post(`${baseEnv.webUrl}/users/addUser`,params).then(res=>{
            return res.data
        })
    }

    /**
     * 编辑用户信息
     * 
     */
    editUserInfo(params){
        console.log("编辑用户参数",params)
        return axios.post(`${baseEnv.webUrl}/users/editUser`,params).then(res=>{
            return res.data
        })
    }
}
const user = new User()
export default user