

'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
        //首页的文章列表数据
        this.ctx.body='api'
    }
    //判断用户名密码是否正确
    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"

        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            let openId=new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            this.ctx.body={'data':'登录成功','openId':openId,'userInfo':res}

        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }
    //博主信息
    async getUserInfo(){
        const resType = await this.app.mysql.select('user_info')
        this.ctx.body={data:resType}
    }
    //后台文章分类信息
    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body={data:resType}
    }
    //添加类别
    async addType(){
        let tmpData=this.ctx.request.body
        const result =await this.app.mysql.insert('type',tmpData)
        const insertSuccess = result.affectedRows ===1
        const insertId = result.insertId
        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
    // 修改类别
    async updateType(){
        let tmpType= this.ctx.request.body
        const result = await this.app.mysql.update('type', tmpType);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }
    }
    //添加文章
    async addArticle(){

        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
    //修改博客信息
    async updateBlogInfo(){
        let tmpInfo= this.ctx.request.body
        const result = await this.app.mysql.update('user_info', tmpInfo);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }
    } 
    //修改文章
    async updateArticle(){
        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }
    }  
    //获得文章列表
    async getArticleList(){

        let sql = 'SELECT article.id as id,'+
                    'article.title as title,'+
                    'article.introduce as introduce,'+
                    'article.view_count as view_count,'+
                    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                    'type.typeName as typeName '+
                    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                    'ORDER BY article.id DESC '

            const resList = await this.app.mysql.query(sql)
            this.ctx.body={list:resList}

    }
    //删除文章
    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}
    }
    //根据文章ID得到文章详情，用于修改文章
    async getArticleById(){
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }
    //评论列表
    async getCommentList(){
        let sql = 'SELECT comment.id as id,'+
                    'comment.content as content,'+
                    'comment.addTime as addTime,'+
                    'comment.article_id as article_id,'+
                    'article.title as title '+
                    'FROM comment LEFT JOIN article ON comment.article_id = article.id '+
                    'ORDER BY comment.id DESC '
            const resList = await this.app.mysql.query(sql)
            this.ctx.body={list:resList}
    }
    //删除评论
    async delComment(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('comment',{'id':id})
        this.ctx.body={data:res}
    }
}

module.exports = MainController