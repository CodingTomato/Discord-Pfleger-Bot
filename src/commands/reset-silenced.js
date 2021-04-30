const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'unsilence-user',
    aliases: ["unsilence",],
    icon: 'mdi-message-bulleted',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid>',
	description: 'Unmute an user in every chat channel!',
	execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        logService.log("Reset silenced user list");

        msg.delete();

        discordBot.removeSilenceUser(args[0]);
	},
    executeAPI(msg, args, client) {
        logService.log("Reset silenced user list");
        discordBot.removeSilenceUser(args[0]);
	},
};