const { MessageEmbed } = require('discord.js');
const config = require('../lib/config');
const rdit = require('../lib/rdit');
const replies = require('../lib/replies');

module.exports = {
	name: 'meme',
	description: 'sends memes',
	async execute(msg, client) {
		// get mention or author
		let user = msg.mentions.members.first();
		if (user == undefined || user.id == config.botID) {
			user = msg.author;
		}

		const embed = await rdit.createPost('memes');

		msg.channel.send(replies.getReplyWithUser(user, 'meme'));
		msg.channel.send(embed);
	}
};
