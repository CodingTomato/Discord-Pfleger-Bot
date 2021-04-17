module.exports = {
	name: 'ping',
	args: false,
	aliases: ['Pink', ''],
	icon: 'mdi-table-tennis',
	category: 'Tools',
	description: 'Ping!',
	webExe: false,
	execute(message, args, client) {
		message.channel.send('Pong.');
	},
};