const Discord = require('discord.js')
const db = require('quick.db');
const {MessageEmbed} = require("discord.js");
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

exports.run = async (client, message, args, perms) => {
    const isim = args.slice(0).join(' ');
    const bakiye = await db.fetch(`bakiyepicadro_${message.author.id}`);
    const hesapdurumu = await db.fetch(`hesapdurumopicadro_${message.author.id}`);
    const hesapismi = await db.fetch(`hesapismipicadro_${message.author.id}`);

    const hesapvar = new discord.MessageEmbed()
        .setTitle("Hesap Zaten Aktif")
        .setDescription('**Bir hesabınız bulunmakta. Geçerli hesabınızın bilgilerini öğrenmek için !coin**')
        .setColor(renk)
        .setFooter(slogan)
    if (hesapdurumu) return message.channel.send(hesapvar);

    const hesappvar = new discord.MessageEmbed()
        .setTitle("Hesap Zaten Aktif")
        .setDescription('**Bir hesabınız bulunmakta. Geçerli hesabınızın bilgilerini öğrenmek için !coin**')
        .setColor(renk)
        .setFooter(slogan)
    if (hesapismi) return message.channel.send(hesappvar);

    const isimnerde = new discord.MessageEmbed()
        .setTitle("İsim Yazmalısın")
        .setDescription('**Hesabınızı aktif edebilmemiz için bir hesap ismi yazmalısınız**')
        .setColor(renk)
        .setFooter(slogan)
    if (!isim) return message.channel.send(isimnerde)

    if (!hesapdurumu) {
        if (!hesapismi) {

            db.set(`hesapdurumpicadro_${message.author.id}`, "aktif");

            const oldu = new discord.MessageEmbed()
                .setTitle("Hesap Aktif Edildi")
                .setDescription('**Thunar Coin hesabınız aktif edildi**')
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(oldu)

            message.author.send(oldu)

        }

    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hesap'],
    usage: '$coin-hesap [isim]',
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'coin-hesap',
    description: 'Bakiyenizi gösterir.',
    usage: 'cüzdan <@kullanıcı>',
}