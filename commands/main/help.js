const { MessageEmbed } = require('discord.js');
const { prefix } = require('./../../config.json');
module.exports = {
    name: 'help',
    description: 'Lista komend',
    aliases: ['h', 'commands'],
    usage: '<Nazwa komendy>',
    cooldown: '3',
    category: 'main',
      execute(message, client, args) {
        const data = [];
        const { commands } = message.client;  

        
        if (!args[0]) {
          const a = commands.filter(command => command.category != 'dev');
          const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`Yuna's Commands`, client.user.displayAvatarURL())
            .setTitle(a.map(command => command.name).join('\n'))
            .setDescription(`\nUżyj \`${prefix}help [Nazwa Komendy]\` by dowiedzieć się więcej o danej komendzie!`)
            .setThumbnail(client.user.displayAvatarURL())

          
          message.channel.send(helpEmbed);
          
        }else{
          
          const name = args[0].toLowerCase();
          const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

          if (!command) {
            return message.reply('Taka komenda nie istnieje!');
          }

          const helpEmbed2 = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`Command Info`, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .addField(`**Name:**`, `${command.name}`)
            .addField(`**Czas odnowienia:**`, `${command.cooldown || 3} second(s)`)           
            if (command.aliases){
              helpEmbed2.addField(`**Skróty:**`, `${command.aliases.join(', ')}`) 
            }else if(command.description){
              helpEmbed2.addField(`**Opis:**`, `${command.description}`)
            }else if(command.usage){
              helpEmbed2.addField(`**Użycie:**`, `${prefix}${command.name} ${command.usage}`)
            }

          
          message.channel.send(helpEmbed2);
   
         }
      },
  };