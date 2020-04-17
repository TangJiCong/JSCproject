

var fs=require("fs")
var path=require("path")

module.exports=function(filePath){
    var result= path.join(__dirname, "../", "public", "images") +"/"+ filePath
    fs.unlink(result, function(err) {
        if (err) {
            throw err;
         }
         console.log(filePath+'成功删除了');
    });
}
