const { MessageEmbed } = require('discord.js');
const config = require('../lib/config');
const reddit = require('../lib/reddit');
const replies = require('../lib/replies');

module.exports = {
    name: 'spam',
    description: 'spam someone with memes',
    spam: false,
    async execute(msg, client) {
        if (this.spam == true) {
            msg.channel.send(replies.getReply('duplicate'));
            return;
        } else {
            this.spam = true;
        }

        spamMeme(msg);
    }
};

// spams user with memes
// needs to be async or it cant be stopped
async function spamMeme(msg) {
    var check = function() {
        if (module.exports.spam == false) {
            return;
        } else {
            // get mention or author
            let user = msg.mentions.members.first();
            if (user == undefined) {
                user = msg.author;
            }

            // avoid bot spam
            if (user.id == config.botID) {
                msg.channel.send(replies.getReply('self'));
                return;
            }

            reddit.getMeme(msg, user).catch(console.error);

            setTimeout(check, config.spamDelay); // check again in 5 second
        }
    };
    check();
}
