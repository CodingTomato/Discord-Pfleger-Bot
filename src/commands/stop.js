const ytdl = require('ytdl-core');
const discordBot = require('../bot.js');

module.exports = {
	name: 'stop',
    aliases: ['halt'],
	description: 'Stop any sound',
    icon: 'mdi-stop-circle',
    category: 'Musik',
    webExe: true,
    args: false,
    usage: '',
	async execute(msg, args, client) {
        if(discordBot.connection){
            discordBot.connection.disconnect();
        } else {
            return msg.channel.send(`Es wird gerade kein Ton abgespielt, ${msg.author}! 🤔`);
        }
        
        msg.delete();
	},
    async executeAPI(msg, args, client) {
        if(discordBot.connection){
            discordBot.connection.disconnect();
        }
	},
};