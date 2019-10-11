const bcrypt = require('bcrypt');
const mongoose =  require('mongoose');

const users = new Mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin','moderator','user'],
  },
});

users.pre('save', async function() {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

users.statics.authenticateBasic = async function ({ username, password }) {
  let query = { username };
  let user = this.findOne(query);
  return user && user.comparePassword(password);
}

users.methods.comparePassword = async function(password) {
  let valid = await bcrypt.compare(password, this.password);
  return valid ? this : null;
}

module.exports = mongoose.model('users', users);
