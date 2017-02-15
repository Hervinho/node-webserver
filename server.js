//Intro to express.
const express = require('express');
const hbs = require('hbs');//another template engine.
const fs = require('fs');
const port = process.env.PORT || 2000; //port is either 2000 or port in environment variable.

var app = express();
hbs.registerPartials(__dirname + '/views/partials'); //register all partials that will be used.
app.set('view egine', 'hbs');//make express use hbs as template engine.

//Example of middleware
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = now + ' :' + request.method + ' ' + request.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error){
      console.log('Unable to write to file.');
    }
  });
  next();//if next() is not called, the rest of the code below will not run.
});

//2nd example of middleware. Here next() is not called. So nothing else will execute
/*app.use((request, response, next) => {
  response.render('maintenance.hbs', {
    title: 'Maintenance Page'
  });
});*/

//express.static() takes absolute path of folder to serve up.
app.use(express.static(__dirname + '/public')); //to access pages in public folder as .../help.html


//Helpers are functions that can be run inside partials.
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (someText) => {//this helper texts some text and returns it in upper cases.
  return someText.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    message: 'Hello World!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.json({
    code: '404',
    status: 'NOT FOUND',
    errorMsg: 'Something went wrong.'
  });
});

app.listen(port, () => {
  console.log('Server listening to port ' + port)
});
