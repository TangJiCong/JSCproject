var dbmodel = require("../../model/dbmodel");
var dbQuery = require("../../model/mongoQuery");
var totime = require("../../model/totime");
var express = require("express");
var router = express.Router();

//处理发布博客留言业务
router.post("/", function (req, res) {
    var date=totime(new Date());
    var markdata = new dbmodel.mess({
        markmess: req.body.desc,
        mark_date: date,
        userId: req.session.user.userId,
        blogId: req.body.mark_useid,
    });
    //先保存博客留言后再更新与留言表(mess)相关联的其他表字段
    dbQuery.insertData(markdata, function (data) {
        //更新blog表里的blog_markId字段
        dbQuery.findData(dbmodel.mess, {
            blogId: req.body.mark_useid
        }, function (mark) {
            var attrBlog = [];
            for (var i = 0; i < mark.length; i++) {
                attrBlog.push(mark[i]._id);
            }
            dbQuery.updateIdDate(dbmodel.blog, req.body.mark_useid, {
                blog_markId: attrBlog
            }, function (blog) {
                //更新user表里的markId字段
                dbQuery.findData(dbmodel.mess, {
                    userId: req.session.user.userId
                }, function (marks) {
                    var attrUse = [];
                    for (var i = 0; i < marks.length; i++) {
                        attrUse.push(marks[i]._id);
                    }
                    dbQuery.updateIdDate(dbmodel.user, req.session.user.userId, {
                        markId: attrUse
                    }, function (user) {
                        res.redirect("/");
                    });
                })
            });
        });
    });
})

module.exports = router;