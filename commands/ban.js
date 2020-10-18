const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    aliases: ['b'], 
    description: 'Banuje osobę z serwera',
    cooldown: '2',
    category: 'mod',
	execute(message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('Nie masz odpowiednich permisji!');

        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if(!user) return message.channel.send("Podaj użytkownika!");
        let reason = args[1]
        if(!reason){
            reason = "nic"
        }
        user.ban().then(() => message.channel.send(`${user} został zbanowany za **${reason}**`));


	},
};
