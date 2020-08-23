require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = process.env.PREFIX;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
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
  else if(command === 'join'){
    if (!args.length) {
      return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (join channelid)`);
    }
    const channel = client.channels.cache.get(args[0]);
    const connection = channel.join();
  }
  else if(command === 'play'){
    const streamOptions = { seek: 0, volume: 1 };
    var voiceChannel = client.channels.cache.get(args[0]);
            voiceChannel.join().then(connection => {
                console.log("joined channel");
                const stream = ytdl(arg[1], { filter : 'audioonly' });
                const dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);