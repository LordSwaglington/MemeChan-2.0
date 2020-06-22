'use strict';

const dataHandler = require('./dataHandler');
const utils = require('./utils');
const config = require('./config');

const posts = [];
let refreshDate;

/**
 * returns random post from cache
 */
const getData = async () => {
	// todo: check cache & refresh date
	// cache refresh

	if (posts.length == 0 || refreshDate != utils.date()) {
		console.log('refreshing cache');
		posts.length = 0;
		refreshDate = utils.date();

		for (const sub of config.rditList.memes) {
			const data = await dataHandler.getData(sub);
			_processData(data);
		}
	}

	return posts[utils.randomRange(posts.length)];
};

const _processData = (data) => {
	data.data.children.forEach((child) => {
		if (
			child.data.post_hint == 'image' ||
			child.data.url.endsWith('png') ||
			child.data.url.endsWith('jpg') ||
			child.data.url.endsWith('gif')
		) {
			posts.push({
				title: child.data.title,
				imgUrl: child.data.url,
				postUrl: `https://www.reddit.com${child.data.permalink}`,
				subreddit: child.data.subreddit,
				upvotes: child.data.ups
			});
		}
	});
};

module.exports = {
	getData: getData
};
