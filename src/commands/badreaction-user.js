const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'badreaction-user',
    aliases: ["badreaction",],
    icon: 'mdi-thumb-down',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid>',
	description: 'Give an user bad reactions on every message',
	execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        msg.delete();
        logService.log(`Added ${args[0]} to badreactions list`);

        discordBot.addBadReactionMessageUser(args[0]);
	},
    executeAPI(msg, args, client) {
        logService.log(`Added ${args[0]} to badreactions list`);
        discordBot.addBadReactionMessageUser(args[0]);
	},
};