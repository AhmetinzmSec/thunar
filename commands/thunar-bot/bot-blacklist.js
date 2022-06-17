const Discord = require('discord.js')
const db = require('quick.db');
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");
exports.run = async (client, message, args) => {

    let id = "801006452416184330"
    let user = message.mentions.users.first() || client.users.cache.get(args.slice(1).join(' '))

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birim sadece `GELİŞTİRİCİME` özeldir**')
        .setColor(renk)
        .setFooter(slogan)
    if (message.author.id !== id) return message.channel.send(yetkinyok)

    const norguman = new discord.MessageEmbed()
        .setTitle("İşlem Belirtilmedi")
        .setDescription("Karalisteye ekleme veya çıkarma yapmak için `aç` veya `kapat` yazmalısınız. Karaliste bilgisi için `bilgi` yazmalısın")
        .setColor(renk)
        .setFooter(slogan)
    if (!args[0]) return message.channel.send(norguman)

    switch (args[0]) {
        case "aç":

            const nerdebelirti = new discord.MessageEmbed()
                .setTitle("Kişi Belirtilmemiş")
                .setDescription("Bir kişiyi etiketlemelisin veya id sini yazmalısın")
                .setColor(renk)
                .setFooter(slogan)
            if (!user) return message.channel.send(nerdebelirti)

            if (user.id == id) return message.channel.send("Kendini karalisteyemi alcan :D")

            db.set(`cokaradalistere_${user.id}`, true)

            const nahkullanirsin = new discord.MessageEmbed()
                .setTitle("Bota Erişim Engellendi")
                .setDescription(`${user.tag} **artık botu kullanamayacak**`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(nahkullanirsin)
            break;
        case "kapat":

            const nerdebelirtila = new discord.MessageEmbed()
                .setTitle("Kişi Belirtilmemiş")
                .setDescription("Bir kişiyi etiketlemelisin veya id sini yazmalısın")
                .setColor(renk)
                .setFooter(slogan)
            if (!user) return message.channel.send(nerdebelirtila)

            if (user.id == id) return message.channel.send("Kendini karalisteyemi alcan :D")

            db.delete(`cokaradalistere_${user.id}`)

            const kullanacidim = new discord.MessageEmbed()
                .setTitle("Bota Erişim Sağlanabilir")
                .setDescription(`${user.tag} **artık botu kullanabilir**`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(kullanacidim)
            break;
        case "bilgi":
            const nerdebelirtimq = new discord.MessageEmbed()
                .setTitle("Kişi Belirtilmemiş")
                .setDescription("Bir kişiyi etiketlemelisin veya id sini yazmalısın")
                .setColor(renk)
                .setFooter(slogan)
            if (!user) return message.channel.send(nerdebelirtimq)

            let i = db.fetch(`cokaradalistere_${user.id}`)

            if (i == true) {

                const kullanamaz = new discord.MessageEmbed()
                    .setTitle("Bota Erişim Engellendi")
                    .setDescription(`${user.tag} **botu kullanamaz**`)
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send(kullanamaz)

            } else {

                const kullanabilir = new discord.MessageEmbed()
                    .setTitle("Bota Erişim Sağlanabilir")
                    .setDescription(`${user.tag} **botu kullanabilir**`)
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send(kullanabilir)

            }

            break;
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["karaliste"],
    permLevel: 0,
    kategori: "geliştirici"
};

exports.help = {
    name: 'blacklist',
    description: 'Belirlenen kişinin botu kullanmasını engeller.',
    usage: 'blacklist  '
};