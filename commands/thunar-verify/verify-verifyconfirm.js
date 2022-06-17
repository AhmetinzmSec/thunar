const Discord = require('discord.js');
const db = require("quick.db")

exports.run = (client, message, args) => {
    const kod = db.get(`kod_${message.author.id}`)
    if(args[0] !== kod) return message.reply("Hata! Kodunu Kontrol Et").then(tedoad => tedoad.delete(10000))
    else {
        message.delete()

        var tedoa = db.fetch("loginrole" + message.guild.id);
        var tedoa2 = db.fetch("otorol" + message.guild.id);

        message.member.roles.add(tedoa);

        message.member.roles.remove(tedoa2);

        message.channel.send("Kayıt Oldun")

        db.delete(`kod_${message.author.id}`)

    }}

exports.conf = {
    aliases: ["doğrulama-onay"]
};

exports.help = {
    name: 'doğrulamaonay'
};