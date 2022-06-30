const mongoose = require('mongoose');

// require model database
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/recipe-site', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

//  TO INSERT MULTIPLE PRODUCTS
const userInfo = [
  {
    name: 'Julio',
    username: 'julio007',
  email: 'julio007@gmail.com',
  password: 'julio3423h',
  recipes:  []
  },
  {
    name: 'Glenda',
    username: 'gwenita',
  email: 'gwen2x@gmail.com',
  password: 'gwen23423',
  recipes:  []
  }
]

User.insertMany(userInfo)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })
