const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'remove-badreaction-user',
    aliases: ["remove-badreaction",],
    icon: 'mdi-thumb-down',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid>',
	description: 'Remove an user from bad reactions on every message',
	execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        msg.delete();
        logService.log(`Removed ${args[0]} from badreactions list`);

        discordBot.removeBadReactionMessageUser(args[0]);
	},
    executeAPI(msg, args, client) {
        logService.log(`Removed ${args[0]} from badreactions list`);
        discordBot.removeBadReactionMessageUser(args[0]);
	},
};