const Discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, params) => {

    if (message.channel.type !== "dm") {
        const sunucubilgi = new Discord.MessageEmbed()
            .setAuthor(message.guild.name)
            .setImage(message.guild.iconURL({ dynamic: false, format: 'png', size: 1024 }))
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(sunucubilgi);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sunucu-pp", "sunucu-resmi"],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: "sunucuresmi",
    description: "Sunucu Resminin Linkini Atar.",
    usage: "sunucuresmi"
};