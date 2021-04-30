const logService = require('../log');

module.exports = {
	name: 'dc',
    aliases: ['disconnect'],
	description: 'Disconnect an user!',
    icon: "mdi-connection",
    category: "Troll",
    webExe: true,
    args: true,
    usage: '<userid> <wiederholungen> <delay-in-ms>',
	async execute(msg, args, client) {
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

        if(!args[0].length || !args[1].length || !args[2].length){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        const userid = args[0];
        const wiederholungen = args[1];
        const delay = args[2];

        const guild = client.guilds.cache.get(`577214111767592960`);
        const targetUser = guild.members.cache.get(`${userid}`);
        msg.delete({ timeout: 1000 });

        if(wiederholungen > 1){
            for(let i = 0; i < wiederholungen; i += 1){
                try {
                    targetUser.voice.kick("Arsch");
                    logService.log(`Kicked ${targetUser.user.username} from voice channel`);
                    await sleep(delay);
                } catch (error) {
                    logService.error(error);
                }
            }
        } else {
            try {
                targetUser.voice.kick("Arsch");
                logService.log(`Kicked ${targetUser.user.username} from voice channel`);
            } catch (error) {
                logService.error(error);
            }
        }
	},
    async executeAPI(msg, args, client) {
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

        const userid = args[0];
        const wiederholungen = args[1];
        const delay = args[2];

        const guild = client.guilds.cache.get(`577214111767592960`);
        const targetUser = guild.members.cache.get(`${userid}`);

        if(wiederholungen > 1){
            for(let i = 0; i < wiederholungen; i += 1){
                await sleep(delay);
                targetUser.voice.kick("Arsch");
                logService.log(`Kicked ${targetUser.user.username} from voice channel`);
            }
        } else {
            try {
                targetUser.voice.kick("Arsch");
                logService.log(`Kicked ${targetUser.user.username} from voice channel`);
            } catch (error) {
                logService.error(error);
            }
        }
	},
};