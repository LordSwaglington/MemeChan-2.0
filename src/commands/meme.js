const { MessageEmbed } = require('discord.js');
const config = require('../lib/config');
const reddit = require('../lib/reddit');

module.exports = {
    name: 'meme',
    description: 'sends memes',
    async execute(msg, client) {
        let data = await reddit.getMeme(msg).catch(console.error);
    }
};
