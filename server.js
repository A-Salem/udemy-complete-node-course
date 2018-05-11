const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

// here are the midddlewares
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
      console.log('Error happened while saving log');
  });

  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
