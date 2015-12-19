var jwt = require('jsonwebtoken');
// 프로퍼티파일
var nconf = require('nconf');
nconf.argv().env();
nconf.file({ file: 'config.json' }); 

module.exports = function(req, res, next) {
 
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  var secret = nconf.get("jwtSecret");
	
  if (token || key) {
    try {
      var decoded = jwt.verify(token, secret);
      
	  console.log('decoded:'+JSON.stringify(decoded));

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
	  // role check
	  //if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
	  next(); // To move to next middleware

 
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};