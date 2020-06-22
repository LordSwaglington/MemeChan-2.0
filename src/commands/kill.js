const config = require('../lib/config');
const replies = require('../lib/replies');

module.exports = {
	name: 'kill',
	description: 'kills someone',
	async execute(msg, client) {
		let message = msg.content.toLowerCase().trim();

		let user = msg.mentions.members.first();
		let reply = '';

		if (
			(user != undefined && user.id == config.botID) ||
			message.includes('yourself')
		) {
			reply = replies.getReply('killself');
		}

		if (message.includes('me')) {
			reply = replies.getReply('kill');
		}

		if (reply != '') {
			msg.channel.send(reply);
		}
	}
};
