const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// require model database
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/recipe-site', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

// sets the path
app.set('views', path.join(__dirname, 'views'));

// sets the templating app used
app.set('view engine', 'ejs');

// to parse data from an empty or undefined object
app.use(express.urlencoded({extended:true}));

// FARM routes
app.get('/dashboard', async (req, res) => {
  const users = await User.find({});
  res.render('dashboard', {users});
  console.log('welcome to the dashboard');
})


app.listen(3090, () => {
  console.log('App is listening on port 3030!');
})
