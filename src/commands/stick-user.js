const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');
const logService = require('../log.js');

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
        logService.log(`Sticked ${args[0]} to ${args[1]}`);
        discordBot.addStickyUser(args[0],args[1]);
	},
    executeAPI(msg, args, client) {
        logService.log(`Sticked ${args[0]} to ${args[1]}`);
        discordBot.addStickyUser(args[0],args[1]);
	},
};