var mongoose = require('mongoose')
var BookSchema = mongoose.Schema({
    bookID:String,
    bookTitle:String,
    bookType:String,
    author: String,
    downloadCount: Number,
    averageCommentScore: Number,
    commentDetail: [
        {
            author: String,
            commentScore: Number,
            comment: String,
            dateTime: Date
        }
    ]
})

BookSchema.methods.getAllBookList = function (start, end, cb){
    //model.find(condition, [fields], [options], callback)
    this.model('bookmodels').find({}, function (err, books) {
        cb(books)
    })
}

BookSchema.methods.getBookListByCategory = function(type, cb){
    this.model('bookmodels').find({'bookType':type}, function(err, books){
        cb(books)
    })
}

module.exports = BookSchema