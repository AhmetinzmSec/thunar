const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    const yazi = args.slice(0).join('+');

    if (!yazi) return message.channel.send(`**Lütfen birşeyler yazınız.(Türkçe Harf İçermemelidir.)**`)
    const linqo = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=colored2-logo&text=${yazi}`
        .replace(' ', '+')


    const narcosembed = new Discord.MessageEmbed()
        .setTitle("Logo")
        .setImage(linqo)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(narcosembed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['gg'],
    permLevel: 0
}

exports.help = {
    name: 'google',
    description: 'Yazdığınız yazıyı google logoya değiştirir.',
    usage: 'google'
}