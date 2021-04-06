const prefix = process.env.PREFIX;

module.exports = {
	name: 'trollmove',
    aliases: ['spaßmove'],
    args: true,
    usage: '<user id> <channel 1 id> <channel 2 id> <wiederholungen>',
	description: 'Start the 🎢🎡!',
	async execute(msg, args, client) {
        if(!args[0] || !args[1] || !args[2] || !args[3]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
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
	},
};