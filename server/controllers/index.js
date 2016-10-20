'use strict';

const request = require('request');
const git = require("nodegit");

module.exports.get = (req, res, next) => {
  res.status(200).send({test: "test"});
};

module.exports.post = (req, res, next) => {
  console.log(req.headers);
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  res.status(200).send({headers: req.headers, body: req.body});
};