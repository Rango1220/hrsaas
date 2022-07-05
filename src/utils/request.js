// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义五秒超时
}) // 创建一个axios的实例
service.interceptors.request.use(config => {
  // 注入token

  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // config 是必须返回的
}, error => { return Promise.reject(error) }) // 请求拦截器
// service.interceptors.response.use(
//   response => {
//     const { success, message, data } = response.data

//     if (success) {
//       return data
//     } else {
//       // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
//       Message.error(message)
//       return Promise.reject(new Error(message))
//     }
//   }, error => {
//     Message.error(error.message) // 提示错误信息
//     return Promise.reject(error)// 返回执行错误进入catch
//   }
// ) // 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})
export default service // 导出axios实例
