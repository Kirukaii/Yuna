const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	aliases: ['p'],
	description: '',
	cooldown: 5,
	category: 'main',
	execute(message, client, args) {

		var yourping = new Date().getTime() - message.createdTimestamp
		var botping = Math.round(client.ws.ping)
		const helpEmbed = new Discord.MessageEmbed()
            .setColor('#fbff00')
            .setAuthor(`Yuna's Ping`, client.user.displayAvatarURL())
            .setTitle(`🏓Pong.🏓\n:robot: Opóźnienie: ${yourping}ms \n:stopwatch: Opóźnienie Api: ${botping}ms`)
            .setThumbnail(client.user.displayAvatarURL())

          
          message.channel.send(helpEmbed);
		// message.channel.send('🏓Pong.🏓');
		// message.channel.send(`:robot: Opóźnienie: ${yourping}ms \n:stopwatch: Opóźnienie Api: ${botping}ms`)
	},
};