var pg = require('pg');
var express = require('express');
var app = express();

var https = require('https');

var bodyParser = require( 'body-parser' );
app.use( bodyParser.urlencoded({ extended: true }) );

//for passport
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

//for passport
require('./config/passport')(passport);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




 app.get('/index', function(request, response) {
     https.get({
         headers: {
           'X-Username': 'pearlhacks2017@gmail.com',
           'X-Api-Key': 'HPwXbqXYHfgEEzxIVEd847bmxn5QtfYdpagrP6FmcTs=',
           'Content-Type': 'application/json'
         },
         host: 'api.tierion.com',
         path: '/v1/records?datastoreId=1411',
         port: 443
     }, (res) => {
         //console.log(res)
         res.setEncoding('utf8');
         var arr = []
         res.on('data', function (chunk) {
             arr.push(chunk)
         })
         res.on('end', function (){
             var saved = arr.join(" ")
             var another = JSON.parse(saved)
             console.log(arr)
             response.render('pages/dashboard', {results: another.records})
         })

     })
});

/*app.get('/', function(request, response) {
  response.render('home');
});

app.get('/login', function(request, response) {
  response.render('pages/login');
});

app.get('/test', function(request, response) {
  response.render('pages/index');
});

app.get('/signup', function(request, response) {
  response.render('pages/signup');
});

app.get('/logout', function(request, response) {
  response.logout();
  response.redirect('/');
});*/

/*app.get('/inventory', function(request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/index', {results: result.rows} ); }
        //THIS IS WHERE YOU LEFT OFF, MAKING IT GO TO LOGIN FIRST
       //{ response.render('home'); }
    });
  });
});*/

app.get('/addItems', function(request, response) {
  response.render('pages/addItems');
});

app.get('/addCategories', function(request, response) {
  response.render('pages/addCategories');
});

app.get('/removeItems', function(request, response) {
  response.render('pages/removeItems');
});

app.get('/removeCategories', function(request, response) {
  response.render('pages/removeCategories');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//for passport
require('./app/routes.js')(app, passport);

/*app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});*/
