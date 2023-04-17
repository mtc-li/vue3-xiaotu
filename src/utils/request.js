import axios from 'axios'
import store from '@/store'
import router from '@/router'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(function (config) {
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.status === 401) {
    store.commit('user/setUser', {})
    // encodeURIComponent()  转化位url编码，浏览器可识别
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(error)
})
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 如果是get请求 需要使用params来传递参数
    // 如果是不get请求 需要使用data来传递参数
    // method参数：get,Get,GET  转换成小写再来判断
    // toLowerCase() 转小写
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
