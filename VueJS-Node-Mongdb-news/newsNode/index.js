var path=require("path");
var bodyParser=require("body-parser")

var router=require("./router/index")

var express=require('express');
var app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");


router(app);

app.listen(2021,function(){
	console.log("running..");
})