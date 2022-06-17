const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const {renk, slogan} = require("../../versioninfo.json");
const db = require('quick.db')

exports.run = (client, message, args) => {

    let bug = args.join(" ").slice(0);
    let user = message.author.tag;
    let guild = message.guild.name;
    let guildid = message.guild.id;
    let channel = client.channels.cache.get("932234204215910431")//bug repot kanal id'i

    if (!bug) return message.reply('Bir mesaj giriniz')

    let embed = new MessageEmbed()

        .setTitle("Hata Raporu")
        .addField("Hata", bug)
        .addField("Bildiren", user, true)
        .addField("Sunucu", guild, true)
        .addField("Sunucu ID", guildid, true)
        .setColor(renk)
        .setFooter(slogan)

    var SAFErandomMesajlar = [
        "<:checked:932270169433202848> | ** Hata Bildirimi Başarılı. Geri Bildiriminiz İçin Teşekkür Ederiz**",
        "<:checked:932270169433202848> | Geri Bildiriminiz Gelişmemiz İçin Çok Önemli. Gelişimimize Katkınız İçin Teşekkürler"
    ]

    var SAFErandomMesajlar1 = SAFErandomMesajlar[Math.floor(Math.random() * (SAFErandomMesajlar.length))]

    message.channel.send(SAFErandomMesajlar1).then(i => i.react("<:check1:933290883456061480>"))

    channel.send(embed).then(i => i.react("<:check1:933290883456061480>"))

};

exports.conf = {
    aliases: ['hata', 'bug-report', 'report', 'bildir', 'rapor'],
    usage: '!bildir [geri bildirim mesajınız]',
    permLevel: 0
};

exports.help = {
    name: 'bildir',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
