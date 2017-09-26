import axios from 'axios'
import AppUtils from './app-utils'
import Utils from './utils'

const ApiUtils = {
  setDefault (axiosConfig = {}) {
    if (axiosConfig.baseURL) {
      axios.defaults.baseURL = axiosConfig.baseURL
    }
    if (axiosConfig.timeout) {
      axios.defaults.timeout = axiosConfig.timeout
    }
  },
  get (url, axiosConfig = {}, apiConfig = {}) {
    apiConfig.url = url
    apiConfig.requestType = 'GET'
    return new Promise(
      (resolve, reject) => {
        axios.get(url, axiosConfig).then(
          (response) => {
            this.handelResponse(response.data, apiConfig)
            resolve(response.data)
          },
          (error) => {
            this.handelRequestError(error, apiConfig)
            reject(error)
            // reject(error) 错误已经handleRequestError里处理, 无需在继续处理.
          }
        )
      })
  }, // end of get
  post (url, data = {}, axiosConfig = {}, apiConfig = {}) {
    apiConfig.url = url
    apiConfig.requestType = 'POST'
    return new Promise(
      (resolve, reject) => {
        axios.post(url, data, axiosConfig).then(
          (response) => {
            this.handelResponse(response.data, apiConfig)
            resolve(response.data)
          },
          (error) => {
            this.handelRequestError(error, apiConfig)
            reject(error)
            // reject(error) 错误已经handleRequestError里处理, 无需在继续处理.
          }
        )
      })
  },
  put (url, data = {}, axiosConfig = {}, apiConfig = {}) {
    apiConfig.url = url
    apiConfig.requestType = 'PUT'
    return new Promise(
      (resolve, reject) => {
        axios.put(url, data, axiosConfig).then(
          (response) => {
            this.handelResponse(response.data, apiConfig)
            resolve(response.data)
          },
          (error) => {
            this.handelRequestError(error, apiConfig)
            reject(error)
            // reject(error) 错误已经handleRequestError里处理, 无需在继续处理.
          }
        )
      })
  },
  handelResponse (resData, apiConfig) {
    if (!Utils.isObject(resData)) {
      this.handelResDataError(resData, apiConfig)
    }
    if (resData.retCode === 1) { // 正常返回结果,但操作不一定成功.
      // 校验数据格式
      let dataValid = true
      if (apiConfig.dataValidator && typeof apiConfig.errorCallback === 'function') {
        dataValid = apiConfig.dataValidator(resData)
      }
      if (dataValid) {
        if (apiConfig.callback && typeof apiConfig.callback === 'function') {
          apiConfig.callback(resData)
        }
      } else {
        this.handelResDataError(resData, apiConfig)
      }
    } else {
      apiConfig.callback(resData)
      AppUtils.showWarning(resData.errMsg)
    }
  },
  handelResDataError (resData, apiConfig) {
    console.info('handelResDataError')
    console.info(resData)
    if (apiConfig.fallback && typeof apiConfig.fallback === 'function') {
      apiConfig.fallback(apiConfig)
    }
  },
  handelRequestError (error, apiConfig) {
    console.log(apiConfig)
    let operName = apiConfig.operName || '请求'
    // 处理请求出错
    if (error.response) {
      AppUtils.showWarning(`${operName}超时，请检查网络(status:${error.response.status})`)
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else {
      // Something happened in setting up the request that triggered an Error
      AppUtils.showWarning(`${operName}超时，请检查网络`)
      console.log(`${operName}`, error)
    }
    // 请求出错时的回调方法. 可以在此处进行降级处理等.
    if (apiConfig.requestErrorCallback && typeof apiConfig.requestErrorCallback === 'function') {
      apiConfig.requestErrorCallback(apiConfig)
    }
    if (apiConfig.fallback && typeof apiConfig.fallback === 'function') {
      apiConfig.fallback(apiConfig)
    }
  }
}
export default ApiUtils
