const { MessageEmbed } = require('discord.js');
const config = require('../lib/config');
const reddit = require('../lib/reddit');

module.exports = {
    name: 'meme',
    description: 'sends memes',
    async execute(msg, client) {
        // get mention or author
        let user = msg.mentions.members.first();
        if (user == undefined || user.id == config.botID) {
            user = msg.author;
        }

        let data = await reddit.getMeme(msg, user).catch(console.error);
    }
};
