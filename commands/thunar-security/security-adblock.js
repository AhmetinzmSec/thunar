const db = require('quick.db')
const Discord = require('discord.js')
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");
let ayarlar = ['aç', 'kapat']
let settings = ['on', 'off']

exports.run = async (bot, message, args) => {

    if (!args[0]) return message.channel.send('Hey Bu Ayarı Kullanabilmek için `aç` yada `kapat` yazmalısın.')

    if (!ayarlar.includes(args[0])) return message.channel.send(`Geçerli parametreleri kullanmalısın.\nParametreler: ${ayarlar.join(' - ')}`)

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `MESAJLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(yetkinyok)

    if (args[0] == 'aç' || args[0] == "on") {

        if (db.has(`reklam_${message.guild.id}`)) return message.channel.send(`Sistem zaten açık`)

        db.set(`reklam_${message.guild.id}`, 'acik')
        message.channel.send('Reklam Engel başarıyla açıldı!')

    }

    if (args[0] == 'kapat' || args[0] == "off") {

        if (!db.has(`reklam_${message.guild.id}`)) message.channel.send(`Sistem zaten kapalı`)

        db.delete(`reklam_${message.guild.id}`)
        message.channel.send('Reklamlar Artık Engellenmiyor')

    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['advertisement', 'reklam', 'adblock', 'reklam-engel'],
    usage: '!reklam-engel aç/kapat',
    permLevel: 0
};

exports.help = {
    name: 'reklam-engelle',
    description: '[Admin Komutu]',
    usage: 'reklam-engelle'
};