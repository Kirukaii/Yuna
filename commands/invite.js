const Discord = require('discord.js');
module.exports = {
    name: 'invite',
    aliases: ['i'], 
    description: 'Zaproszenie bota',
    cooldown: '5',
	execute(message, client, args) {
        const inviteEmbed = new Discord.MessageEmbed()
            .setColor('#9900ff')
            .setAuthor(`Yuna's Invite Link`, client.user.displayAvatarURL())
            .setTitle('Zaproś Bota')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=556569633751040009&permissions=8&scope=bot')

          
          message.channel.send(inviteEmbed);
	},
};
