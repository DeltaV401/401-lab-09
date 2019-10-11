const express = require('express');
const router = express.Router();

const User = require('./users-model');

router.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      req.user = user;
      res.send(`${user} exists now.`);
    })
    .catch(next);
});
