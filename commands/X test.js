const Discord = require('discord.js');
const chalk = require('chalk');
module.exports = {
    name: 'test',
    aliases: ['t'], 
    description: 'test',
    category: 'dev',
	execute(message, client, args, log) {
        message.channel.send("test");
	},
};