import baseEnv from "@/assets/js/config.js"
import axios from "@/assets/js/http.js"

class Upload{
    // 获取图标列表
    getImgList(user_id){
        //通过用户进行搜索
        return axios.get(`${baseEnv.webUrl}/upload/getUserImg`,{params:{ user_id }}).then(res=>{
            return res.data.data
        })
    }
    // 删除图标
    deleteImg(img_id){
        return axios.get(`${baseEnv.webUrl}/upload/deleteUserImg`,{params:{ img_id }}).then(res=>{
            return res.data.data
        })
    }
}

const upload = new Upload()
export default upload 