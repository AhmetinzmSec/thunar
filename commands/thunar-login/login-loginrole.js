const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const db = require('quick.db');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    var rol = message.mentions.roles.first()

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birim kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
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

        if (!db.has("loginrole" + message.guild.id)) return message.reply(rolyoh)

        db.delete("loginrole" + message.guild.id)

        const sifirlanmis = new MessageEmbed()

            .setTitle('Kayıt Rolü Sıfırlandı')
            .setDescription(`**${message.author} Artık bu sunucuda kayıt sistemi çalışmayacak**`)
            .setColor(renk)
            .setFooter(slogan)

        return message.channel.send(sifirlanmis)

    }

    if (args[0] === "ayarla" || args[0] == "set") {

        const rolyoh = new MessageEmbed()

            .setTitle('İşlem Gerçekleştirilemedi')
            .setDescription(`**${message.author} Sistemin aktif edilebilmesi için önce \`otorol\` sisteminin etkinleştirilmesi gerekmektedir**`)
            .setColor(renk)
            .setFooter(slogan)

        if (!db.has("otorol" + message.guild.id)) return message.reply(rolyoh)

        if (rol) {

            db.set("loginrole" + message.guild.id, rol.id)

            const oldula = new MessageEmbed()

                .setTitle('Kayıt Rolü Ayarlandı')
                .setDescription(`**${message.author} Sunucumuza kayıt olan üyelere artık <@${rol.id}> rolü verilecek verilecek**`)
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

            db.set("loginrole" + message.guild.id, rol.id)

            const oldulan = new MessageEmbed()

                .setTitle('Kayıt Rolü Ayarlandı')
                .setDescription(`**${message.author} Sunucumuza kayıt olan üyelere artık <@${rol.id}> rolü verilecek verilecek**`)
                .setColor(renk)
                .setFooter(slogan)

            message.channel.send(oldulan)

            const embed = new MessageEmbed()
                .set(HTMLTableCellElement.propertyIsEnumerable(message.author))

        }
    }

};

exports.conf = {
    aliases: ['kayıt-rolü', 'kayıtrol'],
    usage: '!kayıt-rolü [rol etiketi] -- !kayıt-rolü sil',
    permLevel: 0
};

exports.help = {
    name: 'lagin-role',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
