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
  config.keys = appInfo.name + '_1585473960174_7061';

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
      host: 'localhost',
      //host: '49.235.78.245',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      //password: 'TJC2201449931',
      password: '@TJCtjc2201449931',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
　　　　csrf: {
　　　　　　enable: false
　　　　},
　　　　domainWhiteList: [ '*' ]
  }
  config.cors = {
    origin: 'http://localhost:3000', 
    //origin: 'http://www.luckyyounth.xyz',
    credentials: true,  
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  return {
    ...config,
    ...userConfig,
  };
};
