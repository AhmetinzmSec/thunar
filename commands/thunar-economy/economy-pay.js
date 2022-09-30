const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const {renk, slogan} = require("../../versioninfo.json");

module.exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.author;

    let member = db.fetch(`money_${message.author.id}`)

    if (!user) {
        const usernerde = new Discord.MessageEmbed()
            .setTitle("Aktarım Başarısız")
            .setDescription(`Kredi verecek birini belirtin`)
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(usernerde)
    }

    if (!args[1]) {
        const nekadarveriyon = new Discord.MessageEmbed()
            .setTitle("Aktarım Başarısız")
            .setDescription(`Kredi vermek için bir miktar belirtin`)
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(nekadarveriyon)
    }
    if (message.content.includes('-')) {
        const ciddenmi = new Discord.MessageEmbed()
            .setTitle("Aktarım Başarısız")
            .setDescription(`Birine eksi kredi ödeyemezsiniz`)
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(ciddenmi)
    }

    if (member < args[1]) {
        const cokzenginsin = new Discord.MessageEmbed()
            .setTitle("Aktarım Başarısız")
            .setDescription(`Yeterince krediniz mevcut değil`)
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(cokzenginsin)
    }

    const basairili = new Discord.MessageEmbed()
        .setTitle("Aktarım Başarılı")
        .setDescription(`\`${args[1]}\` miktar kredi **${user.user.username}** kullanıcısına aktarıldı`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(basairili)
    db.add(`money_${user.id}`, args[1])
    db.subtract(`money_${message.author.id}`, args[1])

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['aktar'],
    usage: '',
    permLevel: 0
}

exports.help = {
    name: 'bağış'
};