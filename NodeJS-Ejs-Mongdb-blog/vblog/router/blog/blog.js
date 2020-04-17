var dbmodel = require("../../model/dbmodel");
var dbQuery = require("../../model/mongoQuery");
var totime=require("../../model/totime")
var express = require("express");
var router = express.Router();
var multer = require('multer');

var fileN = '';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
        var imgname = (file.originalname).split(".");
        var suffix = imgname[imgname.length - 1];
        fileN = Date.now() + "." + suffix
        cb(null, fileN);
    }
});
var upload = multer({
    storage: storage
});
//返回博客发布页面
router.get("/", function (req, res) {
    if (req.session.user) {
        var user=req.session.user;
        res.render("postblog",{usersession:user});
    }else{
        res.redirect("/login");
    }
});
//处理发布博客
router.post("/doBlog", upload.single('blogfile'), function (req, res) {
    var date=totime(new Date());
    var blogdata = new dbmodel.blog({
        text: req.body.blogtext,
        blog_img: fileN,
        blog_date: date,
        fabulous:0,
        like:0,
        blog_userId:req.session.user.userId
    });
    dbQuery.insertData(blogdata, function (blogdata) {
        dbQuery.findData(dbmodel.blog,{blog_userId:req.session.user.userId},function(blog){
            var att=[];
            for(var i=0;i<blog.length;i++){
                att.push(blog[i]._id);
            }
            dbQuery.updateIdDate(dbmodel.user,req.session.user.userId,{messageId:att},function(userdata){
                res.redirect("/");
            });
        });
    });
})
//展示个人全部博客
router.get("/showSingleBlog/:id", function (req, res) {
    dbQuery.findPopulate(dbmodel.blog,{blog_userId:req.params.id},"blog_userId blog_markId",function(blog){
        var user=req.session.user;
        res.render("singleblog",{result:blog,usersession:user});
    });
})

//展示我的博客
router.get("/showMyBlog/:id",function(req,res){
    dbQuery.findPopulate(dbmodel.blog,{blog_userId:req.params.id},"blog_userId blog_markId",function(blog){
        var user=req.session.user;
        res.render("myblog",{result:blog,usersession:user});
    });
});

//删除博客
router.get("/delblog/:id",function(req,res){
    dbQuery.delIdData(dbmodel.blog,req.params.id,function(blog){
        res.redirect("/blog/showMyBlog/req.session.user.userId");
    });
});

module.exports = router;