'use strict';

const Q = require('@nmq/q/client');

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  Q.publish('api', 'error', error);
  res.status(404).json(error).end();
};
