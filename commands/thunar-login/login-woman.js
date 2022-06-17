const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const { renk, slogan } = require("../../versioninfo.json");
const db = require('quick.db')

exports.run = (client, message, args) => {

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birimi kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
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

        if (!db.has("kadin" + message.guild.id)) return message.reply(rolyoh)

        db.delete("kadin" + message.guild.id)

        const sifirlanmis = new MessageEmbed()

            .setTitle('Kadın Rolü Sıfırlandı')
            .setDescription(`**${message.author} Artık bu sunucuda kayıt sistemi çalışmayacak**`)
            .setColor(renk)
            .setFooter(slogan)

        return message.channel.send(sifirlanmis)

    }

    var rol = message.mentions.roles.first()

    if (rol) {

        db.set("kadin" + message.guild.id, rol.id)

        const oldula = new MessageEmbed()

            .setTitle('Kayıt Rolü Ayarlandı')
            .setDescription(`**${message.author} Sunucumuza kayıt olan üyeler kadın olarak kayıt olduğunda artık <@${rol.id}> rolü verilecek**`)
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

        db.set("kadin" + message.guild.id, rol.id)

        const oldulan = new MessageEmbed()

            .setTitle('Kadın Rolü Ayarlandı')
            .setDescription(`**${message.author} Sunucumuza kayıt olan üyeler kadın olarak kayıt olduğunda artık <@${rol.id}> rolü verilecek**`)
            .setColor(renk)
            .setFooter(slogan)

        message.channel.send(oldulan)

        const embed = new MessageEmbed()
            .set(HTMLTableCellElement.propertyIsEnumerable(message.author))

    }

};

exports.conf = {
    aliases: ["kadın-rol"],
    usage: '!kayıt-rolü [rol etiketi] -- !kayıt-rolü sil',
    permLevel: 0
};

exports.help = {
    name: 'woman-role',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
