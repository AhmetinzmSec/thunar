const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    const yazi = args.slice(0).join('+');

    if (!yazi) return message.channel.send(`**Lütfen birşeyler yazınız.(Türkçe Harf İçermemelidir.)**`)
    const linqo = `https://habbofont.net/font/battlebanzai/${yazi}.gif`
        .replace(' ', '+')


    const narcosembed = new Discord.MessageEmbed()
        .setTitle("Logo")
        .setColor(renk)
        .setFooter(slogan)
        .setImage(linqo)
    message.channel.send(narcosembed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yazıfoto', 'yazı-foto'],
    usage: '$anime [metin]',
    permLevel: 0
}

exports.help = {
    name: 'anime',
    description: 'Yazdığınız yazıyı dinamik çevirir.',
    usage: 'anime'
}