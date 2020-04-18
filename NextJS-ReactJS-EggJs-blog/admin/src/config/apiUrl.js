

let ipUrl = 'http://127.0.0.1:7001/admin/' 


let servicePath = {
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    updateArticle:ipUrl + 'updateArticle' ,  //  修改文章第api地址
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
    getArticleList:ipUrl + 'getArticleList' ,  //  文章列表
    delArticle:ipUrl + 'delArticle/' ,  //  删除文章
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
    addType: ipUrl + 'addType' ,//添加文章类别
    updateType: ipUrl + 'updateType' ,//跟新文章类别
    getUserInfo:ipUrl + 'getUserInfo',//获得用户信息
    updateBlogInfo:ipUrl + 'updateBlogInfo',//更新博客信息
    getCommentList:ipUrl + 'getCommentList',//获取评论列表
    delComment:ipUrl + 'delComment/',//删除评论
}
export default servicePath;
