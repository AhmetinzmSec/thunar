const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db')
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription(`**${message.author} Yeterli yetkin bulunmuyor**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(izinyok);

    const etiketleseneyrrm = new MessageEmbed()

        .setTitle('İşlem Gerçekleştirilemedi')
        .setDescription(`**${message.author} Lütfen bir rol etiketleyiniz**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!args[0]) return message.channel.send(etiketleseneyrrm)


    if (args[0] === "sil" || args[0] == "delete") {

        const rolyoh = new MessageEmbed()

            .setTitle('İşlem Gerçekleştirilemedi')
            .setDescription(`**${message.author} Sunucu için ayarlanmış rol bulunmamaktadır**`)
            .setColor(renk)
        .setFooter(slogan)

        if (!db.has("verifyrole" + message.guild.id)) return message.reply(rolyoh)

        db.delete("verifyrole" + message.guild.id)

        const sifirlanmis = new MessageEmbed()

            .setTitle('Kayıt Rolü Sıfırlandı')
            .setDescription(`**${message.author} Artık bu sunucuda doğrulama sistemi çalışmayacak**`)
            .setColor(renk)
        .setFooter(slogan)

        return message.channel.send(sifirlanmis)

    }

    var rol = message.mentions.roles.first()

    if (rol) {

        db.set("verifyrole" + message.guild.id, rol.id)

        const oldula = new MessageEmbed()

            .setTitle('Doğrulama Rolü Ayarlandı')
            .setDescription(`**${message.author} Sunucumuzda doğrulama yapan üyelere artık <@${rol.id}> rolü verilecek verilecek**`)
            .setColor(renk)
        .setFooter(slogan)

        message.channel.send(oldula)


    } else {

        rol = message.guild.roles.cache.find(role => role.name.includes(args.join(" ")))

        if (!rol) rol = message.guild.roles.cache.find(role => role.id.includes(args.join(" ")))

        const olmadimk = new MessageEmbed()

            .setTitle('İşlem Gerçekleştirilemedi')
            .setDescription(`**${message.author} Bahsettiğin rolü bulamadım**`)
            .setColor(renk)
        .setFooter(slogan)
            
        if (!rol) rol = message.reply(olmadimk)
        return;

        db.set("verifyrole" + message.guild.id, rol.id)

        const oldulan = new MessageEmbed()

            .setTitle('Kayıt Rolü Ayarlandı')
            .setDescription(`**${message.author} Sunucumuza doğrulama yapam üyelere artık <@${rol.id}> rolü verilecek verilecek**`)
            .setColor(renk)
        .setFooter(slogan)

        message.channel.send(oldulan)

    }

};

exports.conf = {
    aliases: ['doğrula-rol', 'doğrulama-rolü'],
    usage: '!doğrulama-rolü [rol etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'doğrulama-rol',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */