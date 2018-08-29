var mongoose = require('mongoose')
var UserSchema = require('../schemas/user')

var User = mongoose.model('usermodels', UserSchema)
module.exports = User
