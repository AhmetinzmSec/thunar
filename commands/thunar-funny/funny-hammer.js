const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message) => {

    let user = message.mentions.users.first();
    if (!user) return message.channel.send('Bir kullanıcı etiketlemelisin.')
    if (user.id == message.author.id) return message.channel.send("Çekici kendine fırlatamazsın, sonra başkasına atamazsın :)")


    const çekiç = new Discord.MessageEmbed()
        .setTitle('Gök gürültüsü tanrısı aracılığıyla bir çekiç yollandı!')
        .setDescription(`**<@${user.id}>, <@${message.author.id}> sana Thor aracılığıyla çekiç fırlattı!**`)
        .setImage("https://media.giphy.com/media/Ch1zCx8tu6DQY/giphy.gif")
        .setColor(renk)
        .setFooter(slogan)
    return message.channel.send(çekiç);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["tokmak"],
    permLevel: 0
};

exports.help = {
    name: 'çekiç',
    description: '',
    usage: ''
};