const ytdl = require('ytdl-core');
const discordBot = require('../bot.js');

module.exports = {
	name: 'play',
    aliases: ['spiel'],
    icon:'mdi-play-circle',
    category:'Musik',
	description: 'Play youtube video in voice channel',
    webExe: true,
    args: true,
    usage: '<youtube-link> <channelid>',
	async execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }
        
        const guild = client.guilds.cache.get(`577214111767592960`);
        const videoURL = args[0];
        const msgSenderChannel = guild.members.cache.get(`${msg.author.id}`).voice.channel;
        let targetChannel;

        if(args[1]){
            targetChannel = client.channels.cache.get(`${args[1]}`);
        } else {
            if(msgSenderChannel){
                targetChannel = msgSenderChannel;
            } else {
                return msg.reply('User muss erst in einem Voice-Channel sein!');
            }
        }

        discordBot.connection = await targetChannel.join();
        discordBot.dispatcher = discordBot.connection.play(ytdl(`${videoURL}`, { filter: 'audioonly'}));
        
        discordBot.dispatcher.setVolume(1.0);
        
        discordBot.dispatcher.on('finish', () => {
            connection.disconnect();
        });

        msg.delete();
	},
    async executeAPI(msg, args, client) {
        const videoURL = args[0];
        let targetChannel;

        targetChannel = client.channels.cache.get(`${args[1]}`);

        discordBot.connection = await targetChannel.join();
        discordBot.dispatcher = discordBot.connection.play(ytdl(`${videoURL}`, { filter: 'audioonly'}));
        
        discordBot.dispatcher.setVolume(1.0);
        
        discordBot.dispatcher.on('finish', () => {
            discordBot.connection.disconnect();
        });
	},
};