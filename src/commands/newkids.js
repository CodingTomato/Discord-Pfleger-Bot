const ytdl = require('ytdl-core');
const discordBot = require('../bot.js');

module.exports = {
	name: 'newkids',
    aliases: ['nk'],
	  description: 'Play New Kids sound',
    icon: 'mdi-air-horn',
    category: 'Troll',
    webExe: false,
    args: true,
    usage: '<soundname> <userid>',
	async execute(msg, args, client) {
    const lkw = "https://www.youtube.com/watch?v=bk4V5fBGYAs";
    const maskantje = "https://www.youtube.com/watch?v=UYOOZsMwC9k";
    const homo = "https://www.youtube.com/watch?v=Zwj5Xerai7o";
    const friteuse = "https://www.youtube.com/watch?v=ueG3kJql__Q";
    const rechnung = "https://www.youtube.com/watch?v=FcTdGcpcJBg";
    const feuerball = "https://www.youtube.com/watch?v=2WOSs1K9MCA";
    const tuer ="https://www.youtube.com/watch?v=1-AefdOiSn0";
    const butzbug = "https://www.youtube.com/watch?v=WMZHAkcX9oM";
    const manta = "https://www.youtube.com/watch?v=3tnqu-iJZb4";

    if(!args[0].length){
        return msg.channel.send(`Kein Argumente angegeben, ${msg.author}! 🤔 (newkids soundname userid)`);
    }

    let soundToPlay = "";
    switch(args[0]) {
      case "lkw": soundToPlay = lkw; break;
      case "maskantje": soundToPlay = maskantje; break;
      case "homo": soundToPlay = homo; break;
      case "friteuse": soundToPlay = friteuse; break;
      case "rechnung": soundToPlay = rechnung; break;
      case "feuerball": soundToPlay = feuerball; break;
      case "tuer": soundToPlay = tuer; break;
      case "butzbug": soundToPlay = butzbug; break;
      case "manta": soundToPlay = manta; break;
      default:
        msg.delete({ timeout: 1000 });
        return msg.reply('Keinen Sound gefunden! (Sounds: lkw, maskantje, homo, friteuse, rechnung, feuerball, tuer, butzbug, manta)');
    }

    const userid = args[1];
    const guild = client.guilds.cache.get(`577214111767592960`);
    const targetUser = guild.members.cache.get(`${userid}`);
    const currentChannel = targetUser.voice.channel;
    msg.delete({ timeout: 1000 });

    if (currentChannel) {
        discordBot.connection = await currentChannel.join();
        console.log(soundToPlay);
        discordBot.dispatcher = discordBot.connection.play(ytdl(soundToPlay, { filter: 'audioonly'}));
        
        discordBot.dispatcher.setVolume(1.0);
        
        discordBot.dispatcher.on('finish', () => {
            discordBot.connection.disconnect();
        });
    } else {
        return msg.reply('User muss erst in einem Voice-Channel sein!');
    }
	},
  async executeAPI(msg, args, client) {
    return;
	},
};