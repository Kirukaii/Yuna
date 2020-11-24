const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');
module.exports = {
    name: 'profile',
    aliases: ['p'], 
    description: 'shows profile',
    category: 'main',
	execute(message, client, args, log) {
        var author = message.author;
        
        var nickname = message.member.nickname;
        if (!nickname) {
          nickname = "brak"
        }

        if (args[0]) {
            

        }else {
          const myProfileEmbed = new MessageEmbed()
          .setColor('#42f58a')
          .setTitle("Twój Profil")
          .setThumbnail(author.displayAvatarURL())
          .addField("Nazwa:", author.username, true)
          .addField("ID:", author.id, true)
          .addField("Pseudonim:", nickname, true)
          .addField("Role:", `<@&${message.guild.member(author)._roles.join('> <@&')}>`)
          .addField("Konto stworzone:")
          .addField("Dołączenie do serwera:", message.author.joinedAt)
          .setTimestamp()
          .setFooter('Yuna', client.user.displayAvatarURL());
          
         message.channel.send(myProfileEmbed);
        }

	},
};