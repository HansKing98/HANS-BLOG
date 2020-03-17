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
      enable: false,
    },
    domainWhiteList: [ '*' ]
  };

  config.cors = {
    origin: '*',
    // origin: 'http://hansking.cn:3000',
    // credentials: true,  //允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  return {
    ...config,
    ...userConfig,
  };
};
