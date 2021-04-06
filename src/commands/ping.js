module.exports = {
	name: 'ping',
	args: false,
	aliases: ['Pink', ''],
	description: 'Ping!',
	execute(message, args, client) {
		message.channel.send('Pong.');
	},
};