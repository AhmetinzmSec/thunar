const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    const yazi = args.slice(0).join('+');

    if (!yazi) return message.channel.send(`**Lütfen birşeyler yazınız.(Türkçe Harf İçermemelidir.)**`)
    const linqo = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=fire-logo&text=${yazi}`
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
    aliases: ['logo-ateş'],
    permLevel: 0
}

exports.help = {
    name: 'ateş',
    description: 'Yazdığınız yazıyı alev logoya değiştirir.',
    usage: 'alev2'
}