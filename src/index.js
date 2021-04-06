require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = process.env.PREFIX;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bereit!');
});

client.on('message', async msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (!(msg.author.id === '138377599335268353') && !(msg.author.id === '514467933494181912') && !(msg.author.id === '619202344298479617')) return msg.channel.send(`Glaubst du wirklich, ich höre auf dich ${msg.author}? 😂🤣😂`); //Nico: 514467933494181912; MARCO: 138377599335268353; Julian: 619202344298479617

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
    console.log("Kommando erkannt: ", msg.content)
    command.execute(msg, args, client);
  } catch (error) {
    console.error(error);
    msg.reply('Beim Ausführen des Kommandos ist ein Fehler aufgetreten! 😒');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);