const prefix = process.env.PREFIX;
const Discord = require('discord.js');

module.exports = {
	name: 'rickroll',
    aliases: [],
    args: true,
    icon: 'mdi-hand-okay',
    category:'Troll',
    webExe: true,
    usage: '<@user> <channelid>',
	description: 'Rickroll an user!',
	execute(msg, args, client) {
        if(!args[0] || !args[1]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        const videolinks = [
            "https://www.youtube.com/watch?v=RM88KhLw0oA", 
            "https://www.youtube.com/watch?v=xn6hhrX34Pw", 
            "https://www.youtube.com/watch?v=ZwP47xAZmBs", 
            "https://www.youtube.com/watch?v=iD1NIbEpVBs", 
            "https://www.youtube.com/watch?v=LB1bJRUol4Y",
            "https://www.youtube.com/watch?v=DCmh5fvgqq4",
            "https://www.youtube.com/watch?v=pOeig6_aAtE",
            "https://www.youtube.com/watch?v=eNn-gbXxAG8",
            "https://www.youtube.com/watch?v=F9fmRy6-9GE",
            "https://www.youtube.com/watch?v=Tlwda9S58Lg",
            "https://www.youtube.com/watch?v=4bOcKgQssdA"
        ];
      
        const taggedUser = msg.mentions.users.first();
        const messageChannel = client.channels.cache.get(args[1]);

        messageChannel.send(`Schau dir mal dieses Video an <@${taggedUser.id}> 😯`);

        msg.delete({timeout:500});

        const randomNumber = Math.floor(Math.random()*videolinks.length);

        const rickRollEmbed = new Discord.MessageEmbed().setTitle(`${videolinks[randomNumber]}`).setURL(`${videolinks[randomNumber]}`);
        messageChannel.send(rickRollEmbed);
	},
    executeAPI(msg, args, client) {
        const videolinks = [
            "https://www.youtube.com/watch?v=RM88KhLw0oA", 
            "https://www.youtube.com/watch?v=xn6hhrX34Pw", 
            "https://www.youtube.com/watch?v=ZwP47xAZmBs", 
            "https://www.youtube.com/watch?v=iD1NIbEpVBs", 
            "https://www.youtube.com/watch?v=LB1bJRUol4Y",
            "https://www.youtube.com/watch?v=DCmh5fvgqq4",
            "https://www.youtube.com/watch?v=pOeig6_aAtE",
            "https://www.youtube.com/watch?v=eNn-gbXxAG8",
            "https://www.youtube.com/watch?v=F9fmRy6-9GE",
            "https://www.youtube.com/watch?v=Tlwda9S58Lg",
            "https://www.youtube.com/watch?v=4bOcKgQssdA"
        ];
      
        const taggedUser = msg.mentions.users.first();
        const messageChannel = client.channels.cache.get(args[1]);

        messageChannel.send(`Schau dir mal dieses Video an <@${taggedUser.id}> 😯`);

        const randomNumber = Math.floor(Math.random()*videolinks.length);

        const rickRollEmbed = new Discord.MessageEmbed().setTitle(`${videolinks[randomNumber]}`).setURL(`${videolinks[randomNumber]}`);
        messageChannel.send(rickRollEmbed);
	},
};