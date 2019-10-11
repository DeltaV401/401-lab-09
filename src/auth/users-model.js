const mongoose =  require('mongoose');

const users = new Mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
});

module.exports = users;
