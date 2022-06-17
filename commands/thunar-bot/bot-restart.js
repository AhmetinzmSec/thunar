const Discord = require('discord.js'); // Discord.JS Modülü Tanımlandı
const {MessageEmbed} = require('discord.js'); // Embed Mesaj Türü Tanımlandı
const moment = require('moment'); // Moment Modülü Tanımlandı
require('moment-duration-format'); // Moment Modülü Tanımlandı
const config = require('../../config.json') // Botun Yeniden Başlaması İçin Token Çekildi
const os = require('os');
const {renk, slogan} = require("../../versioninfo.json");
const db = require('quick.db');

exports.run = (bot, message, args) => {

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription(`${message.author} Bu birimi sadece geliştiricim kullanabilir`)
        .setColor(renk)
        .setFooter(slogan)
    if (message.author.id !== "801006452416184330") return message.reply(izinyok)

    const embed1 = new MessageEmbed()
        .setTitle('Bot Yeniden Başlatılıyor...')
        .addField('Bot yeniden başlatılıyor', 'Bu biraz zaman alabilir...')
        .setColor(renk)
        .setFooter(slogan)
    const embed2 = new MessageEmbed()
        .setTitle('Bot Yeniden Başlatıldı')
        .addField('Botu yeniden başlatma tamamlandı ', 'Tüm özellikler başarıyla yeniden başlatıldı')
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed1).then(embed => {
            setTimeout(function () {
                embed.edit(embed2)
            }, 2500);

        }
    )

        .then(() => bot.destroy()) // Botu Çalışma Durumundan Çıkar
        .then(() => bot.login(config.token)) // Botu Çalışır Duruma Getir


    // Konsola Botun Yeniden Başladığına Dair Bilgi Gir
    setTimeout(function () {
        console.log('BOT YENİDEN BAŞLATILDI')
    }, 3000);

};

exports.conf = {
    aliases: ['yeniden-başlat', 'restart', 'reset'],
    usage: 'Bu komut sadece geliştiricime özeldir',
    permLevel: 0
};

exports.help = {
    name: 'yenile',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
