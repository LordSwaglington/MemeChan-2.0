'use strict';

require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const token = process.env.TOKEN;
const PREFIX = 'senpai';

// load command list
client.commands = new Discord.Collection();
const cmdFiles = fs
    .readdirSync('./src/commands/')
    .filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}

// log in
client.login(token);

// on client online
client.on('ready', () => {
    console.log('MemeChan is online');
    client.user.setActivity('with reddit-chan');
});
