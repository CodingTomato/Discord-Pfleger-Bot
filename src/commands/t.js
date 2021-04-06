module.exports = {
	name: 't',
    args: true,
    usage: '<@user>',
    aliases: ['tourette'],
	description: 'Random tourette message!',
	execute(msg, args, client) {
        const taggedUser=msg.mentions.users.first();

        let nachricht = "";
        const randomNumber = Math.floor(Math.random()*6);
        switch(randomNumber){
            case 0: nachricht = "Jahuudeeeeee"; break;
            case 1: nachricht = "JA du Arsch"; break;
            case 2: nachricht = "Aus unserer Weeeerbuuuunnnnng"; break;
            case 3: nachricht = "PENG 💥"; break;
            case 4: nachricht = "Arsch"; break;
            case 5: nachricht = "Buuuhjahuuuuuu"; break;
        }
        msg.delete({timeout:500});
        msg.channel.send(`${nachricht}, ${taggedUser}`);
	},
};