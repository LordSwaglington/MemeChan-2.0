const dataHandler = require('./lib/dataHandler');
const dataCache = require('./lib/dataCache');

const main = async () => {
	//let data = await dataHandler.getData('memes', 'memes');
	let data = await dataCache.getData('memes');
	console.log(`res= ${data.subreddit}`);
};

main();
