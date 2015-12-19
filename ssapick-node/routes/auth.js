var express = require('express');
var request = require("request");
var router = express.Router();
var authController = require('../controllers/auth');
var User = require('../models/user');

// Create endpoint handlers for /auth/login
router.route('/login')
	.post(authController.login, function(req, res) {
		var token = authController.genToken(req.user);
		res.send(token);
	});

// Create endpoint handlers for /auth/facebookLogin
router.route('/facebookLogin')
	.post(authController.facebookLogin, function(req, res) {
		var token = authController.genToken(req.user);
		res.send(token);
	});

// Create endpoint handlers for /auth/facebookLogin2
router.route('/facebookLogin2')
	.post(function(req, res) {
		var token;
		if(req.body.access_token){
			request({
			  uri: "https://graph.facebook.com/me?access_token=" + req.body.access_token,
			  method: "GET",
			  timeout: 10000,
			  followRedirect: true,
			  maxRedirects: 10
			}, function(err, response, body) {
				var result = JSON.parse(body);
				console.log(result);
				if(result.verified == true) {
					User.findOne({
						email: result.email
					}, function(err, user) {
						if (err) {
							res.send(err);
						}
						if (!user) {
							user = new User({
							   email: result.email
							});
							user.save(function(err) {
								if (err) return res.send(err);
								token = authController.genToken(user);
								res.send(token);
							});
						} else {
							token = authController.genToken(user);
							res.send(token);
						}
					});
				}else{
					res.send(body);
				}
			});
		}else{
			res.send({message: 'send access token.'});
		}
	});

module.exports = router;
