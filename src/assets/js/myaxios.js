//创建一个axios插件
//引入axios
import axios from 'axios'

//创建插件对象
var myaxios = {}

//统一设置请求的地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
//统一设置请求的头部
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
//添加一个拦截器
axios.interceptors.request.use(function (config) {
  //在登录时,不需要添加Authorization
  if (!config.url.includes('login')) {
    //这里设置的token每次都是不一样的
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})
//添加插件方法
myaxios.install = function (Vue) {
  Vue.prototype.$http = axios
}
//将axios暴露出去
export default myaxios
