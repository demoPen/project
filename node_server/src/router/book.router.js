const Router = require("koa-router");

const {
  coverHandle,
  createFileTable,
  chapterInfoTable,
  innerImgContent,
  imageTable,
  createCodeTable
} = require('../middleware/book.middleware');
const {
  verityToken
} = require('../middleware/auth.middleware')

const {
  saveCoverInfo,
  saveBookInfo,
  getBookInfo,
  getbookCover,
  deleteBook,
  updateBook,
  addChapter,
  getChapterInfo,
  updateChapter,
  deleteChapter,
  uploadInnerImg,
  getInnerImg,
  saveCode,
  getCodeHtml,
  updateCode
} = require("../controller/file.controller")
const bookRouter = new Router({
  prefix: '/file'
})
bookRouter.post('/book', createFileTable, coverHandle, saveCoverInfo) ;//保存图片的地址
bookRouter.post("/bookInfo", verityToken, saveBookInfo);
bookRouter.get('/bookContent',getBookInfo);
bookRouter.get('/uploads/:iid',getbookCover);
bookRouter.delete('/book/:id',verityToken,deleteBook);
bookRouter.patch('/book/:id',verityToken,updateBook);

bookRouter.post('/chapter/:id',verityToken,chapterInfoTable,addChapter);
bookRouter.get("/chapter/:id",verityToken,getChapterInfo);
bookRouter.patch("/chapter/:id",verityToken,updateChapter);
bookRouter.delete("/chapter/:id",verityToken,deleteChapter)

bookRouter.post('/innerImg',innerImgContent,uploadInnerImg)
bookRouter.get('/image/:id',getInnerImg)
bookRouter.post('/code',saveCode);
bookRouter.get('/code',createCodeTable,getCodeHtml)
bookRouter.patch('/code',updateCode)

module.exports = bookRouter; 