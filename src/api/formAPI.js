import ApiUtils from './api-utils'
import Vue from 'vue'

Vue.use(ApiUtils)

const FormAllApi = {
  getFormProperties (params, callback, errorCallback) {
    let apiConfig = {
      operName: '获取单据属性集',
      callback: resData => callback(resData),
      errorCalback: (resData) => errorCallback(resData)
    }
    const API = 'http://www.ahbaizhi.com/properties.php'
    // ApiUtils.post(API, params, {}, apiConfig)
    ApiUtils.get(API, {}, apiConfig)
    // get有参数的情况
    // let action = '?taskId=' + params.taskId + '&userId=' + params.userId + '&queryCondition=' + params.queryCondition
    // ApiUtils.get(API + action, {}, apiConfig)
  }
}
export default FormAllApi
