const Discord = require('discord.js'); // Discord.JS Modülü Tanımlandı
const db = require('quick.db'); // Database Tanımlandı
const ayarlar = require('../../config.json'); // Prefix, Geliştirici ID ve Token Tanımlandı
const {MessageEmbed} = require('discord.js')
const discord = require("discord.js"); // Embed Mesaj Türü Tanımlandı
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `MESAJLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(yetkinyok)

    let preffix = db.fetch(`prefix_${message.guild.id}`)

    if (!args[0]) return message.reply(`Bu sunucudaki prefixim: **${preffix ? preffix : ayarlar.prefix}** \n Prefixi Değiştirmek veya Sıfırlamak İçin **( ayarla / sıfırla )**`)

    if (args[0] == "sıfırla" || args[0] == "reset") {
        if (!preffix) {

            return message.reply(`Prefix zaten varsayılan halinde`)

        } else {
            db.delete(`prefix_${message.guild.id}`)

            const embed = new MessageEmbed()
                .setTitle('Prefix Sıfırlandı')
                .addField(`Prefix başarıyla varsayılan haline dönderildi`, `Bu sunucudaki Prefix artık **${ayarlar.prefix}**`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(embed)

        }
    }

    if (args[0] === "ayarla" || args[0] == "set") {

        if (!args[1]) return message.reply("Bir Prefix Değeri Giriniz")

        if (preffix) {

            return message.reply(`Önceki önekim zaten böyleydi`)

        } else {

            db.set(`prefix_${message.guild.id}`, args[1])

            const embed = new MessageEmbed()
                .setTitle('Prefix Ayarlandı')
                .addField(`Prefix başarıyla **${args[1]}** olarak ayarlandı`, `${args[1]}prefix sıfırla yazarak prefixi sıfırlayabilirsiniz`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(embed)

        }
    }
}

exports.conf = {
    enabled: true,
    aliases: ['prefix', 'pre', 'ön-ek'],
    usage: '!prefix ayarla [prefix değeri] -- !prefix sıfırla',
    permLevel: 0
};

exports.help = {
    name: 'önek',
    kategori: "yetkili",
    description: 'Sunucuya özel prefix ayarlar.',
    usage: 'prefix'
};
