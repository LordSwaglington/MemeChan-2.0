'use strict';

const dataHandler = require('./dataHandler');
const utils = require('./utils');
const config = require('./config');

const posts = {
	memes: ['test'],
	nsfw: []
};
let refreshDate = {
	memes: '',
	nsfw: ''
};

/**
 * returns random post from cache
 * @param {string} rditlist - name of the list (memes, nsfw)
 */
const getData = async (rditlist) => {
	// check cache & refresh date
	if (posts[rditlist].length == 0 || refreshDate[rditlist] != utils.date()) {
		console.log(`refreshing ${rditlist} cache`);
		posts[rditlist].length = 0;
		refreshDate[rditlist] = utils.date();

		for (const sub of config.rditList[rditlist]) {
			const data = await dataHandler.getData(sub).catch(console.error);
			_processData(data, rditlist);
		}
	}

	return posts[rditlist][utils.randomRange(posts[rditlist].length)];
};

const _processData = (data, rditlist) => {
	if (data.error || !data || !data.data.children) {
		console.error(`could not fetch`);
		return;
	}

	data.data.children.forEach((child) => {
		//console.log(`getting ${child.data.subreddit}`);

		if (
			child.data.post_hint == 'image' ||
			child.data.url.endsWith('png') ||
			child.data.url.endsWith('jpg') ||
			child.data.url.endsWith('gif')
		) {
			posts[rditlist].push({
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
