const Discord = require('discord.js');

const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'wiretap',
    aliases: ['tap','abhören','intercept'],
	description: 'Tap a user',
    icon: 'mdi-record-rec',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid-to-tap> <channelid-recieve>',
	async execute(msg, args, client) {
        if(!args[0] || !args[1]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        let recordClient = new Discord.Client();

        logService.log("Trying to connect record bot to Discord ...");
        recordClient = new Discord.Client();
    
        recordClient.on('ready', async () => {
            logService.log(`Record bot connected (${client.user.tag})`);

            masterChannel = client.channels.cache.get(`${args[1]}`);
            const guild = recordClient.guilds.cache.get(`577214111767592960`);
            const targetUser = guild.members.cache.get(`${args[0]}`);
    
            if(!targetUser.voice.channel) {
                recordClient.destroy();
                return msg.reply("User ist nicht in einem Voice Channel!")
            }
            const recordChannel = targetUser.voice.channel;

            discordBot.recordConnection = await recordChannel.join(recordChannel);
            discordBot.connection = await masterChannel.join(masterChannel);

            const audio = discordBot.recordConnection.receiver.createStream(`${args[0]}`, {end: 'manual'});
            discordBot.connection.play(audio, { type: 'opus' });

            msg.delete();
        });

        recordClient.login(process.env.RECORD_BOT_TOKEN);
	},
    async executeAPI(msg, args, client) {
        
        let recordClient = new Discord.Client();

        logService.log("Trying to connect record bot to Discord ...");
        recordClient = new Discord.Client();
    
        recordClient.on('ready', async () => {
            logService.log(`Record bot connected (${client.user.tag})`);

            masterChannel = client.channels.cache.get(`${args[1]}`);
            const guild = recordClient.guilds.cache.get(`577214111767592960`);
            const targetUser = guild.members.cache.get(`${args[0]}`);
    
            if(!targetUser.voice.channel) {
                recordClient.destroy();
                return logService.error("User ist nicht in einem Voice Channel!")
            }
            const recordChannel = targetUser.voice.channel;

            discordBot.recordConnection = await recordChannel.join(recordChannel);
            discordBot.connection = await masterChannel.join(masterChannel);

            const audio = discordBot.recordConnection.receiver.createStream(`${args[0]}`, {end: 'manual'});
            discordBot.connection.play(audio, { type: 'opus' });
        });

        recordClient.login(process.env.RECORD_BOT_TOKEN);
	},
};