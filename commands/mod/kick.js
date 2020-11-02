const Discord = require('discord.js');
module.exports = {
    name: 'kick',
    aliases: ['k'], 
    description: 'Wyrzucza osobę z serwera',
    cooldown: '2',
    category: 'mod',
	execute(message, args) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('Nie masz odpowiednich permisji!');

        const user = message.mentions.users.first() || message.guild.members.get(args[0])
        if(!user) return message.channel.send("Podaj użytkownika!");
        const reason = args[1]
        if(!reason){
            reason = "nic"
        }
        user.kick().then(() => message.channel.send(`${user} został wyrzuczony za **${reason}**`));


	},
};
