'use strict';

const request = require('request');
const config = require('./config');
const utils = require('./utils');
const replies = require('./replies');
const { MessageEmbed } = require('discord.js');

module.exports = {
    getMeme: async function(msg, user) {
        let data = await checkCache()
            .then(value => {
                let post = value.data[utils.randomRange(value.data.length)];
                // return post;

                // workaround: currently making embed here instead of meme.js because async functions suck
                msg.channel.send(replies.getReplyWithUser(user));
                const embed = new MessageEmbed()
                    .setTitle(post.title.substring(0, 256))
                    .setImage(post.imgUrl)
                    .setURL(post.postUrl)
                    .setFooter(`sauce: r/${post.subreddit} | ${post.upvotes}👍`)
                    .setColor(config.botColor);
                msg.channel.send(embed);
            })
            .catch(error => {
                // todo: program crashes during cache refresh
                console.error(error);
                return;
            });
    }
};

async function checkCache() {
    let date = utils.date();
    if (config.cacheDate == date) {
        // do stuff
        console.log('getting data from cache');
        return utils.readFromCache();
    } else {
        // refresh cashe
        console.log('refreshing cached data');
        await getData();
        return utils.readFromCache();
    }
}

async function getData() {
    utils.clearCache();
    config.rditList.forEach(subreddit => {
        console.log('fetching ' + subreddit);
        fetchData(subreddit);
    });
}

async function fetchData(sub) {
    const url = `https://www.reddit.com/r/${sub}/hot.json?limit=50`;

    var options = {
        url: url,
        method: 'GET',
        headers: {
            Accept: 'text/html',
            'User-Agent': 'Chrome'
        }
    };

    request(options, function(error, response, responseBody) {
        // error checking
        if (error) {
            console.log('error: request failed');
            return;
        }

        // convert gibberish to json data
        let jsonData = JSON.parse(responseBody);

        // error checking
        if (jsonData.error == 404) {
            console.log('error: url not found');
            return;
        }

        return processData(jsonData);
    });
}

function processData(data) {
    let posts = [];

    data.data.children.forEach(child => {
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

    utils.appendCache(posts);
}
