const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const pnd = require('pnd.tl')('584902e504247ecfffa2f20c85ff51c6aa53a3a1');
const {renk, slogan} = require('../../versioninfo.json')

exports.run = async (client, message, args) => {

    const link = args[0];
    const type = args[1];

    const linkyok = new MessageEmbed()
        .setTitle("Link Bulunamadı")
        .setDescription("Lütfen kısaltmak istediğiniz linki giriniz")
        .setColor(renk)
        .setFooter(slogan)
    if (!link) return message.channel.send(linkyok)

    const tipyok = new MessageEmbed()
        .setTitle("Tip Belirtilmemiş")
        .setDescription("Lütfen kısaltmak istediğiniz linkin tipini belirtiniz \n\n ***Type:*** \n\n 1 : Genel reklam kolay \n 2 : Genel reklam zor \n 3 : +18 Kolay \n 4 : +18 zor \n 5 : Telegram +18 \n 6 : Telegram Genel")
        .setColor(renk)
        .setFooter(slogan)
    if (!type) return message.channel.send(tipyok)

    const sayiyazaq = new MessageEmbed()
        .setTitle("Yanlış Argüman Biçimi")
        .setDescription("Link tipi sadece sayılardan oluşabilir \n\n ***Link Tipleri ve Numaralandırılma Biçimleri Şu Şekildedir:*** \n\n 1 : Genel reklam kolay \n 2 : Genel reklam zor \n 3 : +18 Kolay \n 4 : +18 zor \n 5 : Telegram +18 \n 6 : Telegram Genel")
        .setColor(renk)
        .setFooter(slogan)
    if (isNaN(type)) return message.channel.send(sayiyazaq)

    let short = await pnd.kısalt(link, type)

    const linkverildi = new MessageEmbed()
        .setTitle("Link Hazırlandı")
        .setDescription(`Linkiniz: <${short}>`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(linkverildi)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pnd"],
    permLevel: 0
};

exports.help = {
    name: 'kısalt',
    description: 'pnd.tl üzerinden link kısaltmanızı sağlar',
    usage: 'pnd'
};