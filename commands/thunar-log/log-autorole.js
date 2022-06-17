const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db')
const {renk, slogan} = require("../../versioninfo.json");
const discord = require("discord.js");

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


    const channelyok = new MessageEmbed()
        .setTitle('İşlem Başarısız')
        .setDescription(`${message.author} Kanal bulunamadı`)
        .setColor(renk)
        .setFooter(slogan)

    if (!channel) return message.reply(channelyok)

    db.set("autorolelog" + message.guild.id, channel.id)

    const embed = new MessageEmbed()
        .setTitle('İşlevlik Kazanıldı')
        .addField(`Sunucunun log kanalı başarıyla ${channel.name} oldu`, 'Artık otorol verildiğinde ve eğer sistem aktifse kayıt yapıldığında mesajlı bildirim görütülenecek')
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

};

exports.conf = {
    aliases: ['setotorollog', 'otorollog', 'otorol-log'],
    usage: '!otorol-log [kanal etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'set-autorole-log',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
