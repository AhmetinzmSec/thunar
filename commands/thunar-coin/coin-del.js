const discord = require("discord.js");
const db = require("quick.db");
const {MessageEmbed} = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    var hesap = db.fetch(`hesapdurumpicadro_${message.mentions.users.id}`, "aktif") || db.fetch(`hesapdurumpicadro_${message.author.id}`, "aktif")

    const hesapyok = new discord.MessageEmbed()
        .setTitle("Hesap Bulunamadı")
        .setDescription('**Adınıza açılmış Thunar Coin hesabı bulunamadı**')
        .setColor(renk)
        .setFooter(slogan)

    if (!hesap) return message.reply(hesapyok);

    var id = null
    var username = null

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu komutu kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısını**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(yetkinyok)
    var para = args[1]
    const mention = message.mentions.members.first()


    if (!mention) {
        id = message.author.id
        para = args[0]
        username = message.author.username

    } else {
        id = mention.id
        username = mention.user.username
    }

    if (!para) {
        const parabelirt = new discord.MessageEmbed()
            .setAuthor("Para Miktarı Tespit edilemedi")
            .setDescription("**Kişiye Vereceğin Para Miktarını Girmelisin!**")
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(parabelirt)
    }
    if (isNaN(para)) {
        const sadecesayi = new discord.MessageEmbed()
            .setAuthor("Sayısal Bir Değer Girmelisiniz")
            .setDescription("**Para Sadece Rakamlardan Oluşabiir**")
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(sadecesayi)
    }
    const parse = parseInt(para)

    db.subtract(`coin_${id}_${message.guild.id}`, parse)
    const sucembed = new discord.MessageEmbed()
        .setAuthor("Para Silindi")
        .setDescription(`**${username} Kişisinden ${parse} Kadar Para Silindi**`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(sucembed)
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["coin-sil"],
    usage: '!coin-sil [kullanıcı etiketi] [coin-miktarı]',
    permLevel: 0
};
exports.help = {
    name: "coin-sil",
    description: "coin silersiniz",
    usage: "coin-sil <kullanıcı etiketi> <para miktarı>"
};