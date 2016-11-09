'use strict';
const config = require('../config');
const request = require('request');
const git = require("nodegit");

module.exports.get = (req, res, next) => {
	res.status(200).send({info: "Working..."});
};

module.exports.post = (req, res, next) => {
	console.log({
		headers: req.headers,
		body: req.body,
		params: req.params,
		query: req.query
	});

	if(req.body.secret === config.gogs_secret) {
		let tag = req.body.commits.message;
		console.log("tag: ", req.body);
		res.status(200).send({secret: true, headers: req.headers, body: req.body, tag: tag});
	} else {
		res.status(400).send({secret: false, headers: req.headers, body: req.body});
	}
};