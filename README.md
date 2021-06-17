# compile-demo


通过REST api接口上传文件（目前支持Java、Go）和编译参数，服务器编译后返回生成的文件。

***特性***

* 语言 - [TypeScript](https://www.typescriptlang.org/)
* REST API - [koa2](http://koajs.com/)
* 参数校验 - [Joi](https://github.com/hapijs/joi)
* 日志 - [Log4js](https://github.com/log4js-node/log4js-node)
* 代码风格 - [Prettier](https://prettier.io/)

## 准备工作

* 在本地安装jdk和go的多个版本，并按版本分目录存放，举例：
#### 目录结构

    ├── usr
    │   └── lib              
    │        ├── java
    │        │    ├── 8
    │        │        ├── bin
    │        │        └── ...
    │        │    ├── 9
    │        │    ├── 10
    │        │    └── ...
    │        │    
    │        └── go
    │            ├── 1.11
    │                ├── bin
    │                └── ...
    │            ├── 1.12
    │            ├── 1.13
    │            └── ...

* 修改src/lib/config.ts
  * JDK_VERSIONS： 允许编译的JDK版本
  * GO_VERSIONS:：允许编译的GO版本
  * JAVA_HOME：各版本JDK的路径。格式为：/usr/lib/java。
  * GO_HOME：各版本GO的路径。格式为：/usr/lib/go。

## 安装依赖 & 运行

* *npm install* - 依赖安装
* *npm run build* - 编译
* *npm run start* - 运行

### 使用docker运行

* *docker-compose up* (compose and run)
* *docker-compose down* (Destroy application)

## 接口API

* 编译java文件 
  * url：POST http://localhost:8080/api/v1/compile/java
  * 参数：jdkVersion: number jdk版本号、args: string[] 其他参数
  
* 编译go文件
  * url：POST http://localhost:8080/api/v1/compile/go
  * 参数：goVersion: number go版本号、args: string[] 其他参数

