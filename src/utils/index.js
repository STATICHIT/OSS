export function localGet (key) {
    const value = window.localStorage.getItem(key)
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
      return value
    }
  }
  
  export function localSet (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  
  export function localRemove (key) {
    window.localStorage.removeItem(key)
  }

  // 单张图片上传
export const uploadImgServer = "http://localhost:8080/users/uploadImg"

//多张图片上传
export const uploadImgsServer = "http://localhost:8080/users/uploadImgs"


