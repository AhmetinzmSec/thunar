const Discord = require('discord.js');
const db = require("quick.db")
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const bozuk = new Discord.MessageEmbed()
        .setTitle('Sistem Kullanılamıyor')
        .setDescription(`**${message.author} Bu sunucuda bu sistem aktif değildir. Doğrulama rolü bozulmuş olabilir. Eğer sunucuda sohbete başlamak için onaylama yapman isteniyorsa sunucu sahibiyle iletişime geçerek sistemi aktif etmesini isteyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)
    if (!db.has("verifyrole" + message.guild.id)) return message.channel.send(bozuk);

    const kod = db.fetch(`kod_${message.author.id}`)
    if(args[0] !== kod) return message.reply("Hata! Kodunu Kontrol Et")
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