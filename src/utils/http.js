import axios from 'axios'
import qs from 'qs'
import {  ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'
let loading
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API , // url = base url + request url  process.env.VUE_APP_BASE_API  '/api'npm
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    loading = ElLoading.service({
      lock: true,
      text: '数据处理中,请稍后...',
      background: 'rgba(0, 0, 0, 0.1)'
    })
    // config.headers['accessToken'] = getToken()
    let contentType = config.headers['Content-Type']
    if(contentType === 'multipart/form-data' || (config.data && config.data.payload)){
      //console.log('payload')
    }else{
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // do something with request error
    //console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    loading.close();
    const res = response.data
    const headers = response.headers
    if (headers['content-type'] === 'application/vnd.ms-excel') {
      return response.data
    }
    if (res.resCode === 200) {
      return res
    } else {
		
      // if (res.resCode === 100) {
      //   ElMessageBox.confirm('登录失效, 请重新登录系统 !', '温馨提示', {
      //     confirmButtonText: '重新登录',
      //     showCancelButton: false,
      //     closeOnClickModal: false,
      //     showClose: false,
      //     center:true,
      //     type: 'warning',
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // } else {
      //   ElMessage({
      //     message: res.resMsg,
      //     type: 'error'
      //   })
      // }
      return Promise.reject(new Error(res.resMsg || 'Error'))
    }
  },
  error => {
    console.log(error)
    loading.close()
    ElMessage({
      message: '接口请求出错',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
