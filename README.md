# Getting started

*本项目是嘟嘟绘本的服务器端，客户端访问 https://github.com/smalltee/DuduBook*

## How to start up this server

*预安装环境：NodeJS + git(需要在git上注册个账号)*

1. clone this project with: git clone https://github.com/smalltee/DuduBook.git

2. run command under this project to install all dependent third-part library: npm install

3. set up Mongodb (we use Mongodb as database), and start up it

4. start up project with this command: node server.js. default port is 3000. so here is the address for server http://localhost:3000

## How to setup Mongodb

[Mongodb tutorial](https://docs.mongodb.com/manual/installation/)

## Set up adminMongo

[AdminMongo](https://github.com/mrvautin/adminMongo)
   
It is used to check data as GUI manager. it can be ignored if do not need to check data by UI

## 项目目录结构介绍

+ bookSource: 准备好的绘本资源存放在该目录下
+ model: 数据表的实例
+ routers:  针对不同访问请求，进行路径匹配，并执行相应业务逻辑
+ schema: 定义数据表的结构，同时可以定义一些对该数据表的操作方法
+ views: 定义视图，目前服务端还不需要
+ server.js: 创建服务器，做一些基本项目配置

## 如何制作并提交一个绘本

### 服务器端存放的绘本目录结构

bookID_bookName (文件夹)

    pages (文件夹，包含的是每一页的图片，jpg为后缀名)
    
	audios (文件夹，存放的是每一页对应的音频文件，mp3为后缀名)
	
	lyric.txt (文件，绘本所讲述的文字，每一行对应一页内容，如果没有则留空一行)
	
	index.jpg （文件，作为绘本封面图片，在书架列表中显示）
	
	bookID_bookName.zip （文件，上述材料准备好后压缩的一个文件，会下载到客户端进行解压缩）
	
### 制作步骤介绍

1. 准备绘本页：用复制黏贴的方式将所有页作为图片的方式保存到pages目录，后缀名为jpg 
2. 准备绘本音频：用Fission软件对音频文件进行切割保存为对应绘本页的音频，保存到audios目录下，后缀名为mp3
3. 准备绘本字幕：拷贝文字或手打文字，每一页对应一行，没有则留空
4. 准备绘本封面图片：拷贝一张到绘本根目录
5. 准备绘本压缩文件：上述几步的文件准备完毕后一并压缩为zip文件
6. 上传到服务端的bookSource目录下
7. 在数据库中为该绘本创建一条绘本数据
