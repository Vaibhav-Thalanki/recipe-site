const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  username: String,
  email: {
    type: String,
    required: [true, 'Email required']
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  recipes:  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

//to export the schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
