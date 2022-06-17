const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db')
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    var channel = message.mentions.channels.first()

    if (!channel) channel = message.guild.channels.cache.find(ch => ch.name.includes(args.join(" ")))
    if (!channel) channel = message.guild.channels.cache.get(args[0])

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `KANALLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(yetkinyok)

    if (args[0] === "ayarla" || args[0] == "set") {

        if (!channel) return message.reply('Böyle bir kanal bulamadım')

        db.set("rlog" + message.guild.id, channel.id)

        const embed = new MessageEmbed()
            .setTitle('İşlevlik Kazanıldı')
            .addField(`Sunucunun referans kanalı ${channel.name} oldu`, 'Artık referans istemi kaydı bu kanala mesajlı bildirim şeklinde tutulacak')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)
    }

    if (args[0] === "sil" || args[0] == "delete") {

        if (!db.has("rlog" + message.guild.id)) return message.channel.send("Sistem Zaten Kapalı")

        db.delete("rlog" + message.guild.id)

        const embed = new MessageEmbed()
            .setTitle('İşlevlik İptal Edildi')
            .addField(`Sunucunun referans kanalı silindi`, 'Artık referans sistemi çalışmayacak')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)

    }

};

exports.conf = {
    aliases: ['referanslog', 'rlog'],
    usage: '!banlog ayarla [kanal etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'referans-log',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
