const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const db = require('quick.db')
const os = require('os');
const {renk, slogan} = require("../../versioninfo.json");
const {MessageButton} = require("discord-buttons");

exports.run = (client, message, args) => {

    const embed = new MessageEmbed()
        .setTitle('Davet Linki')
        .setDescription("Davet etmek için butona tıklayınız")
        .setColor(renk)
        .setFooter(slogan)

    const button = new MessageButton()
        .setLabel('📩 Davet Edin')
        .setURL("https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8")
        .setStyle('url')

    return message.channel.send({
        embed: embed, component: button
    });

};

exports.conf = {
    aliases: ['invitation', 'inv',],
    usage: 'Sadece komutu yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'davet',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5

   https://discord.com/api/oauth2/authorize?client_id=883332449659146240&permissions=8&scope=bot
 */
