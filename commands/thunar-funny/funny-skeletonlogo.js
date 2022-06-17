const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    let isim = args.slice(0).join("+")
    if (!isim) return message.channel.send("Lütfen Birşeyler Yaz.(Türkçe Harf İçermemelidir.)")
    let link = "https://bcassetcdn.com/asset/logo/10cd8160-2b8d-41c5-87cc-f683a853d5d9/logo?v=4&text=" + isim
    const egehanss = new Discord.MessageEmbed()
        .setImage(link)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(egehanss)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kuru-kafa", "skulllogo", "kurukafa"],
    permLevel: 0
};

exports.help = {
    name: 'skull-logo',
    description: 'Logo Yaparsınız',
    usage: 'skull-logo <yazı>'
};