const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");
const db = require("quick.db");
const {prefix} = require("../../config.json");
const {MessageButton} = require("discord-buttons");

exports.run = (client, message, args, member, bot) => {

    let user = message.author.id;
    let link = args[0];
    let pref = args[1];
    let onay = args[2];

    const bozuk = new MessageEmbed()
        .setTitle("Sistem Bozuk")
        .setDescription("Görünüşe göre bu sunucuda botlist için admin kanalı belirtilmemiş")
        .setColor(renk)
        .setFooter(slogan)
    if (!db.has("botclient" + message.guild.id)) return message.channel.send(bozuk);

    let log_id = db.fetch("botclient" + message.guild.id)

    const channel = message.guild.channels.cache.get(log_id)

    const bozuk2 = new MessageEmbed()
        .setTitle("Sistem Bozuk")
        .setDescription("Görünüşe göre bu sunucuda botlist için log kanalı belirtilmemiş")
        .setColor(renk)
        .setFooter(slogan)
    if (!db.has("botlog" + message.guild.id)) return message.channel.send(bozuk2);

    let logid = db.fetch("botlog" + message.guild.id)

    let botinfo = db.fetch("botinfo" + message.guild.id)

    let botinfosend = message.guild.channels.cache.get(botinfo)

    const channellog = message.guild.channels.cache.get(logid)

    let preffix = db.fetch(`prefix_${message.guild.id}`)

    let prefixxx = preffix || prefix;

    if (!link) return message.reply(`İstenilen argümanları doldurduğundan emin ol. (Örnek Kullanım; \`${prefixxx}ekle <id> <prefix> <evet/hayır>\`)`)
    if (!pref) return message.reply(`İstenilen argümanları doldurduğundan emin ol. (Örnek Kullanım; \`${prefixxx}ekle <id> <prefix> <evet/hayır>\`)`)
    if (onay != "evet" && onay != "hayır" && onay != "Evet" && onay != "Hayır") return message.reply("Bot onay sorgulamasında hata. Sadece `evet` ya da `hayır` argümanları kullanılabilir")
    if (isNaN(link)) return message.reply('ID Sayısal Bir Değer İçermelidir');

    const yanliskanal = new MessageEmbed()
        .setTitle("Lobi Kanalı Burası Değil")
        .setDescription(`Sunucunun bot ekleme lobisi burası değil. <#`+ channellog +`> kanalına eklemek istediğin botu yazmayı deneyebilirsin`)
        .setColor(renk)
        .setFooter(slogan)
    if (message.channel.id != channellog) return message.channel.send(yanliskanal);

    const aldik = new MessageEmbed()
        .setTitle("Bot Ekleme İsteği")
        .setDescription("Bot ekleme isteğini aldık. Eline bir kahve al ve kurucuların onay vermesini bekle")
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(aldik)

    const xiptalemoji = "❎ Reddet"
    const xonayemoji = "✅ Onayla"

    const buttonOnay = new MessageButton()
        .setStyle('green')
        .setLabel(xonayemoji)
        .setID('buttonOnay')

    const buttonIptal = new MessageButton()
        .setStyle('red')
        .setLabel(xiptalemoji)
        .setID('buttonIptal')

    const embed = new Discord.MessageEmbed()
        .setTitle("Bot Ekleme İsteği")
        .addField("Kullanıcı;", `<@!${user}>`, true)
        .addField("Bot", `[<@!${link}>](https://discord.com/users/${link}/)`)
        .addField("Link;", `[Botu Sunucuya Ekle](https://discord.com/api/oauth2/authorize?client_id=${link}&permissions=8&scope=bot)`)
        .addField("Prefix;", pref)
        .addField("Bot Onaylı mı?;", onay)
        .setColor(renk)
        .setFooter(slogan)

    const botalindi = new MessageEmbed()
        .setTitle("Bot Bekleme Lobisinde")
        .setDescription(`<@!${user}> isimli kullanıcının <@!${link}> adlı botu bekleme lobisinde ⌛`)
        .setColor(renk)
        .setFooter(slogan)
    botinfosend.send(botalindi)

    channel.send(embed, {buttons: [buttonOnay, buttonIptal]}).then(async function (sent) {
        sent.createButtonCollector(user => user.clicker.user.id).on('collect', async (button) => {
            if (button.id == "buttonOnay") {

                const onay = new MessageEmbed()
                    .setTitle("Bot Ekleme Onaylandı")
                    .setDescription(`<@!${user}> isimli kullanıcının <@!${link}> adlı botu onaylandı 🥳`)
                    .setColor(renk)
                    .setFooter(slogan)
                botinfosend.send(onay)
                button.reply.defer()

            } else if (button.id == "buttonIptal") {

                const red = new MessageEmbed()
                    .setTitle("Bot Ekleme Reddedildi")
                    .setDescription(`<@!${user}> Dostum... Botun reddedildi ❌`)
                    .setColor(renk)
                    .setFooter(slogan)
                botinfosend.send(red)
                button.reply.defer()

            }
        })
    })

};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["bot-ekle"],
    permLevel: 0
};

exports.help = {
    name: 'ekle',
    description: 'BotList',
    usage: 'yardım'
};