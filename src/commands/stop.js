const config = require('../lib/config');
const reddit = require('../lib/reddit');
const replies = require('../lib/replies');

module.exports = {
	name: 'stop',
	description: 'stops the spam',
	async execute(msg, client) {
		if (client.commands.get('spam').spam == true) {
			client.commands.get('spam').spam = false;
			msg.channel.send(replies.getReply('stop'));
			return;
		}
	}
};
