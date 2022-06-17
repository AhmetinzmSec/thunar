const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {
    let isim = args.slice(0).join("+")
    if (!isim) return message.channel.send("**Lütfen Birşeyler Yaz(Türkçe Harf İçermemelidir.)**")
    let link = "https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=flame-logo&text=" + isim
    const embed = new Discord.MessageEmbed()
        .setColor(renk)
        .setFooter(slogan)
        .setImage(link)
    message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ateş", "ateşlogo"],
    kategori: 'logolar',
    permLevel: 0
};
exports.help = {
    name: 'ateş-logo',
    description: 'Logo Yaparsınız',
    usage: ''
};