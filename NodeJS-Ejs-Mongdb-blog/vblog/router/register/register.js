
var dbmodel=require("../../model/dbmodel");
var dbQuery=require("../../model/mongoQuery");
var express=require("express");
var router=express.Router();
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

router.get("/",function(req,res){
    res.render("register");
});

router.post("/doSave",upload.single("imgfile"),function(req,res){
    dbQuery.findAll(dbmodel.user, function (datas) {
        var flag = true;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].username == req.body.user) {
                flag = false;
            }
        }
        if (flag) {
            var userdata = new dbmodel.user({
                username: req.body.user,
                password: req.body.password,
                email: req.body.email,
                head_img: fileN||'img/defauedthead.jpg',
                isfabulous: true,
                islike: true,
            });
            dbQuery.insertData(userdata, function (data) {
                res.render('login');
            });
        } else {
            res.redirect("/register");
        }
    });
});


module.exports=router;