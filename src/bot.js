const fs = require('fs');
const Discord = require('discord.js');
const logService = require('./log.js');

let client = new Discord.Client();
client.commands = new Discord.Collection();
let isConnected = false;

let silencedUserIDs = [];
let stickyUserIDs = [];
let stickyMover = false;
let stickyMoverIntervall;

let dispatcher;
let connection;

module.exports.start = function (prefix, token) { 
    
    stickyUserIDs = [];
    clearInterval(stickyMoverIntervall);
    stickyMover = false;

    logService.log("Trying to connect bot to Discord ...");
    client = new Discord.Client();
    client.commands = new Discord.Collection();

    client.on('ready', () => {
        isConnected = true;
        logService.log(`Bot connected (${client.user.tag})`);
    });

    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    client.on('message', async msg => {
        if (msg.content.startsWith(process.env.STANDARD_PREFIX) && !msg.author.bot) {
            if (msg.author.id === '138377599335268353' || msg.author.id === '514467933494181912'){
                const args = msg.content.slice(process.env.STANDARD_PREFIX.length).trim().split(' ');
                const commandName = args.shift().toLowerCase();

                const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if (!command) return;
                if (command.args && !args.length) {
                    let reply = `Du hast keine Argumente angegeben, ${msg.author}!`;
                    if (command.usage) {
                        reply += `\nRichtig wäre: \`${process.env.STANDARD_PREFIX} ${command.name} ${command.usage}\``;
                    }

                    return msg.channel.send(reply);
                }

                try {
                    logService.log("Command recognized: " + msg.content)
                    command.execute(msg, args, client);
                } catch (error) {
                    logService.error(error);
                    msg.reply('Beim Ausführen des Kommandos ist ein Fehler aufgetreten! 😒');
                }
            } else {
                msg.delete({timeout:500});
                msg.channel.send(`Glaubst du wirklich, ich höre auf dich ${msg.author}? 😂🤣😂`);
            }
        } else {
            if(silencedUserIDs.indexOf(msg.author.id) >= 0){
                msg.delete();
            }
        }
    });

    client.login(token);
};

module.exports.exeCommand = function (msg) {
    const prefix = process.env.STANDARD_PREFIX; 

    const args = msg.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    try {
        logService.log("Command recognized: " + msg)
        command.executeAPI(msg, args, client);
    } catch (error) {
        logService.error(error);
    }
};

module.exports.addSilenceUser = function (userid) {
    silencedUserIDs.push(userid);
};

module.exports.addStickyUser = function (userid, channelid) {
    stickyUserIDs.push({userid: userid, channelid: channelid});
};

module.exports.startStickyMover = function () {
    if(!stickyMover){
        logService.log("Start StickyMover");
        stickyMover = true;
        stickyMoverIntervall = setInterval(() => {
            stickyUserIDs.forEach(stick => {
                const guild = client.guilds.cache.get(`577214111767592960`);
                const targetUser = guild.members.cache.get(`${stick.userid}`);
        
                const currentChannel = targetUser.voice.channelID;
                const stickyChannel = client.channels.cache.get(`${stick.channelid}`);
    
                if(currentChannel){
                    if(currentChannel !== stick.channelid){
                        targetUser.voice.setChannel(stickyChannel, "Troll");
                    }
                }
            });
        }, 1000);
    }
};

module.exports.stopStickyMover = function () {
    if(stickyMover){
        logService.log("Stop StickyMover");
        stickyMover = false;
        clearInterval(stickyMoverIntervall);
    }
};

module.exports.removeSilenceUser = function (userid) {
    silencedUserIDs = silencedUserIDs.filter((value) => {
        return value != userid;
    });
};

module.exports.resetSilencedUser = function (userid) {
    silencedUserIDs = [];
};

module.exports.getClient = function () {
    return client;
};

module.exports.getChannelFromID = function (channelid){
    const targetChannel = client.channels.cache.get(`${channelid}`);
    return targetChannel;
}

module.exports.getStatus = function () {
    let status = {};
    
    if(isConnected){
        status = {
            botstatus: client.presence.status,
            prefix: process.env.STANDARD_PREFIX,
            silencedUserIDs: silencedUserIDs,
            stickyUserIDs: stickyUserIDs,
            stickyMoverEnabled: stickyMover,
            channels: client.channels,
            users: client.users,
            commands: client.commands,
        };
    } else {
        status = {
            botstatus: "offline",
            prefix: process.env.STANDARD_PREFIX,
            silencedUserIDs: silencedUserIDs,
        };
    }

    return status;
};

module.exports.getCommands = function () {
    return client.commands;
};

module.exports.stop = function () {
    logService.log("Trying to disconnect bot...");
    try {
        client.destroy();
        isConnected = false;
        logService.log("Disconnected bot - Bye bye 👋");
        return "Stopping bot successfull";
    } catch (error) {
        logService.error("Disconnecting bot not successfull: "+ error);
        return "Disconnecting bot not successfull" + error;
    }
}