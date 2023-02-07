import http from './axios.js'

let apiFun = {
};

//登录
apiFun.login = params => {
  return http.post('/user/login',params)
}

//注册
apiFun.enroll = params => {
  return http.post('/user/register',params)
}

//创建RAM用户
apiFun.newRAM = params => {
  return http.post('/user/createRam',params)
}