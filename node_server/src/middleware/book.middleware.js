const BookService = require("../service/book.service");
const Multer = require("koa-multer");
const bookService = require("../service/book.service");

const createFileTable = async (ctx, next) => {
  await BookService.createBookTable();

  await next();
};//创建文件的数据表

const chapterInfoTable = async (ctx,next) =>{
  await BookService.createChapter()
  await next()
}

const createCodeTable = async (ctx,next) =>{
  await bookService.createCode();
  await next()
}

// const imageTable = async (ctx,next) =>{
//   await bookService.createInnerImg()
//   await next()
// }

const coverUploads = Multer({
  dest: "./uploads",
});
const innerImgUploads = Multer({
  dest:'./uploads/images'
})
const coverHandle = coverUploads.single("cover"); //封面的图片
const innerImgContent = innerImgUploads.single('image')//文章里的图片



module.exports = {
  coverHandle,
  createFileTable,
  chapterInfoTable,
  // imageTable,
  innerImgContent,
  createCodeTable
};
