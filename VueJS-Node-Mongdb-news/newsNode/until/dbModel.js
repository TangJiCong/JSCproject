
var db=require("./db");
//用户
var userSchema=new db.Schema({
    username:String,
    password:String,
    avatar:String
},{collection:"user"});
var userModel=db.mongoose.model("user",userSchema);

//新闻
var newsSchema=new db.Schema({
    title:String,
    content:String,
    type:String,
    time:String
},{collection:"news"});
var newsModel=db.mongoose.model("news",newsSchema);

//用户-新闻
var newsUserSchema=new db.Schema({
    newId:String,
    userId:String
},{collection:"newsUser"});
var newsUserModel=db.mongoose.model("newsUser",newsUserSchema);

//类别
var typesSchema=new db.Schema({
    type:String
},{collection:"types"});
var typesModel=db.mongoose.model("types",typesSchema);

module.exports={
   user:userModel,
   news:newsModel,
   newsUser:newsUserModel,
   types:typesModel
}