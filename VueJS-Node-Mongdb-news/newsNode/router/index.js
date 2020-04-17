
var path = require("path");
var encryption = require("../until/encryption")
var deleteFile = require("../until/deleteFile")
var time=require("../until/totime")
const multer = require("multer")

var dbModel = require("../until/dbModel")
var dbQuery = require("../until/dbQuery")

var mongoose = require('mongoose')
module.exports = function (app) {
    //设置允许跨域访问该服务.
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

    var storages = multer.diskStorage({
        destination: path.join(__dirname, '../', 'public', 'uploadImg'),
        filename: function (req, file, cb) {
            var array = file.originalname.split(".");
            var name = '';
            var extname = "." + array[array.length - 1]
            for (var i = 0; i < array.length - 1; i++) {
                name += array[i]
            }
            var avatarName = name + Date.now() + extname
            console.log(avatarName)
            cb(null, avatarName)
        }
    })
    var uploads = multer({
        storage: storages,
    })
    const arrayFile = uploads.array("avatarArray",12);
    //上传图片
    app.post("/upload",arrayFile,function(req,res){
        console.log(req.files);
        res.json({
            msg:"上传成功",
            status:"200",
            data:req.files
        })
    })

    var storage = multer.diskStorage({
        destination: path.join(__dirname, '../', 'public', 'images'),
        filename: function (req, file, cb) {
            var array = file.originalname.split(".");
            var name = '';
            var extname = "." + array[array.length - 1]
            for (var i = 0; i < array.length - 1; i++) {
                name += array[i]
            }
            var avatarName = name + Date.now() + extname
            console.log(avatarName)
            cb(null, avatarName)
        }
    })
    var upload = multer({
        storage: storage,
    })
    const singleFile = upload.single("avatar");
    //注册
    app.post("/register", singleFile, function (req, res) {
        var checkData = {
            username: req.body.username
        }
        console.log(req.file)
        var filePath = req.file.filename;
        //console.log(req.file);
        dbQuery.findData(dbModel.user, checkData, function (checkUsername) {
            if (checkUsername.length <= 0) {
                //4到16位（字母，数字，下划线，减号）
                var userReg = /^[a-zA-Z]\w{3,15}$/;
                //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
                var pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
                if (!userReg.test(req.body.username)) {
                    deleteFile(filePath)
                    res.send({
                        msg: "用户名格式错误",
                        status: "501"
                    })
                } else if (!pwdReg.test(req.body.password)) {
                    deleteFile(filePath)
                    res.send({
                        msg: "密码安全性太低",
                        status: "502"
                    })
                } else {
                    var defaultAvatar = path.join(__dirname, "../", "public", "images") + "defaultAvatar.jpg"
                    var result = {
                        username: req.body.username,
                        password: encryption(req.body.password),
                        avatar: filePath || defaultAvatar
                    }
                    var registerData = new dbModel.user(result)
                    registerData.save(function(err,userData){
                        if(err){
                            deleteFile(filePath)
                            res.send({
                                msg:"注册异常",
                                status:"200"
                            })
                        }else{
                            res.send({
                                msg: "注册成功",
                                status: "200",
                                data: result
                            })
                        }
                    })

                }
            } else {
                deleteFile(filePath)
                res.send({
                    msg: "该用户名已注册",
                    status: "500"
                })
            }
        })

    })

    //登录
    app.post("/login", function (req, res) {
        var userInfo = {
            username: req.body.username
        }
        dbQuery.findData(dbModel.user, userInfo, function (userData) {
            //console.log(userData);
            if (userData.length <= 0) {
                res.send({
                    msg: "未注册用户名",
                    status: "503"
                })
            } else {
                if (userData[0].password == encryption(req.body.password)) {
                    res.send({
                        msg: "登录成功",
                        status: "200",
                        data: userData[0]
                    })
                } else {
                    res.send({
                        msg: "密码错误",
                        status: "504"
                    })
                }
            }
        })
    })

    //修改用户信息
    app.post("/updateUser",singleFile,function(req,res){
        var filePath = req.file.filename;
        console.log(req.file)
        if(req.body.username && req.body.password &&req.body.updatePwd){

            //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            var pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
            if(!pwdReg.test(req.body.updatePwd)){
                deleteFile(filePath)
                res.send({
                    msg: "密码安全性太低",
                    status: "502"
                })
            }else{
                dbModel.user.find({username:req.body.username,password:encryption(req.body.password)},function(error,userInfo){
                    if(error){
                        deleteFile(filePath)
                        res.send({
                            msg:"修改异常",
                            status:"500"
                        })
                    }else{
                        if(userInfo.length>=1){
                            var defaultAvatar = path.join(__dirname, "../", "public", "images") + "defaultAvatar.jpg"
                            var result = {
                                username: req.body.username,
                                password: encryption(req.body.updatePwd),
                                avatar: filePath || userInfo[0].avatar || defaultAvatar
                            }
                            dbModel.user.update({username:req.body.username},result,function(err){
                                if(err){
                                    deleteFile(filePath)
                                    res.send({
                                        msg:"修改异常",
                                        status:"500"
                                    })
                                }else{
                                    if(userInfo[0].avatar!=defaultAvatar){
                                        deleteFile(userInfo[0].avatar)
                                    }
                                    res.send({
                                        msg:"修改成功",
                                        status:"200"
                                    })
                                }
                            })
                        }else{
                            deleteFile(filePath)
                            res.send({
                                msg:"修改异常",
                                status:"500"
                            })
                        }

                    }
                })
            }
        }else{
            deleteFile(filePath)
            res.send({
                msg:"修改失败",
                status:"500"
            })
        }
    })

    //添加新闻
    app.post("/addNews", function (req, res) {
        if(!req.body.title){
            res.send({
                msg:"标题不能为空",
                status:"601"
            })
        }else if(!req.body.content){
            res.send({
                msg:"内容不能为空",
                status:"602"
            })
        }else if(!req.body.userId){
            res.send({
                msg:"无用户信息",
                status:"604"
            })
        }else{
            var newsMode=new dbModel.news({
                title: req.body.title,
                content: req.body.content,
                type:req.body.type,
                time:time(new Date())
            })
            dbQuery.insertData(newsMode,function(newsData){
                console.log(newsData)
                var newsUserMode=new dbModel.newsUser({
                    newId:newsData._id,
                    userId:req.body.userId
                })
                newsUserMode.save(function(err2,newsUser){
                    if(err2){
                        res.send({
                            msg:"添加失败",
                            status:"605"
                        })
                    }else{
                        res.send({
                            msg:"添加成功",
                            status:"200"
                        })
                    }
                })

            })
        }
    })

    //修改新闻
    app.post("/updateNews", function (req, res) {

        if(req.body.newsId){
            var updateStr={
                _id:req.body.newsId
            }
            var id=req.body.newsId
            dbModel.news.find(updateStr,function(err,newsData){
                if(err){
                    res.send({
                        msg:"该新闻不存在",
                        status:"603"
                    })
                }else{
                    if(newsData.length>=1){
                        var updateData={
                            title:req.body.title,
                            content:req.body.content,
                            type:req.body.type
                        }
                        dbQuery.updateDate(dbModel.news,updateStr,updateData,function(){
                            res.send({
                                msg:"修改成功",
                                status:"200"
                            })
                        })
                    }else{
                        res.send({
                            msg:"该新闻不存在",
                            status:"603"
                        })
                    }
                }
            })
        }else{
            res.send({
                msg:"无此操作",
                status:"602"
            })
        }
    })


    //删除新闻
    app.post("/deleteNews", function (req, res) {
        if(req.body.newsId){
            var deleteStr={
                _id:req.body.newsId
            }
            dbModel.news.find(deleteStr,function(err,newsData){
                if(err){
                    res.send({
                        msg:"该新闻不存在",
                        status:"603"
                    })
                }else{
                    if(newsData.length>=1){
                        dbQuery.delData(dbModel.news,deleteStr,function(){
                            dbModel.newsUser.remove({newId:req.body.newsId},function(error,dele){
                                if(error){
                                    res.send({
                                        msg:"删除异常",
                                        status:"606"
                                    })
                                }else{
                                    res.send({
                                        msg:"删除成功",
                                        status:"200"
                                    })
                                }
                            })
                        })
                    }else{
                        res.send({
                            msg:"该新闻不存在",
                            status:"603"
                        })
                    }
                }
            })
        }else{
            res.send({
                msg:"无此操作",
                status:"602"
            })
        }
    })

    //查询新闻总数数
    app.get("/findNewsNum",function(req,res){
        dbModel.news.find(function(err,data){
            if(err){
                res.send({
                    msg:"查询异常",
                    status:"705",
                })
            }else{
                res.send({
                    msg:"查询成功",
                    status:"200",
                    data:data.length
                })
            }
        })
    })

    //查询新闻列表
    app.post("/findAllNews", function (req, res) {
        if(req.body.page){
            var num=parseInt(req.body.page)-1;
            dbModel.news.find().sort({'_id':-1}).skip(num * 10).limit(10).exec(function(err,newsData){
                if(err){
                    res.send({
                        msg:"该新闻不存在",
                        status:"603"
                    })
                }else{
                    res.send({
                        msg:"查询成功",
                        status:"200",
                        data:newsData
                    })
                }
            })
        }else{
            res.send({
                msg:"无此操作",
                status:"602"
            })
        }
    })

    //查询详情新闻
    app.post("/findIdOneNews", function (req, res) {
        if(req.body.newsId){
            var findIdData={
                _id:req.body.newsId
            }
            dbModel.news.find(findIdData,function(err,newsData){
                if(err){
                    res.send({
                        msg:"该新闻不存在",
                        status:"603"
                    })
                }else{
                    if(newsData.length>=1){
                        res.send({
                            msg:"查询成功",
                            status:"200",
                            data:newsData
                        })
                    }else{
                        res.send({
                            msg:"该新闻不存在",
                            status:"603"
                        })
                    }
                }
            })
        }else{
            res.send({
                msg:"无此操作",
                status:"602"
            })
        }
    })

    //查询个人所有新闻
    app.post("/findIdNews", function (req, res) {
        if(req.body.userId){
            var userInfo={
                userId:req.body.userId
            }
            dbModel.newsUser.find(userInfo,function(err,data){
                if(err){
                    res.send({
                        msg:"该新闻不存在",
                        status:"603"
                    })
                }else{
                    if(data.length>=1){
                        res.send({
                            msg:"查询成功",
                            status:"200",
                            data:data
                        })
                    }else{
                        res.send({
                            msg:"该新闻不存在",
                            status:"603"
                        })
                    }
                }
            })
        }else{
            res.send({
                msg:"无此操作",
                status:"602"
            })
        }
    })

    //查询新闻类别
    app.get("/findType", function (req, res) {
        dbModel.types.find(function(err,data){
            if(err){
                res.send({
                    msg:"查询失败",
                    status:"701"
                })
            }else{
                if(data.length>=1){
                    res.send({
                        msg:"查询成功",
                        status:"200",
                        data:data
                    })
                }else{
                    res.send({
                        msg:"查询失败",
                        status:"701"
                    })
                }
            }
        })
    })

    //删除新闻类别
    app.post("/deleteType", function (req, res) {
        if(req.body.type){
            var typeStr={
                type:req.body.type
            }
            dbModel.types.find(typeStr,function(err,data){
                if(err){
                    res.send({
                        msg:"删除失败",
                        status:"702"
                    })
                }else{
                    if(data.length>=1){
                        dbModel.types.remove(typeStr,function(err2,data2){
                            if(err2){
                                res.send({
                                    msg:"删除失败",
                                    status:"702"
                                })
                            }else{
                                res.send({
                                    msg:"删除成功",
                                    status:"200"
                                })
                            }
                        })
                    }else{
                        res.send({
                            msg:"该类别不存在",
                            status:"703"
                        })
                    }
                }
            })
        }else{
            res.send({
                msg:"查询失败",
                status:"701"
            })
        }
    })

    //添加新闻类别
    app.post("/addType", function (req, res) {
        if(req.body.type){
            var typeStr={
                type:req.body.type
            }
            dbModel.types.find(typeStr,function(err,data){
                if(err){
                    res.send({
                        msg:"添加失败",
                        status:"705"
                    })
                }else{
                    if(data.length>=1){
                        res.send({
                            msg:"该类别已存在",
                            status:"706"
                        })
                    }else{
                        var typeData=new dbModel.types({
                            type:req.body.type
                        })
                        typeData.save(typeData,function(err2,data2){
                            if(err2){
                                res.send({
                                    msg:"添加失败",
                                    status:"705"
                                })
                            }else{
                                res.send({
                                    msg:"添加成功",
                                    status:"200"
                                })
                            }
                        })
                    }
                }
            })
        }else{
            res.send({
                msg:"查询失败",
                status:"701"
            })
        }
    })

    //修改新闻类别
    app.post("/updateType",function(req,res){
        if(req.body.typeId){

            dbModel.types.update({_id:req.body.typeId},{type:req.body.type},function(err){
                if(err){
                    res.send({
                        msg:"修改失败",
                        status:"500"
                    })
                }else{
                    res.send({
                        msg:"修改成功",
                        status:"200"
                    })
                }
            })
        }else{
            res.send({
                msg:"无此操作",
                status:"602"
            })
        }
    })
}