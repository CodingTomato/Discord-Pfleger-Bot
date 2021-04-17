const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');

module.exports = {
	name: 'silence-user',
    aliases: ["silence",],
    icon: 'mdi-message-bulleted-off',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid>',
	description: 'Mute an user in every chat channel!',
	execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        msg.delete();

        discordBot.addSilenceUser(args[0]);
	},
    executeAPI(msg, args, client) {
        discordBot.addSilenceUser(args[0]);
	},
};