//引入模块
var express=require("express");
var app=express();
var path=require("path");
var bodyparse=require("body-parser");
var router=require("./router/routers");
var session=require("express-session");

//使用中间件配置属性
app.use(bodyparse.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(session({secret:"rabbit"}))
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//启动路由
router(app);

//监听端口
app.listen(8080,function(){
    console.log("running...");
});