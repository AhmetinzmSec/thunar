const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db')
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(yetkinyok)

    if (!args[0]) return message.channel.send('Lütfen bir rol etiketleyiniz')

    if (args[0] === "sil" || args[0] == "delete") {

        if (!db.has("otorol" + message.guild.id)) return message.reply('There are no roles set for the server')

        db.delete("otorol" + message.guild.id)

        const embed = new MessageEmbed()
            .setTitle('Otorol Sıfırılandı')
            .setDescription('Artık yeni üyelere rol verilmeyecek')
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(embed)

    }

    if (args[0] === "ayarla" || args[0] == "set") {

        var rol = message.mentions.roles.first()

        if (rol) {

            db.set("otorol" + message.guild.id, rol.id)

            const embed = new MessageEmbed()
                .setTitle('Otorol Ayarlandı')
                .setDescription(`Otomatik Rol <@&${rol.id}> oldu. Sunucuya yeni bir üye katıldığında artık **${rol.name}** adlı rol verilecek`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(embed)


        } else {

            rol = message.guild.roles.cache.find(role => role.name.includes(args.join(" ")))

            if (!rol) rol = message.guild.roles.cache.find(role => role.id.includes(args.join(" ")))
            if (!rol) rol = message.reply('Rolü bulamadım')

            db.set("otorol" + message.guild.id, rol.id)

            const embed = new MessageEmbed()
                .setTitle('Otorol Ayarlandı')
                .setDescription(`Otomatik Rol <@&{rol.id}> oldu. Sunucuya yeni bir üye katıldığında artık **${rol.name}** adlı rol verilecek`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(embed)

        }
    }

};

exports.conf = {
    aliases: ['otorol'],
    usage: '!otorol [rol etiketi] -- !otorol sil',
    permLevel: 0
};

exports.help = {
    name: 'autorole',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
