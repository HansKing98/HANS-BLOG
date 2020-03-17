'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    // 首页的文章列表数据
    this.ctx.body = 'hi api';
  }

  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
                    "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 退出登录
  async outLogin() {
    this.ctx.session.openId = null;
    this.ctx.body = { data: '退出成功' };

  }

  async checkOpenId() {
    const cOpenId = this.ctx.request.body.openId;
    const sOpenId = this.ctx.session.openId.openId;
    if (sOpenId && cOpenId === sOpenId) {
      this.ctx.body = { data: '已经登录' };
    } else {
      this.ctx.body = { data: '没有登录' };
    }

  }

  // 后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
  // 添加文章
  async addArticle() {

    const tmpArticle = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }
  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }

  // 修改文章置顶信息
  async updateIsTop() {
    const tmpArticle = this.ctx.request.body;


    const sql = 'update  article set isTop = ' + tmpArticle.isTop + ' where id = ' + tmpArticle.id;
    const updateResult = await this.app.mysql.query(sql);
    const updateSuccess = updateResult.affectedRows === 1;
    if (updateSuccess) {
      this.ctx.body = { data: 'success' };
    } else {
      this.ctx.body = { data: 'error' };
    }
  }


  // 获得文章列表
  async getArticleList() {

    const sql = 'SELECT article.id as id,' +
                  'article.title as title,' +
                  'article.introduce as introduce,' +
                  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                  'article.view_count as view_count ,' +
                  'article.part_count as part_count ,' +
                  'article.isTop as isTop ,' +
                  'type.typeName as typeName ' +
                  'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                  'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };

  }

  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
         'article.title as title,' +
         'article.introduce as introduce,' +
         'article.article_content as article_content,' +
         "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
         'article.view_count as view_count ,' +
         'article.part_count as part_count ,' +
         'type.typeName as typeName ,' +
         'type.id as typeId ' +
         'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
         'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }


  // 增加大胖逼逼叨的方法
  async addBBD() {
    const tmpBBD = this.ctx.request.body;
    const result = await this.app.mysql.insert('bibidao', tmpBBD);
    const insertSuccess = result.affectedRows === 1;
    this.ctx.body = { isScuccess: insertSuccess };
  }
  // 读取大胖逼逼叨的列表
  async getListBBD() {
    const resList = await this.app.mysql.select('bibidao', {
      orders: [[ 'id', 'desc' ]],
    });
    console.log(resList);
    this.ctx.body = { list: resList };
  }

  // 根据ID删除逼逼叨列表的方法
  async delBBDbyId() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('bibidao', { id });
    this.ctx.body = { data: res };
  }


}

module.exports = MainController;
