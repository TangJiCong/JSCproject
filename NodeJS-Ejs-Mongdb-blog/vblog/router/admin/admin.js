

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
    if (req.session.user) {
        var users=req.session.user;
        dbQuery.findData(dbmodel.user,{_id:req.session.user.userId},function(user){
            res.render("blogadmin",{result:user,usersession:users});
        });
    } else {
        res.redirect("/login");
    }
});

router.get("/adminUpdate/:id",function(req,res){
    dbQuery.findData(dbmodel.user,{_id:req.params.id},function(data){
        var user={
            _id:req.params.id,
            username: data[0].username,
            password: data[0].password,
            email: data[0].email,
            head_img: data[0].head_img,
        }
        var user=req.session.user;
        res.render("blogupdate",{result:user,usersession:user})
    });
});

router.post("/adminDoUpdate",upload.single("updatefile"),function(req,res){
    var update = {
        username: req.body.updatename,
        password: req.body.updatepwd,
        email: req.body.updateemail,
        head_img: fileN,
    }
    req.session.user={
        userId: req.body.update_id,
        username: req.body.updatename,
        password: req.body.updatepwd,
        email: req.body.updateemail,
        head_img: fileN
    }
    dbQuery.updateIdDate(dbmodel.user, req.body.update_id, update, function (user) {
        res.redirect("/admin");
    });
})

router.get("/adminLogoff/:id",function(req,res){
    dbQuery.delIdData(dbmodel.user, req.params.id, function (data) {
        res.redirect("/removelogin");
    });
})

module.exports=router;