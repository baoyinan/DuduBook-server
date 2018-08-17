var express = require('express')
var mongoose = require('mongoose')
var app = express()

var bookSourceRouter = require('./routers/bookSource')
var userRouter = require('./routers/user')

mongoose.connect('mongodb://localhost:27017/test');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    console.log('链接数据库成功')
})
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//  res.header("X-Powered-By",' 3.2.1')
//  res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.set('view engine', 'ejs')
	.set('views', './views')
	.use(express.static(__dirname + '/bookSource'))
	.use('/booksource/', bookSourceRouter)
	.use('/user', userRouter)
	.listen(3000, function () {
	    console.log('Server start at http://localhost:3000')
	})