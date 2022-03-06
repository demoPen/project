const errorTypes = require('../constants/error-type')

const errorHandler = async (error,ctx) =>{
   let status,message
   switch(error.message){
     case errorTypes.USER_NAME_OR_PASSWORD_ERROR:
       status = 401;
       message = errorTypes.USER_NAME_OR_PASSWORD_ERROR;
      break;
     case errorTypes.TOKEN_AUTHENTICATION_FAILED:
       status = 401;
       message = errorTypes.TOKEN_AUTHENTICATION_FAILED;
       break;
       case errorTypes.USER_NAME_IS_NOT_EXIST:  
       status =400;
       message = errorTypes.USER_NAME_IS_NOT_EXIST;  
       case errorTypes.CHAPTER_NAME_DOES_NOT_SAME:
         status = 400;
         message = errorTypes.CHAPTER_NAME_DOES_NOT_SAME              
     default:
        status = 400 
   }
   ctx.status = status;
   ctx.body = message;
};
module.exports = errorHandler