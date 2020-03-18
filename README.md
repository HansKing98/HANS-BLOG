# 🚀React Hooks + Next.js + Egg.js + MySql + GraphQL + Ant Design 博客系统

## 技术栈

- React
- Next
- TypeScript
- Webpack
- Node.js
- Egg
- TSLint

## blog/admin/service

### 项目拉取后需要进入相应目录分别进行安装依赖项

以 bolg 前台为例：

```bash
cd blog
yarn install
```

## blog

```bash
# 项目启动
yarn dev

# 项目部署
npm run build //打包
pm2 start npm -- run start // 进程守护
// 或者
pm2 start 'npm start'
```

## admin

```bash
# 项目启动（开发模式）
npm start

# 项目打包
# 由于是个人后台管理页面放到其他位置以静态页面模式使用
yarn build
```

## service

```bash
# 项目启动（开发模式）
npm i
npm run dev
open http://localhost:7001/

# 项目部署
npm start
npm stop
```

## 遇到的问题

### 跨域设置

```javascript
// config/plugin.js
exports.cors = {
  enable: true,
  package: "egg-cors"
};

// config/config.default.js
config.security = {
  csrf: {
    enable: false
  },
  domainWhiteList: ["http://127.0.0.1:3000", "http://127.0.0.1:3001"]
};

config.cors = {
  // origin: 'http://127.0.0.1:3000',
  // origin 字段存在会忽略 domain白名单
  credentials: true, //允许Cook可以跨域
  allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
};
```

domainWhiteList：用于设置白名单（多个）

origin：设置跨域地址（只能一个）

想要设置多个跨域地址，请注释掉 origin 字段，在白名单字段设置地址数组

## react 打包后，项目部署完毕，刷新页面报错 404

```javascript
// 将 BrowserRouter
import { BrowserRouter as Router, Route } from "react-router-dom";

// 改为 HashRouter
import { HashRouter as Router, Route } from "react-router-dom";
```
