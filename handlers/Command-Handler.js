const { Collection } = require("discord.js");
const { readdirSync } = require('fs');
const { prefix } = require(__dirname + '/../config.json');
const log = console.log;
const chalk = require('chalk');
const cooldowns = new Collection();

module.exports = (client) => {

    client.commands = new Collection();
    const commandFiles = readdirSync(__dirname + '/../commands/').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`);
    
        // set a new item in the Collection
        // with the key as the command name and the value as the exported module
        log(file)
        client.commands.set(command.name, command);
    }

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
    			  
	//log(chalk.magenta(`${dformat} | ${message.guild.name} | ${message.channel.name} | ${message.author.username}: ${message.content}`));
    

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
		cooldowns.set(command.name, new Collection());
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



        try {
            command.execute(message, client, args, log);
        } catch (error) {
            console.error("Błąd:" + error);
            message.reply('Wystąpił problem z wykonaniem komendy!');
        }
    });

}