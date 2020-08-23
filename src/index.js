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

/*

*/

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));


client.on('message', async msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if(msg.author.id === '514467933494181912' || msg.author.id === '138377599335268353'){
    if (msg.content === `${prefix} ping`) {
      msg.reply('pong');
    }
    else if (command === 'rickroll') {
      if (!args.length) {
        return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (rickroll @user channelid)`);
      }
  
      const taggedUser = msg.mentions.users.first();
      const messageChannel = client.channels.cache.get(args[1]);
  
      messageChannel.send(`Schau dir mal dieses Video an <@${taggedUser.id}> 😯`);
  
      msg.delete({timeout:500});
      const rickRollEmbed = new Discord.MessageEmbed().setTitle('https://www.youtube.com/watch?v=4bOcKgQssdA').setURL('https://www.youtube.com/watch?v=4bOcKgQssdA');
      messageChannel.send(rickRollEmbed);
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
      msg.delete({timeout:500});
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
    else if(command === 'leave'){
      if(discordDispatcher !== ''){
        discordDispatcher.destroy();
      }
    }
    else if(command === 'trollmove'){
      try{
        if(!args[0].length || !args[1].length || !args[2].length || !args[3].length){
          return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (trollmove userid channelid1 channelid2 wiederholungen)`);
        }

        const userid = args[0];
        const channel1id = args[1];
        const channel2id = args[2];
        const wiederholungen = args[3];
  
        const channel1 = client.channels.cache.get(`${channel1id}`);
        const channel2 = client.channels.cache.get(`${channel2id}`);
  
        const guild = client.guilds.cache.get(`577214111767592960`);
        const targetUser = guild.members.cache.get(`${userid}`);
  
        const currentChannel = targetUser.voice.channelID;

        msg.delete({ timeout: 1000 });

        if(currentChannel){
          for(let i = 0; i < wiederholungen; i += 1){
            await sleep(1000);
            targetUser.voice.setChannel(channel1, "Troll");
            await sleep(1000);
            targetUser.voice.setChannel(channel2, "Troll");
          }
    
          targetUser.voice.setChannel(currentChannel, "Troll");
        }
      }catch(error){
        return msg.channel.send(`Ein Fehler ist aufgetreten, ${msg.author}! 🤔`);
      }
    }
    else if(command === 'help'){
      const dmChannel = msg.author.createDM();
      (await dmChannel).send(`🤖 Die Hilfe Seite - Pfleger Discord Bot 🤖`);
      (await dmChannel).send(`🎵🎵🎵 MUSIK KOMMANDOS 🎵🎵🎵`);
      (await dmChannel).send(`- #Pfleger play YOUTUBELINK (Spielt den Ton eines Youtube-Videos in deinem Channel ab)`);
      (await dmChannel).send(`- #Pfleger play (Führt die letzte Wiedergabe fort)`);
      (await dmChannel).send(`- #Pfleger pause (Pausiert das aktuelle Video)`);
      (await dmChannel).send(`- #Pfleger volume 0.1-1.0 (Stellt die Lautstärke der Bots ein: Von 0.1 bis 1.0)`);
      (await dmChannel).send(`- #Pfleger leave (Verlässt den aktuellen Channel)`);
      (await dmChannel).send(`🐸🐸🐸 TROLL KOMMANDOS 🐸🐸🐸`);
      (await dmChannel).send(`- #Pfleger rickroll @user channelid (Sendet @user einen getarnten Link im Channel mit der ID channelid)`);
      (await dmChannel).send(`- #Pfleger trollmove userid channelid1 channelid2 wiedeholungen (Movet userid wiederholungen mal von channelid1 zu channelid2 und danach wieder zurück)`);
      (await dmChannel).send(`- #Pfleger t @user (Schickt @user im aktuellen Channel eine zufällige Tourette Nachricht)`);
      msg.delete({ timeout: 1000 });
    }
  }else{
    return msg.channel.send(`Du hast leider keinen Zugriff, ${msg.author}! 🤔`);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);