var express = require('express')
var mongoose = require('mongoose')
var Book = require('./models/book')
var app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

mongoose.connect('mongodb://localhost:27017/test');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    console.log('链接数据库成功')
})

// var book = new Book({})
/**
 * getAllBookList(start, end)
 getBookListByCategory(type, start, end)
 getBookListByHot(start, end)
 getBookListByDate(start, end)
 downloadBook(bookID)
 trySeeBook(bookID)
 */
app.get('/getAllBookList', function (req, res) {
    new Book({}).getAllBookList(-1, -1, function(books){
        res.json(books)
        // books.forEach(function(book){
        //     console.log(book.bookID, book.bookTitle)
        // })
    })
    // console.log(result)
    // res.json(result)
})

app.get('/getBookListByCategory', function (req, res) {
    var bookType = req.query.booktype;
    new Book({}).getBookListByCategory(bookType, function(books){
        res.json(books);
    })
})

app.get('/getBookListByHot', function (req, res) {
    res.send('getBookListByHot')
})

app.get('/getBookListByDate', function (req, res) {
    res.send('getBookListByDate')
})

app.get('/downloadBook', function (req, res) {
    res.send('downloadBook')
})

app.get('/trySeeBook', function (req, res) {
    res.send('trySeeBook')
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
})