const prefix = process.env.PREFIX;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const logService = require('../log');

module.exports = {
	name: 'clear',
    aliases: ['delete', 'lösch'],
    icon: "mdi-delete",
    category: "Tools",
    webExe: true,
    args: true,
    usage: '<channel-id> <msg-count>',
	description: 'Deletes count of messages in a channel!',
	async execute(msg, args, client) {

        if(!args[0] || !args[1]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        const channelid = args[0];
        const count = args[1];
        const channel = client.channels.cache.get(`${channelid}`);

        channel.messages.fetch({ limit: count })
            .then(messages => {
                messages.forEach(async (message) => {
                    await sleep(200);
                    message.delete();
                });
                logService.log(`Cleared ${count} messages successfull`);
            })
            .catch(console.error);
	},
    async executeAPI(msg, args, client) {
        const channelid = args[0];
        const count = args[1];
        const channel = client.channels.cache.get(`${channelid}`);

        channel.messages.fetch({ limit: count })
            .then(messages => {
                messages.forEach(async (message) => {
                    await sleep(200);
                    message.delete();
                });
                logService.log(`Cleared ${count} messages successfull`);
            })
            .catch(console.error);
	},
};