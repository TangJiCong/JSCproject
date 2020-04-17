

module.exports = app =>{
    const {router,controller} = app
    var adminauth = app.middleware.adminauth()
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    router.get('/admin/index',adminauth,controller.admin.main.index)
    router.get('/admin/getTypeInfo',adminauth ,controller.admin.main.getTypeInfo)
    router.post('/admin/addType',adminauth,controller.admin.main.addType)
    router.post('/admin/updateType',adminauth,controller.admin.main.updateType)
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
    router.get('/admin/getUserInfo',adminauth,controller.admin.main.getUserInfo)
    router.post('/admin/updateBlogInfo',adminauth,controller.admin.main.updateBlogInfo) 
    router.get('/admin/getCommentList',adminauth,controller.admin.main.getCommentList) 
    router.get('/admin/delComment/:id',adminauth,controller.admin.main.delComment)
}