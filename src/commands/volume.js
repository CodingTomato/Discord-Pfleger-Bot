const ytdl = require('ytdl-core');
const discordBot = require('../bot.js');

module.exports = {
	name: 'volume',
    aliases: ['lautstärke'],
	description: 'Control volume of youtube video',
    icon: 'mdi-volume-high',
    category: 'Musik',
    webExe: true,
    args: true,
    usage: '<volume-0.1-1.0>',
	async execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }
        
        const volume = args[0];

        if(discordBot.dispatcher){
            discordBot.dispatcher.setVolume(volume);
        } else {
            return msg.channel.send(`Es wird gerade keine Musik abgespielt, ${msg.author}! 🤔`);
        }
        
        msg.delete();
	},
    async executeAPI(msg, args, client) {
        const volume = args[0];

        if(discordBot.dispatcher){
            discordBot.dispatcher.setVolume(volume);
        }
	},
};