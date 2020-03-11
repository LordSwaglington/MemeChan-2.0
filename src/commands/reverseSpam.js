const config = require('../lib/config');
const reddit = require('../lib/reddit');
const replies = require('../lib/replies');

module.exports = {
    name: 'uno reverse card',
    description: 'spams the spammer that spammed the spam',
    async execute(msg, client) {
        if (client.commands.get('spam').spam == true) {
            // send reverse card to chat
            msg.channel.send(replies.getReply('reverse'));

            // set user to author and author to user
            client.commands.get('spam').user = client.commands.get(
                'spam'
            ).author;
            client.commands.get('spam').author = msg.author;
            return;
        }
    }
};
