var mongoose = require('mongoose')
var UserSchema = mongoose.Schema({
	username: String,
	userpwd: String,
	email: String,
	phone: String,
	scoreTotal: Number,
	coinTotal: Number,
	status: String,
	coinDetail: [],
	bookDownloadHistory: [],
	sex: String,
	city: String,
	province: String,
	headimgurl: String,
	unionid: String,
	openid: String,
})

module.exports = UserSchema