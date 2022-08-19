/*
 * @description: 
 * @author: Stephon
 * @lastEditors: Stephon
 * @Copyright: 1.0.0
 */
import livingRoomApi from "./modules/livingRoom"
import userApi from "./modules/user"
import channelApi from "./modules/channel"
import uploadApi from "./modules/upload"
import analysisApi from "./modules/analysis"
import examineApi from "./modules/examine"
import traineesApi from "./modules/trainees"

const apiObj = {
    livingRoomApi,
    userApi,
    channelApi,
    uploadApi,
    analysisApi,
    examineApi,
    traineesApi
}
export default apiObj