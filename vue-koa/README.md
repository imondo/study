## 源码说明
每次使用VUE来开发项目时，都要重新来配置各种所需的依赖和文件，深感费时，所以单独建立了个简单的VUE项目模板。

### 项目目录说明
```
.
|-- build                            // webpack配置
|-- server                           // koa目录
|   |-- config                       // 数据库配置
|   |-- controller                   // 控制器
|   |-- middlreware                  // 中间件
|   |-- models                       // 应用模型
|   |-- routes                       // 应用接口层
|   |-- app.js                       // 后端入口文件
|-- src                              // 源码目录
|   |-- assets                       // 静态文件
|   |-- components                   // 公共组件
|       |-- Layout                   // 公用布局
|       |-- demo-comps               // DEMO组件
|       |-- index.js                 // 公用组件入口
|   |-- directives                   // VUE指令
|   |-- mixins                       // VUE混合文件
|   |-- router                       // 路由目录
|   |-- store                        // vuex的状态管理
|   |-- styles                       // 样式目录
|   |-- utils                        // 公用文件目录
|       |-- axios.js                 // axios请求
|       |-- index.js                 // 公用文件
|   |-- views                        // 页面组件
|   |-- app.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 外部静态文件
|-- index.html                       // 程序入口html文件
|-- .babelrc                         // ES6语法编译配置
|-- webpack.config.js                // 程序打包配置
|-- package.json                     // 配置项目相关信息
|-- README.md                        // 项目说明
.
```

### 开发环境依赖模块说明
#### webpack相关模块
```
webpack                               // 用来构建打包程序
webpack-dev-server                    // 热加载工具
html-webpack-plugin                   // html 文件编译
autoprefixer-loader                   // css  浏览器兼容性问题处理
font-awesome                          // icon 字体框架
css-loader                            // css  生成
less                                  // css  预处理器less
less-loader                           // css  预处理器less的webpack插件
style-loader                          // css  插入到style标签
file-loader                           // font 将字体文件打包
url-loader                            // img  转化成base64格式
axios                                 // ajax 插件
qs                                    // ajax get请求对参数进行编码
babel-core                            // ES6  代码转换器
babel-loader                          // ES6  代码转换器，webpack插件
babel-plugin-component                // ES6  按需引入需要的babel插件
babel-plugin-transform-runtime        // ES6  添加ES6的对象和功能
babel-preset-es2015                   // ES6  代码编译成现在浏览器支持的ES5
babel-preset-stage-0                  // ES6  ES7要使用的语法阶段
vue-loader                            // vue  组件编译
vue-router                            // vue  路由工具
vue-template-compiler                 // vue  组件编译的Webpack插件
vuex                                  // vue  状态管理
```

### 生产模块依赖说明
```
vue                                   // 构建用户界面
vue-router                            // 路由
```

### 运行程序
```
npm install
npm run dev
```
