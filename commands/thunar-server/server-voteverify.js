const Discord = require('discord.js');
const db = require("quick.db")
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const kod = db.fetch(`kod_${message.author.id}`)
    if(args[0] !== kod) return message.reply("Hata! Kodunu Kontrol Et")
    else {
        message.delete()

        message.channel.send("Sunucu oylama başarılı")

        db.delete(`kod_${message.author.id}`)

    }}

exports.conf = {
    aliases: ["onayoy"]
};

exports.help = {
    name: 'onayoy'
};