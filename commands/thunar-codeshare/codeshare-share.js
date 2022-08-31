const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");
const db = require("quick.db");
const {prefix} = require("../../config.json");
const {MessageButton} = require("discord-buttons");

exports.run = (client, message, args, member, bot) => {

    let user = message.author;

    let log_id = db.fetch("cscn" + message.guild.id)

    const channel = message.guild.channels.cache.get(log_id)

    const bozuk2 = new MessageEmbed()
        .setTitle("Sistem Bozuk")
        .setDescription("Görünüşe göre bu sunucuda botlist için log kanalı belirtilmemiş")
        .setColor(renk)
        .setFooter(slogan)
    if (!db.has("cscn" + message.guild.id)) return message.channel.send(bozuk2);

    let preffix = db.fetch(`prefix_${message.guild.id}`)

    let prefixxx = preffix || prefix;

    const djs = "1010610013179490394"
    const aoijs = "1010610010784550912"
    const bdfd = "1010610008779673650"

    const buttonDJS = new MessageButton()
        .setStyle('blurple')
        .setEmoji(djs)
        .setID('buttonDJS')

    const buttonAoiJS = new MessageButton()
        .setStyle('blurple')
        .setEmoji(aoijs)
        .setID('buttonAoiJS')

    const buttonBDFD = new MessageButton()
        .setStyle('blurple')
        .setEmoji(bdfd)
        .setID('buttonBDFD')

    const msg = new Discord.MessageEmbed()
        .setTitle("Kod Yayınlanmaya Hazır")
        .setDescription("Kod sunucuda lisanslı biçimde yayınlanmaya hazır. Lütfen aşağıdan kod dilini seçiniz")
        .setColor(renk)
        .setFooter(slogan)

    message.channel.send(msg, {buttons: [buttonDJS, buttonAoiJS, buttonBDFD]}).then(async function (sent){
        sent.createButtonCollector(user => user.clicker.user.id).on('collect', async (button) => {
            if (button.id == "buttonDJS") {

                const DJS = new MessageEmbed()
                    .setTitle("Yeni Kod Eklendi")
                    .addField("Kod Bilgisi:", `• Kullanıcı: **[${user.tag}](https://discord.com/users/${user.id}/)** \n • Kod Dili: <:djs:1010610013179490394> Discord.JS \n • Kanal: <#${message.channel.id}>`, true)
                    .addField("Not:", "Eğer kod ile ilgili bir sorun yaşarsanız kod yazarı ile iletişime geçiniz")
                    .setColor(renk)
                    .setFooter(slogan)
                channel.send(DJS)
                button.reply.defer()

            } else if (button.id == "buttonAoiJS") {

                const AoiJS = new MessageEmbed()
                    .setTitle("Yeni Kod Eklendi")
                    .addField("Kod Bilgisi:", `• Kullanıcı: **[${user.tag}](https://discord.com/users/${user.id}/)** \n • Kod Dili: <:aoijs:1010610010784550912> Aoi.JS \n • Kanal: <#${message.channel.id}>`, true)
                    .addField("Not:", "Eğer kod ile ilgili bir sorun yaşarsanız kod yazarı ile iletişime geçiniz")
                    .setColor(renk)
                    .setFooter(slogan)
                channel.send(AoiJS)
                button.reply.defer()

            } else if (button.id == "buttonBDFD") {

                const BDFD = new MessageEmbed()
                    .setTitle("Yeni Kod Eklendi")
                    .setTitle("Yeni Kod Eklendi")
                    .addField("Kod Bilgisi:", `• Kullanıcı: **[${user.tag}](https://discord.com/users/${user.id}/)** \n • Kod Dili: <:bdfd:1010610008779673650> BDFD \n • Kanal: <#${message.channel.id}>`, true)
                    .addField("Not:", "Eğer kod ile ilgili bir sorun yaşarsanız kod yazarı ile iletişime geçiniz")
                    .setColor(renk)
                    .setFooter(slogan)
                channel.send(BDFD)
                button.reply.defer()

            }
        })
    })

};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yenikod", "newcode", "yk", "nc", "new-code"],
    permLevel: 0
};

exports.help = {
    name: 'yeni-kod',
    description: 'BotList',
    usage: 'yardım'
};