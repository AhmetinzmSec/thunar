const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const {renk, slogan} = require("../../versioninfo.json");
const db = require('quick.db')

exports.run = (client, message, args) => {

    let user = message.guild.owner;
    let guild = message.guild.name;
    let channel = client.channels.cache.get("939283264588353546")//bug repot kanal id'i
    if (!db.has("intcn" + message.guild.id)) return;

    const log_id = db.fetch("intcn" + message.guild.id)
    const intcn = message.guild.channels.cache.get(log_id)

    let part = new MessageEmbed()
        .setTitle("Sunucu Partnerliği Sağlandı")
        .addField("Sunucu Sahibi", '[BUG](https://discord.com/users/801006452416184330/)', true)
        .addField("Sunucu İsmi", "Thunar Federasyonu", true)
        .addField("Sunucu Link", `[Thunar Federasyonu](https://discord.gg/qgYhfW93FC)`)
        .setColor(renk)
        .setFooter(slogan)
    intcn.send(part)

    message.channel.createInvite({ maxAge: 0 }).then(invite => {

        let embed = new MessageEmbed()
            .setTitle("Sunucu Partnerliği Sağlandı")
            .addField("Sunucu Sahibi", user, true)
            .addField("Sunucu İsmi", guild, true)
            .addField("Sunucu Link", `[${guild}](${invite})`)
            .setColor(renk)
            .setFooter(slogan)
        channel.send(embed).then(i => i.react("<:partner:934888927955914802>"))

    });

    var SAFErandomMesajlar = [
        "<:partner:934888927955914802> | Sunucu Partnerliği Sağlandı",
        "<:partner:934888927955914802> | Sunucu Partnerliği Başarılı"
    ]

    var SAFErandomMesajlar1 = SAFErandomMesajlar[Math.floor(Math.random() * (SAFErandomMesajlar.length))]

    message.channel.send(SAFErandomMesajlar1)

};

exports.conf = {
    aliases: ['po', 'partner'],
    usage: '!bildir [geri bildirim mesajınız]',
    permLevel: 0
};

exports.help = {
    name: 'partner-ol',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
