const express = require('express')
const router = express.Router()
const url = require('url')
const email = require('nodemailer')
const user = require('../models/user')

router.get('/sendmail', function(req, res){
	res.json({
		
	})
})

router.get('/saveUser', function(req, res){
	var obj = url.parse(req.url, true).query
	var intiateCoin = 500
	var referCoin = 100
	//check if user or email exist
	user.find({$or:[{username: obj.username}, {email: obj.email}]}, function(err, userEntity){
		var msg = ''
		if(userEntity.size > 0){
			msg = 'username or email has existed, please try again.'
		}else{
			//check if referred by other
			if(obj.referuserid !== ''){
				//add total coin for the user and add it to the coin history
				
			}
			
			//initiate user account
			user.create({
				username: obj.username,
				userpwd: obj.userpwd,
				email: obj.email,
				status: 'active'
			}, function(err, userEntity){
				if(err){
					console.log('Fail to create user!')
				}else{
					//add coin history for this user
					
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

module.exports = router
