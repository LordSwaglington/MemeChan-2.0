const { MessageEmbed } = require('discord.js');
const config = require('../lib/config');
const reddit = require('../lib/dataHandler');
const replies = require('../lib/replies');

module.exports = {
	name: 'spam',
	description: 'spam someone with memes',
	spam: false,
	author: '',
	user: '',
	async execute(msg, client) {
		if (this.spam == true) {
			msg.channel.send(replies.getReply('duplicate'));
			return;
		} else {
			this.author = msg.author;

			// get mention or author
			this.user = msg.mentions.members.first();
			if (this.user == undefined) {
				this.user = msg.author;
			}

			// avoid bot spam
			if (this.user.id == config.botID) {
				msg.channel.send(replies.getReply('self'));
				return;
			}

			this.spam = true;
		}

		spamMeme(msg);
	}
};

// spams user with memes
// needs to be async or it cant be stopped
async function spamMeme(msg) {
	var check = function () {
		if (module.exports.spam == false) {
			return;
		} else {
			reddit
				.getPost(msg, module.exports.user, 'memes', 'meme')
				.catch(console.error);

			setTimeout(check, config.spamDelay);
		}
	};
	check();
}
