const ytdl = require('ytdl-core');
const discordBot = require('../bot.js');

module.exports = {
	name: 'scream',
    aliases: ['schrei'],
	description: 'Scream at an user!',
    icon: 'mdi-air-horn',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid>',
	async execute(msg, args, client) {
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

        if(!args[0].length){
            return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (scream userid)`);
        }

        const userid = args[0];
        const guild = client.guilds.cache.get(`577214111767592960`);
        const targetUser = guild.members.cache.get(`${userid}`);
        const currentChannel = targetUser.voice.channel;
        msg.delete({ timeout: 1000 });

        const randomNumber = Math.floor(Math.random()*videolinks.length);
        if (currentChannel) {
            discordBot.connection = await currentChannel.join();
            console.log(videolinks[randomNumber]);
            discordBot.dispatcher = discordBot.connection.play(ytdl(`${videolinks[randomNumber]}`, { filter: 'audioonly'}));
            
            discordBot.dispatcher.setVolume(1.0);
            
            discordBot.dispatcher.on('finish', () => {
                discordBot.connection.disconnect();
            });
        } else {
            return msg.reply('User muss erst in einem Voice-Channel sein!');
        }
	},
    async executeAPI(msg, args, client) {
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

        if(!args[0].length){
            return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (scream userid)`);
        }

        const userid = args[0];
        const guild = client.guilds.cache.get(`577214111767592960`);
        const targetUser = guild.members.cache.get(`${userid}`);
        const currentChannel = targetUser.voice.channel;

        const randomNumber = Math.floor(Math.random()*videolinks.length);
        if (currentChannel) {
            discordBot.connection = await currentChannel.join();
            console.log(videolinks[randomNumber]);
            discordBot.dispatcher = discordBot.connection.play(ytdl(`${videolinks[randomNumber]}`, { filter: 'audioonly'}));
            
            discordBot.dispatcher.setVolume(1.0);
            
            discordBot.dispatcher.on('finish', () => {
                discordBot.connection.disconnect();
            });
        }
	},
};