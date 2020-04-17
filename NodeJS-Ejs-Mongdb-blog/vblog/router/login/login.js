var dbmodel = require("../../model/dbmodel");
var dbQuery = require("../../model/mongoQuery");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("login");
});

router.get("/exit", function (req, res) {
    req.session.user = null;
    res.locals.user=null;
    res.redirect("/");
});

router.post("/dologin", function (req, res) {
    dbQuery.findAll(dbmodel.user, function (data) {
        var flag = false;
        var userId = '',
            head_img = '',
            isfabulous = true,
            islike = true,
            email = '';
        for (var i = 0; i < data.length; i++) {
            if (data[i].username == req.body.user && data[i].password == req.body.password) {
                userId = data[i]._id;
                head_img = data[i].head_img;
                email = data[i].email;
                isfabulous = data[i].isfabulous;
                islike = data[i].islike;
                flag = true;
            }
        }
        if (flag) {
            req.session.user = {
                userId: userId,
                username: req.body.user,
                password: req.body.password,
                email: email,
                head_img: head_img,
                isfabulous: isfabulous,
                islike: islike,
            }
            res.locals.user=req.session.user;
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
    });

});

module.exports = router;