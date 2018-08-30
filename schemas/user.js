var mongoose = require('mongoose')
var UserSchema = mongoose.Schema({
	username: String,
	userpwd: String,
	email: String,
	phone: String,
	scoreTotal: Number,
	coinTotal: Number,
	status: String,
	coinDetail: []
})

module.exports = UserSchema