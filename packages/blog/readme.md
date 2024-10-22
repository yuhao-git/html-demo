起步:

### docker 创建 mysql

```bash
docker-compose up -d
```

// docker-compose.yml   中配置了数据持久化，目录中将会生成 /data 

``` yml
# docker-compose.yml  
version: '3'
services:
  mysql: # 服务名称
    image: mysql:8.3.0 # 或其它mysql版本
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-time-zone=+8:00
    container_name: mysql_dev # 容器名称
    environment:
      - MYSQL_ROOT_PASSWORD=123456 # root用户密码
    volumes:
      - ./data/mysql:/var/lib/mysql # 数据持久化目录，宿主机:容器
      # - ./dev.sql:/docker-entrypoint-initdb.d/dev.sql # 在容器启动时执行dev.sql脚本
    ports:
      - 3306:3306 # 指定宿主机端口与容器端口映射关系，宿主机:容器
    # restart: always # 容器随docker启动自启
```



### 创建项目

express 脚手架  - express-generator

创建项目的方式：

```cmd
npx express-generator
```

或者

```console
npm install -g express-generator
express
安装后使用命令创建项目
express server
```



### package.json中

- cross-env  是为了处理不同系统之间设置命令的不同，  代替  set 
- dotenv 加载环境变量
- node-dev 热更新

```json
{
  "name": "server",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "cross-env NODE_ENV=development node-dev --no-notify ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "cross-env": "^7.0.3", 
    "debug": "~2.6.9",
    "dotenv": "^16.4.5",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1"
  }
}
```

`--no-notify` 禁用重启的通知，完整命令

```json
"dev": "cross-env NODE_ENV=development  node-dev --no-notify ./bin/www"
```

- 热更新

  全局安装node-dev

```
npm install node-dev -g
```



- 读取.env配置文件

```
pnpm add dotevn

// 在文件中修改 /bin/www
require('dotenv').config()
console.log(process.env.PORT)
// .env中
PORT = 4000

// 启动时修改端口号
"set PORT=4000 && node-dev ./bin/www"
```



### /bin/www

```js

#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');
var path = require('path');
var os = require('os');

const envFilePath = path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`);
require('dotenv').config({
  path: envFilePath, // 配置文件路径
  // encoding: 'utf8', // 编码方式，默认utf8
  // debug: false, // 是否开启debug，默认false
}).parsed;

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);

  // 控制台输出当前的 ip和端口号
  var ip = addr.address === '::' ? 'localhost' : addr.address;
  console.log(`Server is running at http://${ip}:${addr.port}`);
  // 局域网中的ip
  var networkInterfaces = os.networkInterfaces();
  for (var interface in networkInterfaces) {
    networkInterfaces[interface].forEach(function(details){
      if (details.family === 'IPv4' && !details.internal) {
        console.log(`LAN IP Address: http://${details.address}:${addr.port}`);
      }
    });
  }
}

```



### sequelize

1. 使用docker启动mysql数据库
2. 连接数据库   root  123456
3. 鉴权（jwt)   账号密码，验证码，微信，支付宝方式

前置依赖

```bash
npm install sequelize-cli  -g
npm install sequelize mysql2
```

 执行 `sequelize init`

当前项目下将添加三个文件夹

> config  数据库连接配置
>
> ```json
> "development": {
>     "username": "root",
>     "password": "123456",
>     "database": "dev",
>     "host": "127.0.0.1",
>     "dialect": "mysql",
>     "timezone": "+08:00"
>   },
> ```
>
> migrations  迁移文件
>
> models  模型文件
>
> seeders  种子文件

创建模型和迁移文件

```cmd
sequelize model:generate --name Article --attributes title:string,content:text
```

生成数据表

```
sequelize db:migrate
```

生成种子文件

```
sequelize seed:generate --name article
```

使用种子文件，生成测试数据	

```
sequelize db:seed --seed 20240922045046-article
```

回滚，迁移

```bash
sequelize db:migrate:undo
```

已有表中添加字段

如在user 表中添加 字段

1. 

```
sequelize migration:generate --name add-avatar-status-lastLoginAt-to-user
```

2. 

```js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true, // 根据需要设置为 true 或 false
    });
    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.TINYINT,
      allowNull: true, // 根据需要设置为 true 或 false
    });
    await queryInterface.addColumn('Users', 'lastLoginAt', {
      type: Sequelize.DATE,
      allowNull: true, // 根据需要设置为 true 或 false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'avatar');
    await queryInterface.removeColumn('Users', 'status');
    await queryInterface.removeColumn('Users', 'lastLoginAt');
  }
};
```

3. 

```
sequelize db:migrate
```



实战

```
# 生成 Articles 模型
sequelize model:generate --name Article --attributes name:string,content:text

# 生成 Categories 模型
sequelize model:generate --name Category --attributes name:string,rank:integer

# 生成 Settings 模型
sequelize model:generate --name Setting --attributes name:string,icp:string,copyright:string

# 生成 Users 模型
sequelize model:generate --name User --attributes email:string,password:string,nickname:string,sex:tinyint,company:string,introduce:text,role:tinyint

# 生成 Courses 模型
sequelize model:generate --name Course --attributes categoryId:integer,userId:integer,name:string,image:string,recommended:tinyint,introductory:tinyint,content:text,likesCount:integer,chaptersCount:integer

# 生成 Chapters 模型
sequelize model:generate --name Chapter --attributes courseId:integer,title:string,content:text,video:string,rank:integer

# 生成 Likes 模型
sequelize model:generate --name Like --attributes courseId:integer,userId:integer
```

![image-20240922185325467](C:\Users\yuhao\AppData\Roaming\Typora\typora-user-images\image-20240922185325467.png)



基于mvc的结构划分

```
project-root/
├── config/  存放配置文件，如数据库配置。
│   └── database.js  
├── controllers/  控制器文件，处理请求和响应。
│   └── categoryController.js
├── models/ 已经存在的 Sequelize 模型文件
│   ├── index.js
│   └── category.js
├── routes/ 定义 API 路由。
│   └── categoryRoutes.js
├── services/ 业务逻辑层
│   └── categoryService.js
├── migrations/  已经存在的数据库迁移文件
│   └── 20240922105234-create-user.js
├── views/ 视图模板文件（如果使用服务器端渲染）
│   └── categories/
│       ├── list.ejs
│       └── form.ejs
├── utils/ 工具函数。
│   └── validationUtils.js
├── middlewares/ 中间件，如错误处理。
│   └── errorHandler.js
├── app.js
└── package.json
```

controllers/

```js
const CategoryService = require('../services/categoryService');

exports.list = async (req, res) => {
    const categories = await CategoryService.getAllCategories();
    res.render('categories/list', { categories });
};

// ... 其他控制器方法
```

services/

```js
const { Category } = require('../models');

exports.getAllCategories = async () => {
    return await Category.findAll();
};

// ... 其他服务方法
```

models/    sequelize 模型

routes

```js
var express = require('express');
var router = express.Router();
var adminCategoryController = require('../../controllers/admin/categoryController');
/* GET home page. */
router.get('/', adminCategoryController.list);

module.exports = router;

```

关联查询

```js
const { sequelize } = require('./models'); // 导入 Sequelize 实例

async function getUserPostsByName(username) {
    try {
        const sql = `
            SELECT Users.id, Users.username, Posts.title, Posts.content
            FROM Users
            JOIN Posts ON Users.id = Posts.userId
            WHERE Users.username = :username
        `;

        // 使用参数替换来防止 SQL 注入
        const [results, metadata] = await sequelize.query(sql, {
            replacements: { username } // 安全地插入用户输入
        });

        console.log(JSON.stringify(results, null, 2));
    } catch (error) {
        console.error('Error executing SQL query:', error);
    }
}

// 调用函数并传入用户名
getUserPostsByName('指定的用户名');
```

### 生成密码

```js
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('hex'));
```



### 视频流

边下边播

```js
/**
 * 视频文件流式传输
 * @param {*} req 
 * @param {*} res 
 */
const serveVideoFiles = (req, res) => {
    const videoPath = path.join(VIDEO_DIRECTORY = "E://files", req.params.filename);
    const stat = fs.statSync(videoPath);

    // Handle range requests for streaming
    const range = req.headers.range;
    let headers = {
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes'
    };

    if (!range) {
        // If no range is specified, send the entire file
        headers['Content-Length'] = stat.size;
        res.writeHead(200, headers);
        const stream = fs.createReadStream(videoPath);
        stream.pipe(res);
    } else {
        // Parse the range header
        const [start, end] = range.replace(/bytes=/, "").split("-").map(v => parseInt(v, 10));
        const chunkSize = 10 ** 6; // 1MB chunk size
        const startOffset = start || 0;
        const endOffset = end || stat.size - 1;
        const contentLength = endOffset - startOffset + 1;

        // Set the content range and length
        headers['Content-Length'] = contentLength;
        headers['Content-Range'] = `bytes ${startOffset}-${endOffset}/${stat.size}`;
        res.writeHead(206, headers);

        // Create a read stream and pipe it to the response
        const stream = fs.createReadStream(videoPath, { start: startOffset, end: endOffset });
        stream.pipe(res);
    }
}
```

### 非对称加密

1. 安装 openssl  用于生成公钥和私钥 [Win32/Win64 OpenSSL Installer for Windows - Shining Light Productions (slproweb.com)](https://slproweb.com/products/Win32OpenSSL.html)    配置环境变量

2. 执行指令

   ```bash
   openssl genrsa -out private.pem 2048
   openssl rsa -in private.pem -outform PEM -pubout -out public.pem
   ```

3. 加密解密

   ```js
   const express = require('express');
   const fs = require('fs');
   const crypto = require('crypto');
   
   const app = express();
   app.use(express.json());
   
   // 读取公钥和私钥
   const privateKey = fs.readFileSync('private.pem', 'utf8');
   const publicKey = fs.readFileSync('public.pem', 'utf8');
   
   // 加密数据
   const encryptData = (data) => {
       const buffer = Buffer.from(data);
       const encrypted = crypto.publicEncrypt(publicKey, buffer);
       return encrypted.toString('base64');
   };
   
   // 解密数据
   const decryptData = (encryptedData) => {
       const buffer = Buffer.from(encryptedData, 'base64');
       const decrypted = crypto.privateDecrypt(privateKey, buffer);
       return decrypted.toString('utf8');
   };
   
   ```

   

### websocket

### 头像上传
