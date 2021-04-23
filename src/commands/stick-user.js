const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');

module.exports = {
	name: 'stick-user',
    aliases: ["stick",],
    icon: 'mdi-sticker-plus',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid> <channelid>',
	description: 'Stick an user to voice channel!',
	execute(msg, args, client) {
        if(!args[0] || !args[1]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        msg.delete();

        discordBot.addStickyUser(args[0],args[1]);
	},
    executeAPI(msg, args, client) {
        discordBot.addStickyUser(args[0],args[1]);
	},
};