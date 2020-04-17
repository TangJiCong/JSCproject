
module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
    router.get('/default/getListById/:id',controller.default.home.getListById)
    router.get('/default/getUserInfo',controller.default.home.getUserInfo)
    router.get('/default/getLikeTile/:title',controller.default.home.getLikeTile)
    router.get('/default/getPageList/:curPage',controller.default.home.getPageList) 
    router.get('/default/getPageCount',controller.default.home.getPageCount)
    router.post('/default/addComment',controller.default.home.addComment) 
    router.get('/default/getComment/:articleId',controller.default.home.getComment) 
    router.get('/default/getNewsArticle',controller.default.home.getNewsArticle) 
    router.get('/default/getNewsComment',controller.default.home.getNewsComment) 
    router.post('/default/addViewNum',controller.default.home.addViewNum)
}