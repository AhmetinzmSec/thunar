const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db');
const {renk, slogan} = require("../../versioninfo.json");
const discord = require("discord.js");

exports.run = (client, message, args) => {

    message.channel.send("Kullanılamıyor")

    /*






     let x;
     let x2;
     let x3;
     let x4;
     let x5;
     let x6;
     let x7;
     let x8;
     let x9;
     let x10;
     let x11;
     let x12;
     let x13;
     let x14;
     let x15;
     let x16;

     // Reklam Engel Sistemi
     if (db.has(`reklam_${message.guild.id}`)) x = "<:evet:924575954548969472>";
     if (!db.has(`reklam_${message.guild.id}`)) x = "<:hayir:924575992184442900>";

     // Anti Spam Sistemi
     if (db.has(`antispam_${message.guild.id}`)) x2 = "<:evet:924575954548969472>";
     if (!db.has(`antispam_${message.guild.id}`)) x2 = "<:hayir:924575992184442900>";

     // Otorol Sistemi
     if (db.has("otorol" + message.guild.id)) x3 = "<:evet:924575954548969472>";
     if (!db.has("otorol" + message.guild.id)) x3 = "<:hayir:924575992184442900>";

     // Bot Otorol Sistemi
     if (db.has("bototorole" + message.guild.id)) x4 = "<:evet:924575954548969472>";
     if (!db.has("bototorole" + message.guild.id)) x4 = "<:hayir:924575992184442900>";

     // Kayıt Rolü
     if (db.has("loginrole" + message.guild.id)) x5 = "<:evet:924575954548969472>";
     if (!db.has("loginrole" + message.guild.id)) x5 = "<:hayir:924575992184442900>";

     // Erkek Rolü
     if (db.has("erkek" + message.guild.id)) x6 = "<:evet:924575954548969472>";
     if (!db.has("erkek" + message.guild.id)) x6 = "<:hayir:924575992184442900>";

     // Kadın Rolü
     if (db.has("kadin" + message.guild.id)) x7 = "<:evet:924575954548969472>";
     if (!db.has("kadin" + message.guild.id)) x7 = "<:hayir:924575992184442900>";

     // Belirtmek İstemeyen Rolü
     if (db.has("istemsiz" + message.guild.id)) x8 = "<:evet:924575954548969472>";
     if (!db.has("istemsiz" + message.guild.id)) x8 = "<:hayir:924575992184442900>";

     // Gardiyan Sistemi
     if (db.has(`guvenlikkanali_${message.guild.id}`)) x9 = "<:evet:924575954548969472>";
     if (!db.has(`guvenlikkanali_${message.guild.id}`)) x9 = "<:hayir:924575992184442900>";

     // Level Sistemi
     if (db.has(`levels_${message.guild.id}`)) x10 = "<:evet:924575954548969472>";
     if (!db.has(`levels_${message.guild.id}`)) x10 = "<:hayir:924575992184442900>";

     // Küfür Engel Sistemi
     if (db.has(`kufur_${message.guild.id}`)) x11 = "<:evet:924575954548969472>";
     if (!db.has(`kufur_${message.guild.id}`)) x11 = "<:hayir:924575992184442900>";

     // Ban Log
     if (db.has("blog" + message.guild.id)) x12 = "<:evet:924575954548969472>";
     if (!db.has("blog" + message.guild.id)) x12 = "<:hayir:924575992184442900>";

     // Otorol Log
     if (db.has("autorolelog" + message.guild.id)) x13 = "<:evet:924575954548969472>";
     if (!db.has("autorolelog" + message.guild.id)) x13 = "<:hayir:924575992184442900>";

     // Genel Log
     if (db.has("log" + message.guild.id)) x14 = "<:evet:924575954548969472>";
     if (!db.has("log" + message.guild.id)) x14 = "<:hayir:924575992184442900>";

     // Level Log
     if (db.has("levellog" + message.guild.id)) x15 = "<:evet:924575954548969472>";
     if (!db.has("levellog" + message.guild.id)) x15 = "<:hayir:924575992184442900>";

     // Kayıt Log
     if (db.has("loginlog" + message.guild.id)) x16 = "<:evet:924575954548969472>";
     if (!db.has("loginlog" + message.guild.id)) x16 = "<:hayir:924575992184442900>";

     const embed = new MessageEmbed()
         .setTitle("Sunucuda Aktif Sistemler")
         .setDescription(`Reklam Engelleyici -> ${x} \n\n Antispam Sistemi -> ${x2} \n\n Otorol Sistemi -> ${x3} \n\n Botlar İçin Özel Otorol -> ${x4} \n\n Kayıt Sistemi -> ${x5} \n\n Erkek Rolü -> ${x6} \n\n Kadın Rolü -> ${x7} \n\n Belirtmek İstemeyen -> ${x8} \n\n Gardiyan Sistemi -> ${x9} \n\n Level Sistemi -> ${x10} \n\n Küfür Engelleyici -> ${x11} \n\n Ban Log -> ${x12} \n\n Otorol Log -> ${x13} \n\n Genel Log -> ${x14} \n\n Level Log -> ${x15} \n\n Kayıt Log -> ${x16} \n\n =======================`)
         .addField("**Sistem Açık**", "<:evet:924575954548969472>")
         .addField("**Sistem Kapalı**", "<:hayir:924575992184442900>")
         .setColor(renk)
         .setFooter(slogan)
     message.channel.send(embed)










     */

};

exports.conf = {
    aliases: ['sistemler'],
    usage: '!level-log [kanal etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'açık',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
