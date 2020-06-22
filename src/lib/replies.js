'use strict';

const fs = require('fs');
const utils = require('./utils');

const repliesPath = './src/data/replies.json';

module.exports = {
	getReply: function (type) {
		let str = fs.readFileSync(repliesPath, 'utf8');
		let jsonData = JSON.parse(str);

		let reply = jsonData[type][utils.randomRange(jsonData[type].length)];
		return reply;
	},
	getReplyWithUser(user, type) {
		let reply = this.getReply(type);
		reply = reply.replace('<user>', user);
		return reply;
	}
};
