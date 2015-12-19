//package 호출
var nconf = require('nconf');
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var path = require('path');
var http = require('http');
var session = require('express-session');
var passport = require('passport');
var app = express();

nconf.argv().env();
nconf.file({ file: 'config.json' });

// view engine setup
app.set('port', nconf.get("http:port"));

// MongoDB
mongoose.connect(nconf.get('mongoUrl'));


// body-parser 설정
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(passport.initialize());
app.use(session({
    secret: 'Super Secret Session key',
	saveUninitialized: true,
	resave: true}
));

// CORS 헤더 설정
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
   next();
  }
});
 
// /api 로 시작하는 url 토큰체크함
app.all('/api/*',[require('./middlewares/validateRequest')]);


// routes 등록
app.use('/', index);
app.use('/auth', auth);
app.use('/api/users', users);


// server start
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


