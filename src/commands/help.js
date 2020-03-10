const { MessageEmbed } = require('discord.js');
const config = require('../lib/config');

module.exports = {
    name: 'help',
    description: 'sends help',
    execute(msg, client) {
        const embed = new MessageEmbed()
            .setTitle('MemeChan Help')
            .setThumbnail(client.user.avatarURL)
            .setColor(config.botColor)
            .setFooter('bot by LordSwaglington');

        client.commands.forEach(command => {
            embed.addField(command.name, command.description);
        });

        msg.channel.send(embed);
    }
};
