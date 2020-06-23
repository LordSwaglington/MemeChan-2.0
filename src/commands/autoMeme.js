const { MessageEmbed } = require('discord.js');
const config = require('../lib/config');
const rdit = require('../lib/rdit');
const replies = require('../lib/replies');
const spamHandler = require('../lib/spamHandler');

module.exports = {
	name: 'spam',
	description: 'spam someone with memes',
	execute(msg, client) {
		// create spam user
		const user = {
			author: msg.author,
			target: msg.mentions.members.first(),
			channel: msg.channel
		};

		spamHandler.addUser(msg, user);
	}
};
