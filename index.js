const Discord = require('discord.js');
const { token } = require('./config.json');
const chalk = require('chalk');
const { info, error } = require('console');
const commandHandler = require('./handlers/Command-Handler.js')

const client = new Discord.Client();


const log = console.log;

commandHandler(client);

client.once('ready', () => {
	console.log(chalk.green.bold('Ready!'));
	
});

client.on('guildCreate', guild =>{

	let defaultChannel = "";
		guild.channels.cache.forEach((channel) => {
		if(channel.type == "text" && defaultChannel == "") {
			if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
			defaultChannel = channel;
			}
		}
		})

defaultChannel.send('Witam jestem Yuna. Mój prefix to `y.` Miło was poznać :D')
	
})

//login the bot
client.login(token);

client.on('debug', () =>{} )
client.on('error', msg =>{
	log(chalk.yellow(`error: ${error}`));
} )
client.on('warn', msg =>{
	log(chalk.yellow(`warn: ${info}`));
} )