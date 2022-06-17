const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db')
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `KANALLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(yetkinyok)

    if (!db.has("autorolelog" + message.guild.id)) return message.reply('Bu sunucuda herhangi bir log kanalı ayarlı değil')

    db.delete("autorolelog" + message.guild.id)

    const embed = new MessageEmbed()
        .setTitle('İşlevlik İptal Edildi')
        .addField(`Sunucunun log kanalı sıfırlandı`, 'Artık otorol kaydı ve kayıt logu tutulmayacak')
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

};

exports.conf = {
    aliases: ['otorollog-sil'],
    usage: '!otorollog-sil',
    permLevel: 0
};

exports.help = {
    name: 'delete-autorole-log',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
