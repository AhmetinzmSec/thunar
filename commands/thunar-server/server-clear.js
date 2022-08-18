const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birimi kullanmak için `KANLLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(izinyok);

    const argumanyanlis = new MessageEmbed()
        .setTitle('Yanlış Argüman Biçimi')
        .setDescription('Lütfen sayısal bir değer belirtiniz')
        .setColor(renk)
        .setFooter(slogan)
    if (isNaN(args)) return message.channel.send(argumanyanlis);

    const buyukyadakucuk = new MessageEmbed()
        .setTitle('Girilen Sayı Çok Büyük / Çok Küçük')
        .setDescription('Lütfen 2-100 arası sayılar giriniz')
        .setColor(renk)
        .setFooter(slogan)
    if (args < 2 || args > 100) return message.channel.send(buyukyadakucuk);

    message.channel.bulkDelete(Number(args), true)
    const embed = new MessageEmbed()
        .setTitle('Mesajlar silindi')
        .setDescription(args + ' Mesaj silindi. 14 Günden eski mesajlar silinemedi')
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed).then(mesaj => {
        setTimeout(function () {
            mesaj.delete()
        }, 5000);
    })

};

exports.conf = {
    aliases: ['sil', 'clip',],
    usage: '!sil [silinecek mesaj sayısı]',
    permLevel: 0
};

exports.help = {
    name: 'clear',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */