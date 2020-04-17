var dbmodel = require("../model/dbmodel");
var dbQuery = require("../model/mongoQuery");

var register = require("./register/register");
var login = require("./login/login");
var admin = require("./admin/admin");
var blog = require("./blog/blog");
var mark = require("./mark/mark");
var like = require("./like");

module.exports = function (app) {
    //返回首页
    app.get("/", function (req, res) {
        var query = dbmodel.blog.find({});
        query.populate({
            path: 'blog_markId blog_userId',
            populate: {
                path: 'userId'
            }
        });
        query.exec(function (err, docs) {
            if (req.session.user) {
                //ajax渲染用(index2),ejs渲染用(index)
                res.render("index2", {
                    result: {
                        blogs: docs,
                        usersession: req.session.user
                    }
                });
            } else {
                //ajax渲染用(index2),ejs渲染用(index)
                res.render("index2", {
                    result: {
                        blogs: docs
                    }
                });
            }
        });
    });
    //处理登录业务
    app.use("/login", login);
    //处理注册业务
    app.use("/register", register);
    //管理用户信息
    app.use("/admin", admin);
    //处理评论业务
    app.use("/postmark", mark);
    //处理博客业务
    app.use("/blog", blog);
    //点赞和收藏
    app.use("/like",like);
    //用于测试ajax(index2.ejs);
    app.post("/test",function(req,res){
        dbmodel.blog.find({}).sort({_id:-1}).populate({
            path: 'blog_markId blog_userId',
            populate: {
                path: 'userId'
            }
        }).exec(function (err, docs) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader("Access-Control-Allow-Methods","GET,POST");
            res.send({blogs: docs});
        });
    });
    //设置404错误
    app.use(function(req,res){
        res.render("error404");
    });
}