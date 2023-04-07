import http from './axios.js'

let apiFun = {
  //自定义对象，命名隔离，消除重名影响
  user:{},
  bucket:{
    authorize:{},
    tag:{},
  },
  object:{
    tag:{},
    accessKey:{},
  },
  test:{},
};

/**
 * 测试接口（按需添加，可删）
 * */

//前后端链接测试
apiFun.test.test = () =>{
  return http.get('/test/demo')
}

//测试文件预览
apiFun.test.fileView =() =>{
  return http.get('test/downLoad')
}

//测试文件MD5
apiFun.test.getMd5 =() =>{
  return http.get('test/getMd5')
}

//获取数据大屏初始化数据接口
apiFun.getScreenData = () => {
  return http.get('/allBucketMessage/getMessage')
}

/**
 * 用户接口 
 * */ 

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

/**
 * bucket接口
 *  */

//获取桶信息
apiFun.bucket.get = (bucketName) => {
  return http.get('/bucket/getBucketInfo?bucketName='+bucketName)
}

//获取桶列表
apiFun.bucket.getList = (pageNum,size,key) => {
  return http.get('/bucket/listBuckets?pageNum='+pageNum+'&size='+size+'&key='+key)
}

//创建一个桶
apiFun.bucket.create = params => {
  return http.post('/bucket/createBucket',params)
}

//删除一个桶
apiFun.bucket.delete = (bucketName) => {
  return http.delete('/bucket/deleteBucket?bucketName='+bucketName)
}

//用户收藏一个桶
apiFun.bucket.collect = (name) =>{
  return http.put('/favorite/putUserFavorite?bucketName='+name)
}

//用户取消收藏一个桶
apiFun.bucket.userDelete = (name) => {
  return http.delete('/favorite/deleteUserFavorite?bucketName='+name)
}
//获取用户收藏的桶
apiFun.bucket.getCollect = () => {
  return http.get('/favorite/getUserFavorite')
}

/**
 * bucket授权策略接口
 *  */

//添加/更新一个bucket授权策略
apiFun.bucket.authorize.addOrUpdate = (bucketName,authorizeId) =>{
  return http.post('/authorize/putAuthorize?bucketName='+bucketName+'&authorizeId='+authorizeId)
}

//获取权限策略列表
apiFun.bucket.authorize.getList =(bucketName) =>{
  return http.get('/authorize/listAuthorizes?bucketName='+bucketName)
}

//删除一个授权策略
apiFun.bucket.authorize.delete =(bucketName,authorizeId) =>{
  return http.delete('/authorize/deleteAuthorize?bucketName='+bucketName+'&authorizeId='+authorizeId)
}

apiFun.object.metadata = (objectName,bucketName) => {
  return http.get('/ossObject/getObjectInfo?objectName='+objectName+'&bucketName='+bucketName)
}

/**
 * bucket标签接口
 */

//获取bucket标签列表
apiFun.bucket.tag.getTags= (bucketName) => {
  return http.get(`/bucketTag/getBucketTag?bucketName=${bucketName}`)
}
//删除bucket标签
apiFun.bucket.tag.deleteTag= (bucketName,tagId) => {
  return http.delete(`deleteBucketTag?bucketName=${bucketName}&TagId=${tagId}`)
}
//添加bucket标签
apiFun.bucket.tag.addTag= params => {
  return http.put(`/bucketTag/putBucketTag`,params)
}



/**
 * 对象接口
 *  */

//从桶中获取一个对象的元数据
apiFun.object.metadata = (objectName,bucketName) => {
  return http.get('/ossObject/getObjectInfo?objectName='+objectName+'&bucketName='+bucketName)
}

//从桶中获取一个对象的真实数据
apiFun.object.dataInfo = (objectName,bucketName) => {
  return http.get('/ossObject/getObject?objectName='+objectName+'&bucketName='+bucketName)
}

//在桶中添加一个文件夹
apiFun.object.add = (bucketName,objectName,parentObject) =>{
  if(parentObject==null){
  return http.put('/ossObject/putFolder?bucketName='+bucketName+'&objectName='+objectName)
  }else 
  return http.put('/ossObject/putFolder?bucketName='+bucketName+'&objectName='+objectName+'&parentObjectId='+parentObject)
}

//在桶中添加一个对象[小文件]
apiFun.object.addSmall = (bucketName,objectName,md5,parentObject) =>{
  return http.put('/ossObject/putSmallObject?bucketName='+bucketName+'&objectName='+objectName+'&md5='+md5+'&parentObjectId='+parentObject)
}

//在桶中添加一个对象[大文件]
apiFun.object.addBig = (bucketName,objectName,md5,size,chunks,chunk,parentObject) =>{
  return http.put('/ossObject/putBigObject?bucketName='+bucketName+'&objectName='+objectName+'&md5='+md5+'&size='+size+'&chunks='+chunks+'&chunk='+chunk+'&parentObjectId='+parentObject)
}

//从桶中删除一个对象
apiFun.object.delete = (bucketName,objectName) => {
  return http.delete('/ossObject/deleteObject?bucketName='+bucketName+'&ObjectName='+objectName)
}

//获取对象列表
apiFun.object.objectList = (bucketName,key,pagenum,size,parentObjectId) => {
  if(!parentObjectId){
    if(!key)
  return http.get('/ossObject/listObjects?bucketName='+bucketName+'&pagenum='+pagenum+'&size='+size)
    else 
  return http.get('/ossObject/listObjects?bucketName='+bucketName+'&key='+key+'&pagenum='+pagenum+'&size='+size)
  }else{
    if(!key)
  return http.get('/ossObject/listObjects?bucketName='+bucketName+'&pagenum='+pagenum+'&size='+size+'&parentObjectId='+parentObjectId)
  else
  return http.get('/ossObject/listObjects?bucketName='+bucketName+'&key='+key+'&pagenum='+pagenum+'&size='+size+'&parentObjectId='+parentObjectId)
  }
}

//获取对象状态
apiFun.object.getStatus = (objectName,bucketName) => {
  return http.get('/ossObject/getState?objectName='+objectName+'&bucketName='+bucketName)
}

//获取对象的元数据
apiFun.object.getInfo = (objectName,bucketName) => {
  return http.get('/ossObject/getObjectInfo?objectName='+objectName+'&bucketName='+bucketName)
}

//解冻一个对象
apiFun.object.unfreeze = (bucketName,objectName) => {
  return http.post(`/ossObject/unfreeze?bucketName=${bucketName}&objectName=${objectName}`)
}

//备份一个对象
apiFun.object.backupObject = (bucketName,objectName,targetBucketName,newObjectName) => {
  return http.post('/ossObject/backup?bucketName='+bucketName+'&objectName='+objectName+'&targetBucketName='+targetBucketName+'&newObjectName='+newObjectName)
}
//复原一个对象
apiFun.object.backupRecoveryObject = (bucketName,objectName) => {
  return http.post('/ossObject/backupRecovery?bucketName='+bucketName+'&objectName='+objectName)
}
//归档一个对象
apiFun.object.freeze = (bucketName,objectName) => {
  return http.post(`/ossObject/freeze?bucketName=${bucketName}&objectName=${objectName}`)
}
//批量删除对象
apiFun.object.deleteMore = (bucketName,params) => {
  return http.delete(`/ossObject/batchDeletion?bucketName=${bucketName}`,params)
}

//更新objectAcl
 apiFun.object.updateAcl = (bucketName,objectName,bucketAcl) => {
  return http.put(`/ossObject/updateObjectAcl?bucketName=${bucketName}&objectName=${objectName}&newtName=${bucketAcl}`)
 }


/**
 * 对象accessKey接口
 */
//获取accessKey
apiFun.object.accessKey.get=(objectId)=>{
  return http.get(`/accessKey/getAccessKeys?objectId=${objectId}`)
}
//删除accessKey
apiFun.object.accessKey.delete=params=>{
  return http.delete(`/accessKey/deleteAccessKey`,params)
}
//创建accessKey
apiFun.object.accessKey.create=(objectId,survivalTime)=>{
  return http.post(`/accessKey/createAccessKey?objectId=${objectId}&survivalTime=${survivalTime}`)
}
/**
 * 对象标签接口
 */

//获取对象标签
apiFun.object.tag.get =(bucketName,objectName) =>{
  return http.get(`/objectTag/getObjectTag?bucketName=${bucketName}&objectName=${objectName}`)
}

//添加对象标签
apiFun.object.tag.add = params =>{
  return http.put(`/objectTag/putObjectTag`,params)
}

//删除对象标签
apiFun.object.tag.delete =(bucketName,objectName,TagId) =>{
  return http.delete(`/objectTag/deleteObjectTag?bucketName=${bucketName}&objectName=${objectName}&TagId=${TagId}`)
}

export default apiFun;