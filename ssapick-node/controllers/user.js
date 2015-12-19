// package »£√‚
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
	var user = new User({
		userid: req.body.userid,
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if (err) 
			res.send(err);
		console.log('user saved');
		res.json(user);
	});
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if(err)
			res.send(err);

		res.json(users);
	});
};



