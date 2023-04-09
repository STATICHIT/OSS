/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-03-24 17:42:59
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-04-03 23:01:41
 * @FilePath: \OSS\mock\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 mockjs ($ npm install mockjs)
// import Mock from 'mockjs'




/**
 * 子用户管理
 */
let data1 = Mock.mock({
  "data|10": [ //生成10条数据 数组
    {
      "userid":"fleur@135370023988.cloudcan.com",
      "id|+1": 5370023988,//生成用户id，自增1
      "image": "@image('200x200','red','#fff','avatar')",
      "phone": /^1(5|3|7|8)[0-9]{9}$/,
      "type":"手动创建",
      "email": "@email()",
      "username": "@cname()",
      "createTime": "@date()",
      "updateTime": "@date()"
    }
  ]
})

//subuser数据
Mock.mock('/api/getSubUserList', (req) => {
  // 输出请求参数
  console.log(req)
  // let json = JM.getJsonFile('./user.json5')
  // 返回数据
  return {
    data1
  }
})




/**
 * 碎片管理
 */
let data2 = Mock.mock({
  "data|15": [ //生成10条数据 数组
    {
      "etag":"8276D07FA5E5728303D56301A9B55986",
      "blockToken": 5370023988,//生成用户id，自增1
      'size|1-999999999':0,
      "ip": '@ip',
      "port":"192.168.1.5",
      "objectName": "@cname()",
      "secret": "@cname()",
      "objectAcl": "@date()",
      "chunkNum": "@integer(1, 30)"
    }
  ]
})

//subuser数据
Mock.mock('/api/getFragment', (req) => {
  // 输出请求参数
  console.log(req)
  // let json = JM.getJsonFile('./user.json5')
  // 返回数据
  return {
    data2
  }
})





// 不限制请求方式(测试)
Mock.mock('/api/login', (req) => {
  // 输出请求参数
  console.log(req)
  // 返回数据
  return {
    // 输出数据(随机生成姓名)
    'name': '@name',
    // 还可以自定义其他数据
  }
})

// 限制 post
Mock.mock('/api/post', 'post', (req) => {
  // 输出请求参数
  console.log(req)
  // 返回数据
  return {
    // 输出数据(随机生成姓名)
    'name': '@name',
    // 还可以自定义其他数据
  }
})

// 限制 get
Mock.mock('/api/get', 'get', (req) => {
  // 输出请求参数
  console.log(req)
  // 返回数据
  return {
    // 输出数据
    'age|10-20': 10
    // 还可以自定义其他数据
  }
})

// 返回数据方式，所有请求方式都支持
Mock.mock('/api/login2', {
  "code": 200,
  "data": {},
  "msg": "请求成功"
})
// Mock.mock('/api/login1', require('./test.json'))
// Mock.mock('/api/login3', (req) => {
//   return require('./test.json')
// })
