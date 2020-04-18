
let ipUrl = 'http://127.0.0.1:7001/default/' 

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo:ipUrl + 'getTypeInfo',  // 获得文章类别
    getListById:ipUrl + 'getListById/',  // 根据类别ID获得文章列表
    getUserInfo:ipUrl + 'getUserInfo',//获得博主信息
    getLikeTile:ipUrl + 'getLikeTile/',//关键字查询
    getPageList:ipUrl + 'getPageList/',//分页查询
    getPageCount:ipUrl + 'getPageCount',//获得列表总数
    addComment:ipUrl + 'addComment',//添加评论
    getComment:ipUrl + 'getComment/',//获得详情评论列表
    getNewsArticle:ipUrl + 'getNewsArticle',//获得最近文章
    getNewsComment:ipUrl + 'getNewsComment',//获得最近评论
    addViewNum:ipUrl + 'addViewNum',//增加阅读数
}
export default servicePath;
