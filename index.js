var express = require('express')
var mogooseOp = require('./mogooseOp')
var app = express()
/**
 * getAllBookList(start, end)
 getBookListByCategory(type, start, end)
 getBookListByHot(start, end)
 getBookListByDate(start, end)
 downloadBook(bookID)
 trySeeBook(bookID)
 */
app.get('/getAllBookList', function (req, res) {
    res.send('getAllBookList')
})

app.get('/getBookListByCategory', function (req, res) {
    res.send('getBookListByCategory')
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