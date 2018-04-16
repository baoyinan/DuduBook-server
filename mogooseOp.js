var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection;
db.on('error', function () {

})

db.on('open', function (callback) {

})

var bookSchema = mongoose.Schema({
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
            dateTime: String
        }
    ]
})

var book = mongoose.model('book', bookSchema)

var B = new book({bookID: 100, bookTitle:'fight'})
B.save(function (err, B) {
    console.log(err, B.bookID)
})