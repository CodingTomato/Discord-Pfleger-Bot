const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'reset-silenced',
    aliases: ["resetsilenced",],
    icon: 'mdi-message-bulleted',
    category: 'Troll',
    webExe: true,
    args: false,
    usage: '',
	description: 'Unmute an user in every chat channel!',
	execute(msg, args, client) {
        msg.delete();
        discordBot.resetSilencedUser();
        logService.log("Reset silenceduser list");
	},
    executeAPI(msg, args, client) {
        discordBot.resetSilencedUser();
        logService.log("Reset silenceduser list");
	},
};