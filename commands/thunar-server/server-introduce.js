const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");
const db = require('quick.db')

exports.run = (client, message, args) => {

    let user = message.author.tag;
    let guild = message.guild.name;
    let channel = client.channels.cache.get("939283264588353546")//bug repot kanal id'i

    message.channel.createInvite({ maxAge: 0 }).then(invite => {

        let embed = new MessageEmbed()
            .setTitle("Sunucu Tanıtıldı")
            .addField("Sunucu Sahibi", user, true)
            .addField("Sunucu İsmi", guild, true)
            .addField("Sunucu Link", `[${guild}](${invite})`)
            .setColor(renk)
            .setFooter(slogan)
        channel.send(embed)

    });

    var SAFErandomMesajlar = [
        "<:partner:934888927955914802> | Sunucu Tanıtıldı",
        "<:partner:934888927955914802> | Sunucu Tanıtımı Başarılı"
    ]

    var SAFErandomMesajlar1 = SAFErandomMesajlar[Math.floor(Math.random() * (SAFErandomMesajlar.length))]

    message.channel.send(SAFErandomMesajlar1)

};

exports.conf = {
    aliases: ['tanıt'],
    usage: '!bildir [geri bildirim mesajınız]',
    permLevel: 0
};

exports.help = {
    name: 'sunucutanıt',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
