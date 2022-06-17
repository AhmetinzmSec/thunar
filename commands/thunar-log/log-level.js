const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db')
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    if (!channel) channel = message.guild.channels.cache.find(ch => ch.name.includes(args.join(" ")))
    if (!channel) channel = message.guild.channels.cache.get(args[0])

    var channel = message.mentions.channels.first()

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `KANALLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(yetkinyok)

    if (args[0] === "ayarla" || args[0] == "set") {

        const channelyok = new MessageEmbed()
            .setTitle('İşlem Başarısız')
            .setDescription(`${message.author} Kanal bulunamadı`)
            .setColor(renk)
            .setFooter(slogan)

        if (!channel) return message.reply(channelyok)

        const aktifdegil = new MessageEmbed()
            .setTitle("Aktiflik Sağlanamadı")
            .setDescription("Görünüşe göre bu sunucuda level sistemi aktif değil. Level loglarını tutabilmem için level sisteminin aktif olması gerekli")
            .setColor(renk)
            .setFooter(slogan)
        if (!db.has(`levels_${message.guild.id}`)) return message.channel.send(aktifdegil);

        db.set("levellog" + message.guild.id, channel.id)

        const embed = new MessageEmbed()
            .setTitle('İşlevlik Kazanıldı')
            .addField(`Sunucunun log kanalı başarıyla ${channel.name} oldu`, 'Artık level yükseldiğinde mesajlı bildirim görütülenecek')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)

    }

    if (args[0] === "sil" || args[0] == "delete") {

        if (!db.has("levellog" + message.guild.id)) return message.channel.send("Sistem zaten kapalı")

        db.delete("levellog" + message.guild.id)

        const embed = new MessageEmbed()
            .setTitle('İşlevlik İptal Edildi')
            .addField(`Sunucunun log kanalı silindi`, 'Artık level yükseldiğinde mesajlı bildirim gelmeyecek')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)

    }

};

exports.conf = {
    aliases: ['setlevellog', 'levellog', 'level-log'],
    usage: '!level-log [kanal etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'set-level-log',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
