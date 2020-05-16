const multer= require('multer');
var maxSize = 1  * 1000 *1000;
module.exports= multer({
    storage:multer.diskStorage({}),
    limits: { fileSize: maxSize },

        fileFilter:(req,file,cb)=>{
            cb(null,true);
        }

})
