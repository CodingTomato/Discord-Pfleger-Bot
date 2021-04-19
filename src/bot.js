const fs = require('fs');
const Discord = require('discord.js');
const logService = require('./log.js');

let client = new Discord.Client();
client.commands = new Discord.Collection();
let isConnected = false;
let silencedUserIDs = [];
let dispatcher;
let connection;

module.exports.start = function (prefix, token) { 
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
        if (msg.content.startsWith(prefix) && !msg.author.bot) {
            if (msg.author.id === '138377599335268353' || msg.author.id === '514467933494181912'){
                const args = msg.content.slice(prefix.length).trim().split(' ');
                const commandName = args.shift().toLowerCase();

                const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if (!command) return;
                if (command.args && !args.length) {
                    let reply = `Du hast keine Argumente angegeben, ${msg.author}!`;
                    if (command.usage) {
                        reply += `\nRichtig wäre: \`${prefix} ${command.name} ${command.usage}\``;
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
    const prefix = process.env.PREFIX; 

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

module.exports.getStatus = function () {
    let status = {};
    
    if(isConnected){
        status = {
            botstatus: client.presence.status,
            prefix: process.env.STANDARD_PREFIX,
            silencedUserIDs: silencedUserIDs,
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