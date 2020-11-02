const Discord = require('discord.js');
const { prefix } = require('./../../config.json');
module.exports = {
    name: 'help',
    description: 'Lista komend',
    aliases: ['h', 'commands'],
    usage: '<Nazwa komendy>',
    cooldown: '3',
      execute(message, client, args) {
        const data = [];
        const { commands } = message.client;  

        
        if (!args[0]) {
          const a = commands.filter(command => command.category != 'dev');
          const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`Yuna's Commands`, client.user.displayAvatarURL())
            .setTitle(a.map(command => command.name).join('\n'))
            .setDescription(`\nUżyj \`${prefix}help [Nazwa Komendy]\` by dowiedzieć się więcej o danej komendzie!`)
            .setThumbnail(client.user.displayAvatarURL())

          
          message.channel.send(helpEmbed);
          
            // data.push('Lista moich komend:');
            // data.push("**"+);
            // data.push(`\nUżyj\`${prefix}help [Nazwa Komendy]\` by dowiedzieć się więcej o danej komendzie!`);
            
            
            // return message.channel.send(data, { split: true })
                // .then(() => {
                //     if (message.channel.type === 'dm') return;
                //     message.reply('Wysłałam ci DM ze wszystkimi komendami :wink:');
                // })
                // .catch(error => {
                //     console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                //     message.reply('Nie mogę wysłać ci wiadmości! :confused: ');
                // });
        }else{
          
          const name = args[0].toLowerCase();
          const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

          if (!command) {
            return message.reply('Taka komenda nie istnieje!');
          }

          const helpEmbed2 = new Discord.MessageEmbed()
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




                // data.push(`**Nazwa:** ${command.name}`);

                // if (command.aliases) data.push(`**Skróty:** ${command.aliases.join(', ')}`);
                // if (command.description) data.push(`**Opis:** ${command.description}`);
                // if (command.usage) data.push(`**Użycie:**  ${prefix}${command.name} ${command.usage}`);

                // data.push(`**Czas odnowienia:** ${command.cooldown || 3} second(s)`);

                // message.channel.send(data, { split: true });
         }
      },
  };