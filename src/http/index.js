import axios from 'axios'
// import { WindowsToaster } from 'node-notifier';
import router from '../router'
import {Message} from 'element-ui'
const $axios = axios.create({
    baseURL:'/api',
    timeout:3000
})
// 添加请求拦截器   修改请求头 【在请求头上加token】
$axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userInfo)
    var token=sessionStorage.getItem('token')
    // config.headers.Authorization=userInfo?userInfo.token:'';
    // console.log(config)
    config.headers.Authorization=token?token:"";
    return config; //一定要return config 请求无法发送
  }, function (error) {
    // 对请求错误做些什么


    return Promise.reject(error);
  });

// 添加响应拦截器   返回数据的校验  状态是否正确  信息的提取
$axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //  token过期我们拦截，跳转到登录页面
    if(response.data.code==403){
      Message.error(response.data.msg)
      router.push('/login')
    }

    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default $axios