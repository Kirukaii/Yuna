const { MessageEmbed, GuildMember } = require('discord.js');
const chalk = require('chalk');
module.exports = {
    name: 'profile',
    aliases: ['p'], 
    description: 'shows profile',
    category: 'main',
	execute(message, client, args, log) {

        var user = message.mentions.users.first();
        var author = message.author;
        
        
        
        if (!nickname) {
          nickname = "brak"
        }

        if (!user) {
          var nickname = message.member.nickname;
          const dataC = message.member.user.createdAt;
          const dataJ = message.member.guild.joinedAt

          Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
          }

          
          dCformat = [dataC.getDate().padLeft(),
                    (dataC.getMonth()+1).padLeft(),
                    dataC.getFullYear()].join('/')+' '+
                    [dataC.getHours().padLeft(),
                     dataC.getMinutes().padLeft(),
                     dataC.getSeconds().padLeft()].join(':');

          dJformat = [dataJ.getDate().padLeft(),
                    (dataJ.getMonth()+1).padLeft(),
                    dataJ.getFullYear()].join('/')+' '+
                  [dataJ.getHours().padLeft(),
                    dataJ.getMinutes().padLeft(),
                    dataJ.getSeconds().padLeft()].join(':');         
          
          
          
          const myProfileEmbed = new MessageEmbed()
          .setColor('#42f58a')
          .setTitle("Twój Profil")
          .setThumbnail(author.displayAvatarURL())
          .addField("Nazwa:", author.username, true)
          .addField("ID:", author.id, true)
          .addField("Pseudonim:", nickname, true)
          .addField("Role:", `<@&${message.guild.member(author)._roles.join('> <@&')}>`)
          .addField("Konto stworzone:", dCformat)
          .addField("Dołączenie do serwera:", dJformat )
          .setTimestamp()
          .setFooter('Yuna', client.user.displayAvatarURL());
          
         message.channel.send(myProfileEmbed);

        }else {

          var nickname = user.nickname;

          const dataC = user.createdAt;
          const dataJ = message.guild.member(user).joinedAt

          Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
          }

          
          dCformat = [dataC.getDate().padLeft(),
                    (dataC.getMonth()+1).padLeft(),
                    dataC.getFullYear()].join('/')+' '+
                    [dataC.getHours().padLeft(),
                     dataC.getMinutes().padLeft(),
                     dataC.getSeconds().padLeft()].join(':');

          dJformat = [dataJ.getDate().padLeft(),
                    (dataJ.getMonth()+1).padLeft(),
                    dataJ.getFullYear()].join('/')+' '+
                  [dataJ.getHours().padLeft(),
                    dataJ.getMinutes().padLeft(),
                    dataJ.getSeconds().padLeft()].join(':');         
          
          
          
          const myProfileEmbed = new MessageEmbed()
          .setColor('#42f58a')
          .setTitle("Twój Profil")
          .setThumbnail(author.displayAvatarURL())
          .addField("Nazwa:", user.username, true)
          .addField("ID:", user.id, true)
          .addField("Pseudonim:", nickname, true)
          .addField("Role:", `<@&${message.guild.member(user)._roles.join('> <@&')}>`)
          .addField("Konto stworzone:", dCformat)
          .addField("Dołączenie do serwera:", dJformat )
          .setTimestamp()
          .setFooter('Yuna', client.user.displayAvatarURL());
          
         message.channel.send(myProfileEmbed);
         
        }

	},
};