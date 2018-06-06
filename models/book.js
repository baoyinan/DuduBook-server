var mongoose = require('mongoose')
var BookSchema = require('../schemas/book')

var Book = mongoose.model('bookmodels', BookSchema)
module.exports = Book