/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582037143544_6191';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '118.190.146.72',
      // port
      port: '3306',
      // username
      user: 'react_blog',
      // password
      password: '63PkM7yR83TDtcMn',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // config.mysql = {
  //   // database configuration
  //   client: {
  //     // host
  //     host: 'localhost',
  //     // port
  //     port: '3306',
  //     // username
  //     user: 'root',
  //     // password
  //     password: '12345678',
  //     // database
  //     database: 'react_blog',
  //   },
  //   // load into app, default is open
  //   app: true,
  //   // load into agent, default is close
  //   agent: false,
  // };

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']
  };

  config.cors = {
    // origin: 'http://127.0.0.1:3000',
    // origin 字段存在会忽略 domain白名单
    credentials: true, //允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // 长文本设置
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '5024kb',
    jsonLimit: '5024kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },

  };

  return {
    ...config,
    ...userConfig,
  };
};