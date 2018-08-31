const express = require('express')
const router = express.Router()
const url = require('url')
const email = require('nodemailer')
const user = require('../models/user')
const constant = require('./constant')

router.get('/sendmail', function(req, res) {
	res.json({

	})
})

router.get('/loginAward', function(req, res){
	var obj = url.parse(req.url, true).query
	
	user.find({username: obj.username}, function(err, userList){
		//check if got the login coin award
		var today = formatDate(new Date())
		var userEntity = userList[0]
		var loginAward = true
		for(var i = userEntity.coinDetail.length - 1; i >= 0; i--) {
			var coinRecord = userEntity.coinDetail[i]
			if(coinRecord.coinType == constant.cointTypeLogin) {
				if(coinRecord.dateTime === today) {
					loginAward = false
				}
				break;
			}
		}
		
		if(loginAward){
			//assign the login award
			userEntity.coinTotal += constant.coinAwardLogin
			userEntity.coinDetail.push({
				coinType: constant.cointTypeLogin,
				coinNum: constant.coinAwardLogin,
				coinLeft: userEntity.coinTotal,
				comment: '每日登录奖励' + constant.coinAwardLogin + '金币',
				dateTime: today
			})
			
			userEntity.save(function(err){
				if(err){
					console.log(err)
				}else{
					console.log('Success to assign the login award!')
				}
			})
		}else{
			console.log(obj.username + ' has got the login award today!')
		}
	})
})

router.get('/authlogin', function(req, res){
	var obj = url.parse(req.url, true).query
	
	user.find({username:obj.username, sex:obj.sex}, function(err, userList){
		if(userList.length>0){
			res.json({
				errcode: 0,
				errmsg: ''
			})
		}else{
			user.create({
				username: obj.username,
				userpwd: 'auth',
				email: '',
				coinTotal: constant.coinAwardInitialize,
				status: 'active',
				sex: obj.sex,
				province: obj.province,
				city: obj.city,
				headimgurl: obj.headimgurl,
				openid: obj.openid,
				unionid: obj.unionid,
				coinDetail: [{
					coinType: constant.coinTypeRegister,
					coinNum: constant.coinAwardInitialize,
					coinLeft: constant.coinAwardInitialize,
					comment: '初次注册送'+constant.coinAwardInitialize+'金币',
					dateTime: formatDate(new Date())
				}]
			}, function(err, userEntity){
				if(err){
					console.log('Fail to create user:'+obj.username)
				}else{
					console.log('Success to create user:'+obj.username)
					res.json({
						errcode: 0,
						errmsg: ''
					})
				}
			})
		}
	})
})

router.get('/login', function(req, res) {
	var obj = url.parse(req.url, true).query

	user.find({
		username: obj.username,
		userpwd: obj.userpwd
	}, function(err, userEntity) {
		var msg = ''
		var code = 0
		if(userEntity.length <= 0) {
			msg = 'Username or password is incorrect'
			code = 1
			console.log('Fail to find user:', obj.username)
		}

		res.json({
			errcode: code,
			errmsg: msg
		})
	})
})

router.get('/saveUser', function(req, res) {
	var obj = url.parse(req.url, true).query
	
	//check if user or email exist
	user.find({
		$or: [{
			username: obj.username
		}, {
			email: obj.email
		}]
	}, function(err, userEntity) {
		var msg = ''
		if(userEntity.length > 0) {
			msg = 'username or email has existed, please try again.'
			res.json({
				errcode: 1,
				errmsg: msg
			})
		} else {
			//check if referred by other
			if(obj.referuserid !== '') {
				//add total coin for the user and add it to the coin history

			}

			//initiate user account
			user.create({
				username: obj.username,
				userpwd: obj.userpwd,
				email: obj.email,
				coinTotal: constant.coinAwardInitialize,
				status: 'active',
				coinDetail: [{
					coinType: constant.coinTypeRegister,
					coinNum: constant.coinAwardInitialize,
					coinLeft: constant.coinAwardInitialize,
					comment: '初次注册送'+constant.coinAwardInitialize+'金币',
					dateTime: formatDate(new Date())
				}]
			}, function(err, userEntity) {
				if(err) {
					console.log('Fail to create user!')
				} else {
					//response the result
					res.json({
						errcode: 0,
						errmsg: msg
					})
				}
			})
		}
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