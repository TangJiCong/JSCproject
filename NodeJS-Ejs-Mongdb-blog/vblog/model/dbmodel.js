
var db=require("./db");


//用户信息映射和模型
var userSchema=new db.Schema({
    username:{type:String},
    password:{type:String},
    email:{type:String},
    head_img:{type:String},
    isfabulous:Boolean,
    islike:Boolean,
    messageId:[{type:db.Schema.Types.ObjectId,ref:"blog"}],
    markId:[{type:db.Schema.Types.ObjectId,ref:"mess"}],
},{collection:"user"});
var usermodel=db.mongoose.model("user",userSchema);

//评论信息的映射和模型
var markSchema=new db.Schema({
    markmess:{type:String},
    mark_date:{type:String},
    userId:{type:db.Schema.Types.ObjectId,ref:"user"},
    blogId:{type:db.Schema.Types.ObjectId,ref:"blog"},
},{collection:"mess"});
var markmodel=db.mongoose.model("mess",markSchema);

//用户博客信息映射和模型
var blogSchema=new db.Schema({
    text:{type:String},
    blog_img:{type:String},
    blog_date:{type:String},
    fabulous:Number,
    like:Number,
    blog_userId:{type:db.Schema.Types.ObjectId,ref:"user"},
    blog_markId:[{type:db.Schema.Types.ObjectId,ref:"mess"}],
},{collection:"blog"});
var blogmodel=db.mongoose.model("blog",blogSchema);

module.exports={
    user:usermodel,
    mess:markmodel,
    blog:blogmodel
}