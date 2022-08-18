const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const { renk, slogan } = require("../versioninfo.json");

module.exports = async (message) => {

    if (!db.has("log" + message.guild.id)) return;
    const log_id = db.fetch("log" + message.guild.id)
    const log = message.guild.channels.cache.get(log_id)

    const embed = new MessageEmbed()
        .setTitle('Mesaj Silindi')
        .addField("Mesaj Yazarı", `${message.author}`)
        .addField("Yazılan Kanal", `${message.channel}`)
        .addField("Silinen Mesaj", `${message.embeds[0] ? "Bu mesajın içeriği `embed` veya `önizleme` içeriyor. Bu tür mesajların içeriğini maalesef gösteremiyorum" : message.content}`)
        .setColor(renk)
        .setFooter(slogan)

    const embed2 = new MessageEmbed()
        .setTitle('Mesaj Silindi')
        .addField("Mesaj Yazarı", `${message.author}`)
        .addField("Yazılan Kanal", `${message.channel}`)
        .addField("Silinen Mesaj", `Bu mesajın içeriği çok uzun. Maalesef mesajın içerğini gösteremiyorum`)
        .setColor(renk)
        .setFooter(slogan)

    if (message.content.length >= 1000) {
        log.send(embed2)
    } else {
        log.send(embed)
    }




}