const express = require('express')
const router = express.Router()
const url = require('url')
const Book = require('../models/book')
const User = require('../models/user')
const constant = require('./constant')

//getAllBookList(start, end)
router.get('/getAllBookList', function (req, res) {
	var obj = url.parse(req.url, true).query
    Book.getAllBookList(function(books){
        res.json(books)
    }, obj.booktitle)
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

//saveDownloadHistory
router.get('/saveDownloadHistory', function(req, res){
	var obj = url.parse(req.url, true).query
	var bookid = obj.bookID
	var booktitle = obj.booktitle
	var username_v = obj.username
	
	Book.find({bookID: bookid}, function(err, bookList){
		var bookEntry = bookList[0]
		var bookCoin = bookEntry.bookCoin * bookEntry.discount
		
		User.find({username:username_v}, function(err, userList){
			var userEntity = userList[0]
			var today = formatDate(new Date())
			var isDownloaded = false
			var errcode_v = 0
			var errmsg_v = ''
			
			//check if this book has been downloaded 
			for(var i=0; i<userEntity.bookDownloadHistory.length; i++){
				var downloadBook = userEntity.bookDownloadHistory[i]
				if(downloadBook.bookID === bookid){
					isDownloaded = true
					break;
				}
			}
			
			if(!isDownloaded){
				//check if there is enough coin to download this book
				if(userEntity.coinTotal < bookCoin){
					errcode_v = 1
					errmsg_v = '金币不足，无法下载！'
				}else{
					//reduce the total coin
					userEntity.coinTotal -= bookCoin
					
					//save the coin reduce history
					userEntity.coinDetail.push({
						coinType: constant.coinTypeDownload,
						coinNum: bookCoin,
						coinLeft: userEntity.coinTotal,
						comment: '绘本《' + booktitle + '》下载消费' + bookCoin + '金币',
						dateTime: today
					})
					
					//save download record
					userEntity.bookDownloadHistory.push({
						bookID: bookid, 
						bookTitle: booktitle, 
						downloadDate: today
					})
					
					userEntity.save(function(err){
						if(err){
							console.log(err)
						}else{
							console.log('Success to assign the login award!')
						}
					})
				}
			}
			
			//return result
			res.json({
				errcode: errcode_v,
				errmsg: errmsg_v
			})
		})
	})
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


function formatDate(dt) {
	if(dt === undefined) {
		return ''
	}

	var date_v = new Date(dt)
	return(date_v.getYear() + 1900) + '-' + (date_v.getMonth() + 1) + '-' + date_v.getDate()
}

module.exports = router