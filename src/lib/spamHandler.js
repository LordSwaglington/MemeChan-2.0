'use strict';

const { MessageEmbed } = require('discord.js');
const config = require('./config');
const rdit = require('./rdit');
const replies = require('./replies');

const spamList = [];
const spamUser = [];

/**
 * adds channel to spamlist
 * @param msg - message object
 * @param user - user to add
 */
const addSpamUser = (msg, user) => {
	// if there is no target set author as target
	if (user.target == undefined) {
		user.target = msg.author;
	}

	// duplicate spam check
	if (spamList.includes(user.channel.id)) {
		msg.channel.send(replies.getReply('duplicate'));
		return;
	}

	// avoid bot spam
	if (user.target.id == config.botID) {
		msg.channel.send(replies.getReply('self'));
		return;
	}

	spamList.push(user.channel.id);
	spamUser.push(user);

	// only run clock once
	if (spamList.length == 1) {
		_spamMeme();
	}
};

/**
 * removes channel from spamlist
 * @param id - channel id
 * @returns - true if channel is found
 */
const removeSpamUser = (id) => {
	if (spamList.includes(id)) {
		const index = spamList.indexOf(id);

		spamList.splice(index, 1);
		spamUser.splice(index, 1);

		return true;
	} else {
		return false;
	}
};

/**
 * removes channel from spamlist
 * @param id - channel id
 * @param msg - message object
 * @returns - true if channel is found
 */
const reverseSpam = (id, msg) => {
	if (spamList.includes(id)) {
		const index = spamList.indexOf(id);

		spamUser[index].target = spamUser[index].author;
		spamUser[index].author = msg.author;

		return true;
	} else {
		return false;
	}
};

// spams user with memes
// needs to be async or it cant be stopped
const _spamMeme = async () => {
	const check = async function () {
		if (spamList.length == 0) {
			return;
		} else {
			const embed = await rdit.createPost('memes');

			for (const user of spamUser) {
				user.channel.send(
					replies.getReplyWithUser(user.target, 'meme')
				);
				user.channel.send(embed);
			}

			setTimeout(check, config.spamDelay);
		}
	};
	check();
};

module.exports = {
	addUser: addSpamUser,
	removeUser: removeSpamUser,
	reverseSpam: reverseSpam
};
