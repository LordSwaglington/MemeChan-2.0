'use strict';

const cache = require('./dataCache');
const config = require('./config');
const { MessageEmbed } = require('discord.js');

/**
 * returns a discord embed with a meme
 */
const createPost = async (rditlist) => {
	const post = await cache.getData(rditlist).catch((err) => {
		console.error(err);
		return;
	});

	const embed = new MessageEmbed()
		.setTitle(post.title.substring(0, 256))
		.setImage(post.imgUrl)
		.setURL(post.postUrl)
		.setFooter(`sauce: r/${post.subreddit} | ${post.upvotes}👍`)
		.setColor(config.botColor);

	return embed;
};

module.exports = {
	createPost: createPost
};
