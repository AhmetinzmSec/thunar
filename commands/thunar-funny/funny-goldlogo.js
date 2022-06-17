const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    const yazi = args.slice(0).join('+');

    if (!yazi) return message.channel.send(`**Lütfen birşeyler yazınız.(Türkçe Harf İçermemelidir.)**`)
    const egehanss = `https://habbofont.net/font/steampunk/${yazi}.gif`
        .replace(' ', '+')


    const embed = new Discord.MessageEmbed()
        .setTitle("Logo")
        .setColor(renk)
        .setFooter(slogan)
        .setImage(egehanss)
    message.channel.send(embed)

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['altın-foto'],
    permLevel: 0
}

exports.help = {
    name: 'altın',
    description: 'Yazdığınız yazıyı dinamik çevirir.',
    usage: 'altın <yazı>'
}