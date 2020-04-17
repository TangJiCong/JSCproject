

var multer = require('multer');
var fileN='';
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/image");
    },
    filename:function(req,file,cb){
        var imgname=(file.originalname).split(".");
        var suffix=imgname[imgname.length-1];
        fileN=Date.now()+"."+suffix
        cb(null,fileN);
    }
});
var upload=multer({storage:storage});
module.exports={
    fileN:fileN,
    upload:upload
}