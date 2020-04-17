

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/newsData');
var db = mongoose.connection;
db.on("error", function () {
    console.log("数据库连接失败");
});
db.on("connected",function(){
    console.log("数据库连接成功");
});
db.on("close",function(){
    console.log("数据库已关闭");
});
db.once("open", function () {
    console.log("数据库打开成功");
});

var Schema=mongoose.Schema;

module.exports={
    Schema:Schema,
    mongoose:mongoose
}