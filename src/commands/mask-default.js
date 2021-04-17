const prefix = process.env.PREFIX;

module.exports = {
	name: 'reset-mask',
    aliases: ['zurücksetzen'],
    icon: 'mdi-guy-fawkes-mask',
    category: 'Troll',
    webExe: true,
    args: false,
    usage: '',
	description: 'Reset bots mask',
	async execute(msg, args, client) {
        const guild = client.guilds.cache.get(`577214111767592960`);
        const botUser = guild.members.cache.get(`${client.user.id}`);

        client.user.setAvatar("https://logospng.org/download/spotify/logo-spotify-icon-2048.png");
        botUser.setNickname("Spotify");

        msg.delete();
	},
    async executeAPI(msg, args, client) {
        const guild = client.guilds.cache.get(`577214111767592960`);
        const botUser = guild.members.cache.get(`${client.user.id}`);

        try {
            client.user.setAvatar("https://logospng.org/download/spotify/logo-spotify-icon-2048.png");
            client.user.setUsername("Spotify");
            botUser.setNickname("Spotify");
        } catch (error) {
            //TODO
        }
	},
};