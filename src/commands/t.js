module.exports = {
	name: 't',
    icon: 'mdi-wheelchair-accessibility',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid> <channelid>',
    aliases: ['tourette'],
	description: 'Random tourette message!',
	execute(msg, args, client) {
        if(!args[0] || !args[1]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        const userid = args[0];
        const messageChannel = client.channels.cache.get(args[1]);

        let nachricht = "";
        const randomNumber = Math.floor(Math.random()*6);
        switch(randomNumber){
            case 0: nachricht = "Jahuudeeeeee"; break;
            case 1: nachricht = "JA du Arsch"; break;
            case 2: nachricht = "Aus unserer Weeeerbuuuunnnnng"; break;
            case 3: nachricht = "PENG 💥"; break;
            case 4: nachricht = "Arsch"; break;
            case 5: nachricht = "Buuuhjahuuuuuu"; break;
            case 6: nachricht = "Niemand fickt mit Maskantje, JUNGE"; break;
            default: nachricht = "Jahuudeeeeee"; break;
        }
        msg.delete({timeout:500});
        messageChannel.send(`${nachricht}, <@${userid}>`);
	},
    executeAPI(msg, args, client) {
        const userid = args[0];
        const messageChannel = client.channels.cache.get(args[1]);

        let nachricht = "";
        const randomNumber = Math.floor(Math.random()*7);
        switch(randomNumber){
            case 0: nachricht = "Jahuudeeeeee"; break;
            case 1: nachricht = "JA du Arsch"; break;
            case 2: nachricht = "Aus unserer Weeeerbuuuunnnnng"; break;
            case 3: nachricht = "PENG 💥"; break;
            case 4: nachricht = "Arsch"; break;
            case 5: nachricht = "Buuuhjahuuuuuu"; break;
            case 6: nachricht = "Niemand fickt mit Maskantje, JUNGE"; break;
            default: nachricht = "Jahuudeeeeee"; break;
        }
        messageChannel.send(`${nachricht}, <@${userid}>`);
    }
};