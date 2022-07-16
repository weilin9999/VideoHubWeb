// http.js封装axios的请求方式(get请求、post请求) 
// 封装axios超时请求时间
// token设置


import axios from 'axios' // 引用axios
import cookies from 'vue-cookies'
import config from '@/api/config'

const apiUrl = config.baseUrl.url // 使用到代理
// axios 配置
axios.defaults.timeout = 120000 // 设置接口响应时间
axios.defaults.baseURL = apiUrl // 这是调用数据接口,公共接口url+调用接口名

const origin = cookies.get('origin');
// 增加token（先写了个固定的token，实际项目中应该是通过接口获取到token）
if(origin != null){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + origin.token;
}

// 封装get请求
export function get (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
        .get(url, {
            params: params
        })
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
    })
}
// 封装post请求
export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data,{ headers:{'Content-Type' : 'application/x-www-form-urlencoded'} }).then(
        response => {
            resolve(response.data)
        },
        err => {
            reject(err)
        }
        )
    })
}
// 封装upload请求
export function upload (url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data,{ headers:{'Content-Type' : 'multipart/form-data'} }).then(
        response => {
            resolve(response.data)
        },
        err => {
            reject(err)
        }
        )
    })
}
