const fileServer = require("../service/book.service");
const errorTypes = require("../constants/error-type")

const fs = require("fs");
class Filecontroller {
  async saveCoverInfo(ctx, next) {
    let data = {
      name: ctx.req.file.filename,
      file: `/uploads/${ctx.req.file.filename}`,
    };
    ctx.body = data;
  };

  async saveBookInfo(ctx, next) {
    const { id } = ctx.result;
    const { name, order, img } = ctx.request.body;
    await fileServer.bookBasicInfo(name, order, id, img);
    ctx.body = "添加书籍成功";
  };
  async getBookInfo(ctx, next) {
    const res = await fileServer.getBook();
    ctx.body = res;
  };
  async getbookCover(ctx, next) {
    const filename = ctx.params.iid;
    ctx.response.set("content-type", "image/jpeg","image/png");

    ctx.body = fs.createReadStream(`./uploads/${filename}`);
  };
  async deleteBook(ctx,next){
    const { id } = ctx.params;
    await fileServer.deleteBookById(id);
    ctx.body = `删除书籍成功`
  };

  async updateBook(ctx,next){
    const { id } = ctx.params;
    const { img,name,order } = ctx.request.body;
    await fileServer.updateBookInfo(name,order,img,id)
    ctx.body ='更新书籍成功'
  };

  async addChapter(ctx,next){
    const { id } = ctx.params;
    const info = ctx.request.body;
    const { name,orderBy } = info;
    const IssHaveName = await fileServer.isSameName(name,id);
    if(IssHaveName.length!==0){
      const error = new Error(errorTypes.CHAPTER_NAME_DOES_NOT_SAME)
      return ctx.app.emit('error',error,ctx)
    }else{
      const res =  await fileServer.saveChapterInfo(name,orderBy,id);
      if (res) ctx.body = `添加章节成功`

    }
  };

  async getChapterInfo(ctx,next){
    const { id } = ctx.params;
    const result = await fileServer.getChapterById(id)
    ctx.body = result
  };

  async updateChapter(ctx,next){
    const { id } = ctx.params;
    const info = ctx.request.body;
    const { name } = info;
    console.log(info);
    await fileServer.updateChapterInfo(name,id)
    ctx.body = `修改章节成功`
  };

  async deleteChapter(ctx,next){
  const { id } = ctx.params;
   await fileServer.deleteChapterById(id);
   ctx.body = '删除章节成功'
  };

  async uploadInnerImg(ctx,next){//上传markdown文档里的文件
    const { filename ,mimetype} = ctx.req.file;
    // await fileServer.insertImginfo()
    ctx.body = `http://localhost:9000/file/image/${filename}`
    // ctx.body = 'cg'
  }

  async getInnerImg(ctx,next){
   const id = ctx.params.id;
   ctx.response.set("content-type", "image/jpeg","image/png");

   ctx.body = fs.createReadStream(`./uploads/images/${id}`);
  }

  async saveCode(ctx,next){
    const {chapterId,render,value}= ctx.request.body;
    await fileServer.saveHtml(chapterId,render,value);
    ctx.body = '保存成功'
  };
  async getCodeHtml(ctx,next){
    const {chapterId} = ctx.query;
   const result =  await fileServer.getHtml(chapterId)
   ctx.body = result
  };

  async updateCode(ctx,next){
    const {chapterId,render,value}= ctx.request.body;
    await fileServer.updateHtml(chapterId,render,value);
    ctx.body = `修改成功`
  }
}
module.exports = new Filecontroller();
