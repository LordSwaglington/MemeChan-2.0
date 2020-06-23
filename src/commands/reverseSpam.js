const spamHandler = require('../lib/spamHandler');
const replies = require('../lib/replies');

module.exports = {
	name: 'uno reverse card',
	description: 'spams the spammer that spammed the spam',
	execute(msg, client) {
		if (spamHandler.reverseSpam(msg.channel.id, msg)) {
			msg.channel.send(replies.getReply('reverse'));
		}
	}
};
