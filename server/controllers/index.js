'use strict';
const config = require('../config');
const request = require('request');
const exec = require('child_process').exec;

module.exports.get = (req, res, next) => {
	res.status(200).send({info: "Working..."});
};

module.exports.post = (req, res, next) => {
	console.log({
		headers: req.headers,
		body: req.body
	});

	if(req.body.secret === config.gogs_secret) {
		let tag = req.body.commits[0].message;
		tag = tag.replace(/(?:\r\n|\r|\n)/g, '');

		exec(`cd /var/www/cdn/ && mkdir ${tag} && cd ${tag} && git init && git pull http://git.rodin.space/rodin/Rodin-JS.git`, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				res.status(400).send({error: error, secret: true, headers: req.headers, body: req.body});
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
			res.status(200).send({secret: true, headers: req.headers, body: req.body});
		});
	} else {
		res.status(400).send({secret: false, headers: req.headers, body: req.body});
	}
};