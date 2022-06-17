const discord = require("discord.js");
const db = require("quick.db");
const {MessageEmbed} = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    var id = null
    var username = null

    var user = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()) : null;

    var hesap = db.fetch(`hesapdurumpicadro_${user.id}`, "aktif")

    const hesapyok = new discord.MessageEmbed()
        .setTitle("Hesap Bulunamadı")
        .setDescription('**Adınıza açılmış Thunar Coin hesabı bulunamadı**')
        .setColor(renk)
        .setFooter(slogan)

    if (!hesap) return message.reply(hesapyok);

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısını**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(yetkinyok)

    var para = args[1]
    const mention = message.mentions.members.first()


    if (!mention) {
        id = message.author.id
        username = message.author.username
        para = args[0]

    } else {
        id = mention.id
        username = mention.user.username
    }

    if (!para) {
        const parabelirt = new discord.MessageEmbed()
            .setAuthor("Kullanıcı Tespit Edilemedi")
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


    db.add(`coin_${id}_${message.guild.id}`, parse)
    const sucembed = new discord.MessageEmbed()
        .setAuthor("Para eklendi")
        .setDescription(`**${username} Kişisine ${parse} Kadar Para Eklendi**`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(sucembed)

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["coin-ekle"],
    usage: '!coin-ekle [kullanıcı etiketi] [coin-miktarı]',
    permLevel: 0
};
exports.help = {
    name: "coin-ekle",
    description: "coin eklersiniz",
    usage: "coin-ekle <kullanıcı etiketi> <para miktarı>"
};