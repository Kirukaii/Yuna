module.exports = {
    name: 'servers',
    aliases: ['s'],
    description: 'lista serwerów na których jestem',
    usage: 'y.servers',
    cooldown: 0,
    category: 'dev',
      execute(message, client, args) {

        var list =  client.guilds.cache.array().sort().join(" | ");
		    message.channel.send("Jestem na tych serwerach: " + "**"+list + "**");
        
      },
  };