const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birimi kullanmak için `KANALLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(izinyok);
    if (!args[0])
        return message.channel.send(
            `Yavaş modu ayarlamam için bir sayı yazmalısın!`
        );
    if (args[0] > 1000) return message.channel.send("Slowmode en fazla 1000 olabilir.")
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    let reason = message.content.slice(
        client.length + 9 + args[0].length + 1
    );
    if (!reason) {
        reason == "Quantum Team";
    }
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send(
        `Artık bu kanala **${args[0]}** saniyede bir mesaj yazılabilecek.`
    );
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
    usage: '!slowmode [saniye cinsinde süre]',
    permLevel: 0,
    kategori: "mod"
};

exports.help = {
    name: 'yavaş-mod',
    description: 'Sohbete yazma sınır (süre) ekler.',
    usage: 'yavaş-mod [1/1000]',
};