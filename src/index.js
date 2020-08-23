require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const request = require('request');

const client = new Discord.Client();

const prefix = process.env.PREFIX;
let discordDispatcher = '';
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (msg.content === `${prefix} ping`) {
    msg.reply('pong');
  }
  else if (command === 'rickroll') {
    if (!args.length) {
      return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (rickroll @user channelid)`);
    }

    const taggedUser = msg.mentions.users.first();
    const messageChannel = client.channels.cache.get(args[1]);

    messageChannel.send(`Das könnte doch interessant sein <@${taggedUser.id}> 👀`);

    const rickRollEmbed = new Discord.MessageEmbed().setTitle(`Link (sicher)`).setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
	  messageChannel.send(rickRollEmbed);
  }
  else if(command === 'get'){
    if(args[0] === 'flags'){
      if (args[1].length === 0) {
        return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (rickroll @user channelid)`);
      }
      const taggedUser=msg.mentions.users.first();
      msg.channel.send(`User Flags von ${taggedUser.username}: ${taggedUser.flags}`);
    }else{
      return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (get flags @username)`);
    }
  }
  else if(command === 't'){
    if (!args.length) {
      return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (t @user)`);
    }
    const taggedUser=msg.mentions.users.first();

    let nachricht = "";
    const randomNumber = Math.floor(Math.random()*6);
    switch(randomNumber){
      case 0: nachricht = "Jahuudeeeeee"; break;
      case 1: nachricht = "JA du Arsch"; break;
      case 2: nachricht = "Aus unserer Weeeerbuuuunnnnng"; break;
      case 3: nachricht = "PENG 💥"; break;
      case 4: nachricht = "Arsch"; break;
      case 5: nachricht = "Buuuhjahuuuuuu"; break;
    }
    msg.channel.send(`${nachricht}, ${taggedUser}`);
  }
  else if(command === 'play'){
    if(args.length === 0) {
      if(discordDispatcher !== '') {
        discordDispatcher.resume();
      }else{
        return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (play youtubelink)`);
      }
    }else{
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(`${args[0]}`, { filter: 'audioonly'}),{volume: 0.1,});
        discordDispatcher = dispatcher;
      } else {
        return msg.reply('Du musst erst in einem Voice-Channel sein!');
      }
    }
  }
  else if(command === 'pause'){
    if(discordDispatcher !== ''){
      discordDispatcher.pause();
    }
  }
  else if(command === 'volume'){
    if (!args.length) {
      return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (volume <0.1-1.0>)`);
    }
    if(discordDispatcher !== ''){
      discordDispatcher.setVolume(args[0]);
    }
  }
  else if(command === 'leave'){
    if(discordDispatcher !== ''){
      discordDispatcher.destroy();
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);