// package 호출
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// schema 정의
var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String
	}
});

// user.save() 전처리함수
//UserSchema.pre('save', function(callback) {
//	var user = this;

//	if(!user.isModified('password')) return callback();

//    bcrypt.genSalt(5, function(err, salt) {
//    	if (err) return callback(err);

//    	bcrypt.hash(user.password, salt, null, function(err, hash) {
//    		if(err) return callback(err);
//    		user.password = hash;
//    		callback();
//    	});
//    });
//});

//UserSchema.methods.verifyPassword = function(password, cb) {
//	bcrypt.compare(password, this.password, function(err, isMatch) {
//		if (err) return bd(err);
//		cb(null, isMatch);
//	});
//}

// Export Mongoose model
module.exports = mongoose.model('User', UserSchema);
