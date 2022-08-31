const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db')
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {


    if (message.guild.id == "915190486938050561") {

        message.channel.send(`<:checked:932270169433202848> | Bu kod **Thunar Federasyonu** adına lisanslanmıştır. Paylaşılması kesinlikle yasaktır`)

    } else {

        message.channel.send(`<:checked:932270169433202848> | Bu kod **${message.guild.name}** sunucusuna **Thunar Federasyonu** tarafından ücretsiz lisanslanmıştır. Paylaşılması kesinlikle yasaktır`)

    }

};

exports.conf = {
    aliases: ['lisans'],
    usage: '!gç ayarla [kanal etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'telif',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
*/