const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
    description: 'wyświetla avatar',
    usage: '<nick>',
    cooldown: 3,
	execute(message, args) {
        var user = message.mentions.users.first();
        if(!user){
            user = message.author;
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(user.username)       
        .setImage(user.displayAvatarURL({dynamic: true, size: 1024  }))
        .setColor('#275BF0')
        message.channel.send(embed)
        
        
	},
};