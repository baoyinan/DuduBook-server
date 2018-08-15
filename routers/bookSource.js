const express = require('express')
const router = express.Router()
const url = require('url')
const Book = require('../models/book')

//getAllBookList(start, end)
router.get('/getAllBookList', function (req, res) {
    Book.getAllBookList(-1, -1, function(books){
        res.json(books)
    })
})

//getBookInformation
router.get('/getBookInfor',function(req, res){
	var obj = url.parse(req.url, true).query
	Book.find({bookID:obj.bookId}, function(err, bookEntity){
		res.json({
			book: bookEntity[0]
		})
	})
})

//getBookListByCategory(type, start, end)
router.get('/getBookListByCategory', function (req, res) {
    var bookType = req.query.booktype;
    Book.getBookListByCategory(bookType, function(books){
        res.json(books);
    })
})

//getBookListByHot(start, end)
router.get('/getBookListByHot', function (req, res) {
	Book.getBookListByHot(function(books){
		res.json(books)
	})
})

//getBookListByDate(start, end)
router.get('/getBookListByDate', function (req, res) {
    res.send('getBookListByDate')
})

//getDIYBookList
router.get('/getDIYBookList', function(req, res){
	
})

//downloadBook(bookID)
router.get('/downloadBook', function (req, res) {
    res.send('downloadBook')
})

//trySeeBook(bookID)
router.get('/trySeeBook', function (req, res) {
    res.send('trySeeBook')
})

router.get('/booklist',function(req,res){
	res.render('booklist', {
		
	})
})

module.exports = router