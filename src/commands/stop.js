const spamHandler = require('../lib/spamHandler');
const replies = require('../lib/replies');

module.exports = {
	name: 'stop',
	description: 'stops the spam',
	execute(msg, client) {
		if (spamHandler.removeUser(msg.channel.id)) {
			msg.channel.send(replies.getReply('stop'));
		}
	}
};
