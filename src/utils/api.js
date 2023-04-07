import http from './axios.js'

let apiFun = {
  //自定义对象，命名隔离，消除重名影响
  user: {},
  bucket: {
    authorize: {},
  },
  object: {
    tag: {},
  },
  test: {},
  file:{},
};

//测试接口（按需添加，可删）



//前后端链接测试
apiFun.test.test = () => {
  return http.get('/test/demo')
}

/**
 * 文件接口
 * */

//分片上传申请
apiFun.file.createChunkToken = (params) => {
  return http.post('/ossObject/createChunkToken?bucketName=' + params.bucketName + '&objectName=' + params.fileName + '&etag=' + params.etag + '&size=' + params.size + '&chunks=' + params.chunks)
}

//合并文件申请
apiFun.file.mergefile = (params) => {
  return http.post('/ossObject/merge?bucketName=' + params.bucketName + '&blockToken=' + params.blockToken)
}

//小文件上传
apiFun.file.smallFile = (params) =>{
  return http.post('/ossObject/putSmallObject?bucketName='+params.bucketName+'&objectName='+params.objectName+'&etag='+params.etag+'&parentObjectId='+params.parentObjectId+'&objectAcl='+params.objectAcl)
}

//测试文件预览
apiFun.test.fileView = () => {
  return http.get('/test/downLoad')
}

//测试文件MD5
apiFun.test.getMd5 = () => {
  return http.get('/test/getMd5')
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
  return http.post('/user/login', params)
}

//注册
apiFun.enroll = params => {
  return http.post('/user/register', params)
}

//创建RAM用户
apiFun.newRAM = params => {
  return http.post('/user/createRam', params)
}

/**
 * bucket接口
 *  */

//获取桶信息
apiFun.bucket.get = (bucketName) => {
  return http.get('/bucket/getBucketInfo?bucketName=' + bucketName)
}

//获取桶列表
apiFun.bucket.getList = (pageNum,size,key) => {
  return http.get('/bucket/listBuckets?pageNum='+pageNum+'&size='+size+'&key='+key)
}

//创建一个桶
apiFun.bucket.create = params => {
  return http.post('/bucket/createBucket', params)
}

//删除一个桶
apiFun.bucket.delete = (bucketName) => {
  return http.delete('/bucket/deleteBucket?bucketName='+bucketName)
}

//用户收藏一个桶
apiFun.bucket.collect = (name) => {
  return http.put('/favorite/putUserFavorite?bucketName=' + name)
}

//用户删除一个桶
apiFun.bucket.userDelete = (name) => {
  return http.delete('/favorite/deleteUserFavorite?bucketName=' + name)
}
//获取用户收藏的桶
apiFun.bucket.getCollect = () => {
  return http.get('/favorite/getUserFavorite')
}

/**
 * bucket授权策略接口
 *  */

//添加/更新一个bucket授权策略
apiFun.bucket.authorize.addOrUpdate = (bucketName, authorizeId) => {
  return http.post('/authorize/putAuthorize?bucketName=' + bucketName + '&authorizeId=' + authorizeId)
}

//获取权限策略列表
apiFun.bucket.authorize.getList = (bucketName) => {
  return http.get('/authorize/listAuthorizes?bucketName=' + bucketName)
}

//删除一个授权策略
apiFun.bucket.authorize.delete = (bucketName, authorizeId) => {
  return http.delete('/authorize/deleteAuthorize?bucketName=' + bucketName + '&authorizeId=' + authorizeId)
}

//更新bucketAcl(1:公共读写；2：RAM读写；3：公共读；4：RAM写；5：私有)
apiFun.bucket.updateBucketAcl = (bucketName,bucketAcl) =>{
  return http.put('/bucket/updateBucketAcl?bucketName='+bucketName+'&bucketAcl='+bucketAcl)
}

//更新Secret服务器端加密(1:SM4加密；2：AES256加密；null：不加密)
apiFun.bucket.updateSecret = (bucketName,secret) =>{
  return http.put('/bucket/updateSecret?bucketName='+bucketName+'&secret='+secret)
}

//从桶中获取一个对象的元数据
apiFun.object.metadata = (objectName, bucketName) => {
  return http.get('/ossObject/getObjectInfo?objectName=' + objectName + '&bucketName=' + bucketName)
}

/**
 * 对象接口
 *  */
//获取用户收藏的桶

//从桶中获取一个对象的元数据
apiFun.object.metadata = (objectName, bucketName) => {
  return http.get('/ossObject/getObjectInfo?objectName=' + objectName + '&bucketName=' + bucketName)
}

//从桶中获取一个对象的真实数据
apiFun.object.dataInfo = (objectName, bucketName) => {
  return http.get('/ossObject/getObject?objectName=' + objectName + '&bucketName=' + bucketName)
}

//在桶中添加一个文件夹
apiFun.object.add = (bucketName, objectName, parentObject) => {
  return http.put('/ossObject/putFolder?bucketName=' + bucketName + '&objectName=' + objectName + '&parentObjectId=' + parentObject)
}

//在桶中添加一个对象[小文件]
apiFun.object.addSmall = (bucketName, objectName, md5, parentObject) => {
  return http.put('/ossObject/putSmallObject?bucketName=' + bucketName + '&objectName=' + objectName + '&md5=' + md5 + '&parentObjectId=' + parentObject)
}

//在桶中添加一个对象[大文件]
apiFun.object.addBig = (bucketName, objectName, md5, size, chunks, chunk, parentObject) => {
  return http.put('/ossObject/putBigObject?bucketName=' + bucketName + '&objectName=' + objectName + '&md5=' + md5 + '&size=' + size + '&chunks=' + chunks + '&chunk=' + chunk + '&parentObjectId=' + parentObject)
}

//从桶中删除一个对象
apiFun.object.delete = (bucketName, objectName) => {
  return http.delete('/ossObject/deleteObject?bucketName=' + bucketName + '&ObjectName=' + objectName)
}

//获取对象列表
apiFun.object.objectList = (bucketName, key, pagenum, size, parentObjectId,isImages) => {
  return http.get('/ossObject/listObjects?bucketName=' + bucketName + '&key=' + key + '&pagenum=' + pagenum + '&size=' + size + '&parentObjectId=' + parentObjectId +'&isImages='+isImages)
}

/**
 * 对象标签接口
 */

//获取对象标签
apiFun.object.tag.get = (objectName) => {
  return http.get('/objectTag/getObjectTag?objectName=' + objectName)
}

//添加对象标签
apiFun.object.tag.add = (objectName) => {
  return http.put('/objectTag/putObjectTag?objectName=' + objectName)
}

//删除对象标签
apiFun.object.tag.delete = (objectName, key) => {
  return http.delete('/objectTag/deleteObjectTag?objectName=' + objectName + '&key=' + key)
}


//获取bucket内碎片列表
apiFun.bucket.getFragment =(bucketName) =>{
  return http.get('/fragment/list?bucketName='+bucketName)
}

//删除bucket内碎片
apiFun.bucket.deleteFragment =(bucketName,blockToken) =>{
  return http.delete('/fragment?bucketName='+bucketName+'&blockToken='+blockToken)
}

//创建RAM用户
apiFun.user.createRam =(params) =>{
  return http.post('/user/createRam',params)
}

//获取子用户列表
apiFun.user.getSubUsers =(keyword,pageNum,size) =>{
  return http.get('/user/getSubUsers?keyword='+keyword+'&pageNum='+pageNum+'&size='+size)
}

//删除子用户
apiFun.user.deleteSubUser =(userId) =>{
  return http.delete('/user/deleteSubUser?userId='+userId)
}

export default apiFun;