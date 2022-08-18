const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const {renk, slogan} = require("../versioninfo.json");

module.exports = async (oldMessage, newMessage) => {

    if (!oldMessage.author) return;
    if (!db.has("log" + oldMessage.guild.id)) return;

    const log_id = db.fetch("log" + oldMessage.guild.id)
    const log = oldMessage.guild.channels.cache.get(log_id)

    if (oldMessage.content.length >= 1000 && newMessage.content.length >= 1000) {

        const embed = new MessageEmbed()
            .setTitle('Mesaj Silindi')
            .addField("Mesaj Yazarı", `${oldMessage.author}`)
            .addField("Yazılan Kanal", `${oldMessage.channel}`)
            .addField("Önceki", `Bu mesajın içeriği çok uzun. Maalesef mesajın içerğini gösteremiyorum`)
            .addField("Düzenlenmiş", `Bu mesajın içeriği çok uzun. Maalesef mesajın içerğini gösteremiyorum`)
            .setColor(renk)
            .setFooter(slogan)
        log.send(embed)

    } else {

        var embed = new Discord.MessageEmbed()
            .setTitle('Mesaj Düzenlendi')
            .addField("Mesaj Yazarı", `${oldMessage.author}`)
            .addField('Önceki', `${oldMessage.embeds[0] ? "Bu mesajın içeri `embed` veya `önizleme` içeriyor. Bu tür mesajların içeriğini gösteremiyorum" : oldMessage.content}`)
            .addField('Düzenlenmiş', `${newMessage.embeds[0] ? "Bu mesajın içeri `embed` veya `önizleme` içeriyor. Bu tür mesajların içeriğini gösteremiyorum" : newMessage.content}`)
            .setColor(renk)
            .setFooter(slogan)

        log.send(embed)
    }

}