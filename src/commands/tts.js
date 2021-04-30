const discordBot = require('../bot.js');
const googleTTS = require('google-tts-api');
const logService = require('../log.js');

module.exports = {
	name: 'tts',
    aliases: ['texttospeech'],
	description: 'Talk with an user!',
    icon: 'mdi-text-to-speech',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<channelid> <speed-true-or-false> <message-string>',
	async execute(msg, args, client) {
        if(!args[0] || !args[1]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        let message = "";
        for(i = 2; i < args.length; i++){
            message += " " + args[i];
        }

        const url = googleTTS.getAudioUrl(message.trim(), {
            lang: 'de',
            slow: Boolean(args[1]),
            host: 'https://translate.google.com',
        });

        targetChannel = client.channels.cache.get(`${args[0]}`);
        discordBot.connection = await targetChannel.join();
        discordBot.dispatcher = discordBot.connection.play(url);
        discordBot.dispatcher.setVolume(1.0);

        logService.log("Spoke TTS Message");

        discordBot.dispatcher.on('finish', () => {
            discordBot.connection.disconnect();
        });

        msg.delete();
	},
    async executeAPI(msg, args, client) {
        let message = "";
        for(i = 2; i < args.length; i++){
            message += " " + args[i];
        }

        const url = googleTTS.getAudioUrl(message.trim(), {
            lang: 'de',
            slow: Boolean(args[1]),
            host: 'https://translate.google.com',
        });

        targetChannel = client.channels.cache.get(`${args[0]}`);
        discordBot.connection = await targetChannel.join();
        discordBot.dispatcher = discordBot.connection.play(url);
        discordBot.dispatcher.setVolume(1.0);

        discordBot.dispatcher.on('finish', () => {
            discordBot.connection.disconnect();
        });
	},
};