const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const chalk = require('chalk');
const { info, error } = require('console');

const client = new Discord.Client();
const cooldowns = new Discord.Collection();

const log = console.log;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	log(file)
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(chalk.green.bold('Ready!'));
	
});

client.on('message', message => {
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	//check if the number is <10 if yes add a 0 to it
	Number.prototype.padLeft = function(base,chr){
		var  len = (String(base || 10).length - String(this).length)+1;
		return len > 0? new Array(len).join(chr || '0')+this : this;
	}
	//create new date
	var d = new Date,
	//format the date to todays date
	dformat = [d.getDate().padLeft(),
			  	(d.getMonth()+1).padLeft(),
			  	d.getFullYear()].join('/')+' '+
			  [d.getHours().padLeft(),
			  	d.getMinutes().padLeft(),
				d.getSeconds().padLeft()].join(':');
	//saving messages to console			  
	log(chalk.magenta(`${dformat} | ${message.guild.name} | ${message.channel.name} | ${message.author.username}: ${message.content}`));
	
	//const the command
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	//check if the command was used on dm
	if (message.channel.type === 'dm') return;
	//if message dont start with prefix or the message author is a bot, return
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	
	
	//check if args are necessary
	if (command.args && !args.length) {
		let reply = `Nie podałeś żadnych argumentów, ${message.author}!`;

		if (command.usage) {
			reply += `\nPoprawne użycie komendy to: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	//cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Proszę poczekaj ${timeLeft.toFixed(1)} sekund(y)(a) przed ponownym użyciem kommendy \`${command.name}\` `);
		}
		
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	// try to execute the command
	try {
		command.execute(message, client, args, log);
	} catch (error) {
		console.error(error);
		message.reply('Wystąpił problem z wykonaniem komendy!');
	}

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