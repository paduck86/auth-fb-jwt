// package 호출
var jwt = require('jsonwebtoken');
var passport = require('passport');
var CustomStrategy = require('passport-custom').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var User = require('../models/user');


// 프로퍼티파일
var nconf = require('nconf');
nconf.argv().env();
nconf.file({ file: 'config.json' });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new CustomStrategy(
	function(req, done) {
		User.findOne({
            email: req.body.email 
        }, function(err, user) {
            if (err) {
                return done(err,false);
            }
          
            if (!user) {
                user = new User({
                   email: req.body.email
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

passport.use(new FacebookTokenStrategy({
		clientID: nconf.get("facebook:clientID"),
		clientSecret: nconf.get("facebook:clientSecret")
	}, function(accessToken, refreshToken, profile, done) {
		User.findOne({
            email: profile.emails
        }, function(err, user) {
            if (err) {
                return done(err,false);
            }
            if (!user) {
                user = new User({
                    email: profile.emails
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));
 
exports.login = passport.authenticate('custom');
exports.facebookLogin = passport.authenticate('facebook-token');

exports.genToken = function(user) {
	var secret = nconf.get("jwtSecret");

	var expires = expiresIn(7); // 7 days

	var token = jwt.sign(user, secret, {expiresIn: expires});

	return {
	  token: token,
	  expires: expires,
	  user: user
	};
};

// private methods
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

