'use strict';

module.exports = (err, req, res, next) => {
  console.error(err);
  let error = { error: err };
  res.status(500).json(error).end();
};
