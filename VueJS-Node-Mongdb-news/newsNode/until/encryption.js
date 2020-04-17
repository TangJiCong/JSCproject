

var crypto=require("crypto");
module.exports=function(message){
    var md5 = crypto.createHash('md5');
    var digest = md5.update(message, 'utf8').digest('hex');
    return digest;
}