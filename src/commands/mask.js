const prefix = process.env.PREFIX;

module.exports = {
	name: 'mask',
    aliases: ['maskieren'],
    icon: 'mdi-guy-fawkes-mask',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<user-id>',
	description: 'Masks bot as an user',
	async execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        const userid = args[0];
        const guild = client.guilds.cache.get(`577214111767592960`);
        const targetUser = guild.members.cache.get(`${userid}`);
        const botUser = guild.members.cache.get(`${client.user.id}`);

        client.user.setAvatar(targetUser.user.displayAvatarURL());
        botUser.setNickname(targetUser.user.username);

        msg.delete();
	},
    async executeAPI(msg, args, client) {
        const userid = args[0];
        const guild = client.guilds.cache.get(`577214111767592960`);
        const targetUser = guild.members.cache.get(`${userid}`);
        const botUser = guild.members.cache.get(`${client.user.id}`);

        client.user.setAvatar(targetUser.user.displayAvatarURL());
        botUser.setNickname(targetUser.user.username);
	},
};