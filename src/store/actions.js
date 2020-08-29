import $axios from '../http'
import $api from '../http/api'
export default {
  menuAsyncAdd(context) {
    return new Promise((resolve, reject) => {
      //  promise中异步获取菜单列表内容
      $axios.get($api.menulistUrl, {
        params: { istree: 1 }
      })
        .then(res => {
          //  console.log(res.data.list)
          //  把获取到的数据存储到store中
          context.commit('setmenulist', res.data.list);
          //  异步请求成功把 结果返回出去
          resolve(res);
        })
    })
  },
  cateAsyncAdd(context) {
    return new Promise((resolve, reject) => {
      //  promise中异步获取菜单列表内容
      $axios.get($api.catelistUrl, {
        params: { istree: 1 }
      })
        .then(res => {
          //  console.log(res.data.list)
          //  把获取到的数据存储到store中
          context.commit('setcatelist', res.data.list);
          //  异步请求成功把 结果返回出去
          resolve(res);
        })
    })
  },
  roleAsyncAdd(context) {
    return new Promise((resolve, reject) => {
      //  promise中异步获取菜单列表内容
      $axios.get($api.rolelistUrl)
        .then(res => {
          //  console.log(res.data.list)
          //  把获取到的数据存储到store中
          context.commit('setrolelist', res.data.list);
          //  异步请求成功把 结果返回出去
          resolve(res);
        })
    })
  },
  userAsyncAdd(context,data) {
    return new Promise((resolve, reject) => {
      //  promise中异步获取菜单列表内容
      $axios.post($api.userloginUrl,data)
        .then(res => {
          //  console.log(res.data.list)
          //  把获取到的数据存储到store中
          context.commit('setuserinfo', res.data.list);
          //  异步请求成功把 结果返回出去
          resolve(res);
        })
    })
  },
  specsAsyncAdd(context,data) {
    return new Promise((resolve, reject) => {
      //  promise中异步获取菜单列表内容
      $axios.get($api.specslistUrl,{
        params:data
      })
        .then(res => {
          //  console.log(res.data.list)
          //  把获取到的数据存储到store中
          context.commit('setspecslist', res.data.list);
          //  异步请求成功把 结果返回出去
          resolve(res);
        })
    })
  },
  loginOutSync(context){
      context.commit("loginout");
      sessionStorage.removeItem("token");
  }
}