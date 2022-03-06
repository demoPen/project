import request from './request'
 function uploadImg(data){
  return request({
      url:'/file/innerImg',
      method:'POST',
      data:data,
      headers:{'Content-Type':'multipart/form-data'}
   })
}

 function pageCode(chapterId,render,value){
 return request({
      url:'/file/code',
      method:'POST',
      data:{
        chapterId,
        render,
        value
      }
 })
}

function updateCode(chapterId,render,value){
  return request({
    url:'/file/code',
    method:'PATCH',
    data:{
       chapterId,
       render,
       value
    }
  })
}

function getMdText(chapterId){
  return request({
    url:'file/code',
    method:"GET",
    params:{
      chapterId
    }
  })
}

export {
  uploadImg,
  pageCode,
  getMdText,
  updateCode
}