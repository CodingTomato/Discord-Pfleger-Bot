const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'sticky-mover',
    aliases: ["sm",],
    icon: 'mdi-sticker-plus',
    category: 'Troll',
    webExe: false,
    args: true,
    usage: '<action> <arguments>',
	description: 'Manage Sticky Mover',
	execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        switch(args[0]){
          case "start": 
            discordBot.startStickyMover();
            break;
          case "stop":
            discordBot.stopStickyMover();
            break;
          case "add":
            discordBot.addStickyUser(args[1],args[2]);
            break;
          default:
            break;
        }

        msg.delete();
        logService.log(`${args}`);
	},
    executeAPI(msg, args, client) {
        return;
	},
};