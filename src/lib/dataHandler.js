'use strict';

const fetch = require('node-fetch');
const config = require('./config');

/**
 * gets data from subreddit
 * @param {string} sub - subreddit
 * @returns {JSON} - json data
 */
const getData = async (sub) => {
	const url = `https://www.reddit.com/r/${sub}/hot.json?limit=${config.postLimit}`;

	const results = await fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});
	const json = await results.json();
	return json;
};

module.exports = {
	getData: getData
};
