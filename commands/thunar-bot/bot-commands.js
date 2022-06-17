const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = function (client, message, args) {

    const embed = new Discord.MessageEmbed()
        .addField(`Botta Bulunan Toplam Birim Sayısı;`, `${client.commands.size}`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

};
exports.conf = {
    enabled: true,
    usage: 'Sadece birimi yazmanız yeterlidir',
    guildOnly: true,
    aliases: ["toplam-birim", "birim-sayısı", "birimsayısı"],
    permLevel: 0
};

exports.help = {
    name: 'toplambirim'
};