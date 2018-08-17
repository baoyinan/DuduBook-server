var mongoose = require('mongoose')
var BookSchema = mongoose.Schema({
	bookID: String,
	bookTitle: String,
	bookType: String,
	author: String,
	description: String,
	downloadCount: Number,
	averageCommentScore: Number,
	commentDetail: [{
		author: String,
		commentScore: Number,
		comment: String,
		dateTime: Date
	}]
})

BookSchema.statics.getAllBookList = function(cb, booktitle, start, end, ) {
	//model.find(condition, [fields], [options], callback)
	this.model('bookmodels').find({bookTitle:{$regex:'' + booktitle + '', $options:'i'}}, function(err, books) {
		cb(books)
	})
}

BookSchema.statics.getBookListByCategory = function(type, cb) {
	this.model('bookmodels').find({
		'bookType': type
	}, function(err, books) {
		cb(books)
	})
}

BookSchema.statics.getBookListByHot = function(cb) {
	this.model('bookmodels').find({}, function(err, books){
		books.sort(function(book1, book2){
			return book2.downloadCount - book1.downloadCount
		})
		var tempBooks = []
		for(var i=0;i<books.length;i++){
			if(i>=3){
				break;
			}
			tempBooks.push(books[i])
		}
		cb(tempBooks)
	})
}

module.exports = BookSchema