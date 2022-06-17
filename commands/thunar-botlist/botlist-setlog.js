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
        .setDescription('**Bu komutu kullanmak için `KANALLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(yetkinyok)

    const kanalyok = new discord.MessageEmbed()
        .setTitle("Eksik Argüman")
        .setDescription('Bir kayıt üssü ayarı yapmam için işlem belirtilmedi. Ayarla/Sil işlemlerinden birini belirtin')
        .setColor(renk)
        .setFooter(slogan)
    if (!args[0]) return message.channel.send(kanalyok)

    if (args[0] === "ayarla" || args[0] == "set") {
        if (!channel) return message.reply('Böyle bir kanal bulamadım')

        db.set("botlog" + message.guild.id, channel.id)

        const embed = new MessageEmbed()
            .setTitle('İşlevlik Kazanıldı')
            .addField(`Sunucunun botlist üssü ${channel.name} oldu`, 'Artık bot ekleme isteği bu kanala işlenecek')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)
    }

    if (args[0] === "sil" || args[0] == "delete") {

        if (!db.has("botlog" + message.guild.id)) return message.channel.send("Sistem zaten kapalı")

        db.delete("botlog" + message.guild.id)

        const embed = new MessageEmbed()
            .setTitle('İşlevlik İptal Edildi')
            .addField(`Sunucunun botlist üssü silindi`, 'Artık botlist kaydı tutulmayacak')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)
    }

};

exports.conf = {
    aliases: ['bot-list', 'bl-üs'],
    usage: '!banlog ayarla [kanal etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'botlist',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
