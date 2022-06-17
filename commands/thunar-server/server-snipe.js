const Discord = require('discord.js');
const database = require('quick.db');
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `MESAJLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(yetkinyok)

    const silinenyok = new discord.MessageEmbed()
        .setTitle("Silinen Mesaj Tespit Edilemedi")
        .setDescription("Görünüşe göre bu kanalda henüz daha önce hiç mesaj silinmemiş")
        .setColor(renk)
        .setFooter(slogan)
    if(!database.fetch(message.guild.id) || database.fetch(message.guild.id).length <= 0) return message.channel.send(silinenyok)

    const kacmesaj = new discord.MessageEmbed()
        .setTitle("Gösterilecek Mesaj Sayısı Girilmedi")
        .setDescription("Görmek istediğin mesaj miktarı kadar sayı belirtmelisin")
        .setColor(renk)
        .setFooter(slogan)
    if(!args[0]) return message.channel.send(kacmesaj)

    const sadecesayisalbro = new discord.MessageEmbed()
        .setTitle("Yanlış Argüman Biçimi")
        .setDescription("Girilen miktar sadece sayısal değer içermelidir")
        .setColor(renk)
        .setFooter(slogan)
    if(isNaN(args[0])) return message.channel.send(sadecesayisalbro)
    if(args[0] > database.fetch(message.guild.id).length) args[0] = database.fetch(message.guild.id).length;


    var silinenler = database.fetch(message.guild.id).slice(database.fetch(message.guild.id).length-args[0]);

    const embed = new Discord.MessageEmbed()
        .setTitle('Silinen Mesajlar')
        .setColor(renk)
        .setFooter(slogan)
        .setDescription(silinenler.sort((a, b) => a.messageCREATEDAT - b.messageCREATEDAT).reverse().map(x => `**${x.authorTAG}**: ${x.messageCONTENT}`).slice(0, 50).join('\n'))

    const uzunknk = new discord.MessageEmbed()
        .setTitle("Gösterimde Arıza")
        .setDescription("Silinen mesajların arasında çok uzun bir mesaj bulunduğu için bunu gösteremiyorum")
        .setColor(renk)
        .setFooter(slogan)
    if(embed.description.length > 1000) return message.channel.send(uzunknk);

    return message.channel.send(embed);

    function createEmbed(desc, color) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(desc)
            .setColor(color)
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 2048 })));
    }

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["snipe"],
    permLevel: 0
};

exports.help = {
    name: 'silinenler'
};