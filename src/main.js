'use strict';

require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const utils = require('./lib/utils');

const client = new Discord.Client();
const token = process.env.TOKEN;
const PREFIX = 'senpai';

// load command list
client.commands = new Discord.Collection();
const cmdFiles = fs
    .readdirSync('./src/commands/')
    .filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// log in
client.login(token);

// on client online
client.on('ready', () => {
    console.log('MemeChan is online');
    client.user.setActivity('with reddit-chan');

    utils.initCache('memes');
});

// on client message
client.on('message', msg => {
    // clean up message
    let message = msg.content.toLowerCase().trim();
    // if a command is called
    if (message.startsWith(PREFIX)) {
        // remove prefix and split command into parts
        let args = message
            .substring(PREFIX.length)
            .trim()
            .split(' ');

        // loop through commands
        switch (args[0]) {
            // help command
            case 'help':
                console.log('!help received');
                client.commands.get('help').execute(msg, client);
                break;

            // meme command
            case 'meme':
                console.log('!meme received');
                client.commands.get('meme').execute(msg, client);
                break;

            case 'spam':
                console.log('!spam received');
                client.commands.get('spam').execute(msg, client);
                break;

            case 'stop':
                console.log('!stop received');
                client.commands.get('stop').execute(msg, client);
                break;

            case 'uno':
                if (message.includes('uno reverse card')) {
                    console.log('!revese received');
                    client.commands
                        .get('uno reverse card')
                        .execute(msg, client);
                }
                break;

            case 'kill':
                client.commands.get('kill').execute(msg, client);
                break;
        }
    }
});
