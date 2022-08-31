const Discord = require('discord.js');
const ayarlar = require('../../config.json');
const db = require('quick.db')
const {MessageEmbed} = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {

    let preffix = db.fetch(`prefix_${message.guild.id}`)

    let prefixxx = preffix || prefix;

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birimi kullanmak için `MESAJLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(izinyok);

    const eksikarguman = new MessageEmbed()
        .setTitle('Eksik veya Yanlış Argüman')
        .setDescription(`**Birimin düzgün kullanımı aç/kapat argümanlarından oluşur. (Örnek kullanım; \`${prefixxx}level aç/kapat\`**`)
        .setColor(renk)
        .setFooter(slogan)

    if(!args[0]) return message.reply(eksikarguman)

    if(args[0] === "aç") {
        message.reply("Level Sistemi başarıyla açıldı!")
        db.set(`levels_${message.guild.id}`, "acik")
        return;
    } else if(args[0] === "kapat") {
        message.reply("Level Sistemi başarıyla kapatıldı!")
        db.delete(`levels_${message.guild.id}`)
        return;
    }


}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['levels'],
    permLevel: 0
}

exports.help = {
    name: 'level',
    description: 'AntiSpam.',
    usage: 'antispam aç/kapat'
}