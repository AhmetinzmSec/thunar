const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message) => {

    const kanal = message.mentions.channels.first()
    const args = message.content.split(' ').slice(3)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Duyuru yapmak için yetkin bulunmuyor.');
    if (!botmesajı) return message.reply('Duyuru konusunu belirtmediniz');
    if (!kanal) return message.reply('Duyuru kanalını belirtmediniz');
    message.delete(message.author)
    kanal.send(botmesajı);

};

exports.conf = {
    aliases: ['hear'],
    usage: "$duyuru #kanal [mesaj]",
    permLevel: 0
};

exports.help = {
    name: 'duyuru',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */