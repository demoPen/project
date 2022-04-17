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
function getArticleCode(articleId){
  return request({
    url:'/article/code',
    method:'GET',
    params:{
     articleId
    }
  })
}
function saveArticle(articleId,render,value){
  return request({
    url:'/article/code',
    method:'POST',
    data:{
      articleId,
      render,
      value
    }
})
}

function updateArticle(articleId,render,value){
  return request({
    url:'/article/code/article',
    method:'PATCH',
    data:{
       articleId,
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
  updateCode,
  getArticleCode,
  saveArticle,
  updateArticle
}