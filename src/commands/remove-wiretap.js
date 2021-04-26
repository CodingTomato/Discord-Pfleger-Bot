const Discord = require('discord.js');

const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'remove-wiretap',
    aliases: [],
	description: 'Remove Tap from user',
    icon: 'mdi-stop-circle',
    category: 'Troll',
    webExe: true,
    args: false,
    usage: '',
	async execute(msg, args, client) {
        if(discordBot.recordConnection){
            discordBot.recordConnection.disconnect();
            discordBot.connection.disconnect();
        }

        msg.delete();
	},
    async executeAPI(msg, args, client) {
        if(discordBot.recordConnection){
            discordBot.recordConnection.disconnect();
            discordBot.connection.disconnect();
        }

        logService.log("Stopped Wiretap");
	},
};