const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');

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
	},
    executeAPI(msg, args, client) {
        discordBot.resetSilencedUser();
	},
};