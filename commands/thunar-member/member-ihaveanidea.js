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
    let logid = db.fetch("ideachannel" + message.guild.id)
    const channellog = message.guild.channels.cache.get(logid)

    let channelmis = db.fetch("idealog" + message.guild.id)//bug repot kanal id'i
    let channel = message.guild.channels.cache.get(channelmis)

    if (!bug) return message.reply('Bir mesaj giriniz')

    const yanliskanal = new MessageEmbed()
        .setTitle("Lobi Kanalı Burası Değil")
        .setDescription(`Sunucunun önerisi lobisi burası değil. <#`+ channellog +`> kanalına önerini yeniden yazabilirsin`)
        .setColor(renk)
        .setFooter(slogan)
    if (message.channel.id != channellog) return message.channel.send(yanliskanal);

    let embed = new MessageEmbed()

        .setTitle("Öneri Geldi")
        .addField("Öneri", bug)
        .addField("Bildiren", user, true)
        .setColor(renk)
        .setFooter(slogan)

    channel.send(embed)
    message.channel.send("Önerme gönderildi")

};

exports.conf = {
    aliases: ['bvr', 'fikirver', 'öner'],
    usage: '!bildir [geri bildirim mesajınız]',
    permLevel: 0
};

exports.help = {
    name: 'birfikrimvar',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
