const prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	description: 'List all commands or info about a specific command.',
	aliases: ['commands', 'hilfe', 'kommandos', 'befehle'],
    usage: '<command name>',
	execute(message, args, client) {
		const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Hier sind alle Kommandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nSende mir \`${prefix} help [command name]\`, um genaueres zu erfahren!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Du findest alle Befehle in deinen DMs!');
                })
                .catch(error => {
                    console.error(`DM konnte nicht versandt werden ${message.author.tag}.\n`, error);
                    message.reply('Ich konnte dir keine DM senden! Hast du sie deaktiviert?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Das ist kein eingetragener Befehl!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Beschreibung:** ${command.description}`);
        if (command.usage) data.push(`**Verwendung:** ${prefix} ${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });
	},
};