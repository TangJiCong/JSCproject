
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let result = await this.app.mysql.get("react_content", {})
    console.log(result)
    this.ctx.body = result
  }
  //获取博主信息
  async getUserInfo(){
    const result = await this.app.mysql.select('user_info')
    this.ctx.body = {data:result}
  }
  //首页
  async getArticleList() {
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id'
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results
    }
  }
  //详情页
  async getArticleById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }
  //得到类别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }
  //根据类别ID获得文章列表
  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}

  }
  //关键字查询
  async getLikeTile(){
    let title =this.ctx.params.title
    let sql = ` SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
    article.view_count as view_count,
    type.typeName as typeName
    FROM article LEFT JOIN type ON article.type_id = type.id 
    WHERE title LIKE '%${title}%' 
    ORDER BY article.id DESC `
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  //列表总数
  async getPageCount(){
    let sql = `SELECT COUNT(*) FROM article`
    const result =await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  //分页查询
  async getPageList(){
    let curPage = parseInt(this.ctx.params.curPage)
    const size = 10
    let offset = (curPage - 1)*size
    let sql = `SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
    article.view_count as view_count,
    type.typeName as typeName
    FROM article LEFT JOIN type ON article.type_id = type.id 
    ORDER BY id DESC
    LIMIT ${offset},${size}`
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  //添加评论
  async addComment(){
    let commentData=this.ctx.request.body
    const result =await this.app.mysql.insert('comment',commentData)
    const insertSuccess = result.affectedRows ===1
    const insertId = result.insertId
    this.ctx.body={
        isScuccess:insertSuccess,
        insertId:insertId
    }
  }
  //查询评论
  async getComment(){
    let id =this.ctx.params.articleId
    let sql = `SELECT id,article_id,content,addTime
    FROM comment
    WHERE article_id = ${id}
    ORDER BY id DESC`
    const result =await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  //最新文章
  async getNewsArticle(){
    let sql = `SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
    article.view_count as view_count,
    type.typeName as typeName
    FROM article LEFT JOIN type ON article.type_id = type.id 
    ORDER BY id DESC
    LIMIT 0,6`
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  //最新评论
  async getNewsComment(){
    let sql = `SELECT id,article_id,content,addTime
    FROM comment
    ORDER BY id DESC
    LIMIT 0,6`
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  //增加阅读数
  async addViewNum(){
      let tmpView= this.ctx.request.body
      if(tmpView.id && tmpView.view_count){
        const result = await this.app.mysql.update('article', tmpView);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body={
          isScuccess:updateSuccess
        }
      }else{
        this.ctx.body = {
          isScuccess:'修改失败'
        }
      }
  }
}

module.exports = HomeController;