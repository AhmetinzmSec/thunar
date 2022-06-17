const Discord = require('discord.js');
const moment = require('moment');
const {prefix} = require('../config.json')
const db = require('quick.db');
const db2 = require('../database');
let tarih = new Date().toLocaleString("tr-TR", {timeZone: "Asia/Istanbul"});
const message = require('discord.js')
const { renk, slogan } = require("../versioninfo.json");

module.exports = member => {

    var channel = db.fetch(`guvenlikkanali_${member.guild.id}`);
    var text = db.fetch(`guvenlikyazi_${member.guild.id}`);

    var kanalcık = member.guild.channels.cache.get(channel);

    if (!kanalcık) return;

    var SAFErandomMesajlar = [
        "Aramıza hoşgeldin dostum",
        "Sonunda aramıza katıldın. Eğlenmeyi unutma..."
    ]
    var SAFErandomMesajlar1 = SAFErandomMesajlar[Math.floor(Math.random() * (SAFErandomMesajlar.length))]
    var DANGERrandomMesajlar = [
        "Hay aksi! Bir sorun saptadık...",
        "Kullanıcı güvenlik sorunları içeriyor!"
    ]
    var DANGERrandomMesajlar1 = DANGERrandomMesajlar[Math.floor(Math.random() * (DANGERrandomMesajlar.length))]

    var kurulus = new Date().getTime() - member.user.createdAt.getTime()

    let durumMesajı;
    let durum;

    if (kurulus > 2592000000) durumMesajı = SAFErandomMesajlar1
    if (kurulus > 2592000000) durum = "Güvenli"

    if (kurulus < 2592000000) durumMesajı = DANGERrandomMesajlar1
    if (kurulus < 2592000000) durum = "Şüpheli"

    if (text) var textcik = text.replace("{guild}", `**${member.guild}**`).replace("{user}", `**${member.user.username}**`).replace("{durum}", `**${durum}**`)
    var textcikcik = text ? textcik : durumMesajı;

    if (!kanalcık) return;

    var embedv1 = new Discord.MessageEmbed()

        .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        .setTitle("Kullanıcı Test Edildi")
        .setThumbnail(member.guild.iconURL({dynamic: true, format: "png", size: 1024}))
        .setDescription(textcikcik)
        .addField(`Katılan Kişi:`, `${member}`, true)
        .addField(`Güvenlik Durumu:`, `${durum}`, true)
        .setColor(renk)
        .setFooter(slogan)

    return kanalcık.send(embedv1);

}