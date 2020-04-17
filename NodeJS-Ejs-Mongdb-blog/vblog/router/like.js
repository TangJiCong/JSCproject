
var dbmodel = require("../model/dbmodel");
var dbQuery = require("../model/mongoQuery");
var express=require("express");
var router=express.Router();

router.get("/addlike/:id",function(req,res){
    if(req.session){
        dbQuery.findData(dbmodel.blog,{_id:req.params.id},function(blog){
            dbQuery.findData(dbmodel.user,{_id:req.session.user.userId},function(user){
                if(user[0].isfabulous){
                    dbQuery.updateIdDate(dbmodel.blog,req.params.id,{fabulous: blog[0].fabulous+1},function(){
                        dbQuery.updateIdDate(dbmodel.user,req.session.user.userId,{isfabulous:false},function(){
                            res.redirect("/");
                        });
                    });
                }else{
                    dbQuery.updateIdDate(dbmodel.blog,req.params.id,{fabulous: blog[0].fabulous-1},function(){
                        dbQuery.updateIdDate(dbmodel.user,req.session.user.userId,{isfabulous:true},function(){
                            res.redirect("/");
                        });
                    });
                }
            });
        });
    }else{
        res.redirect("/login");
    }
});

router.get("/addlove/:id",function(req,res){
    if(req.session){
        dbQuery.findData(dbmodel.blog,{_id:req.params.id},function(blog){
            dbQuery.findData(dbmodel.user,{_id:req.session.user.userId},function(user){
                if(user[0].islike){
                    dbQuery.updateIdDate(dbmodel.blog,req.params.id,{like: blog[0].like+1},function(){
                        dbQuery.updateIdDate(dbmodel.user,req.session.user.userId,{islike:false},function(){
                            res.redirect("/");
                        });
                    });
                }else{
                    dbQuery.updateIdDate(dbmodel.blog,req.params.id,{like: blog[0].like-1},function(){
                        dbQuery.updateIdDate(dbmodel.user,req.session.user.userId,{islike:true},function(){
                            res.redirect("/");
                        });
                    });
                }
            });
        });
    }else{
        res.redirect("/login");
    }
});


module.exports=router;