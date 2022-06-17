const discord = require("discord.js");
const Discord = module.require('discord.js');
const client = new Discord.Client();
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (bot, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `MESAJLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(yetkinyok)

    var odul = args.filter((e, i) => i != args.length - 0).join(' ');

    const odulyok = new Discord.MessageEmbed()
        .setTitle("Hata")
        .setDescription("Ödül belirtilmediği için çekiliş başlatılamadı")
        .setColor(renk)
        .setFooter(slogan)
    if (!odul) return message.channel.send(odulyok)

    const embed = new Discord.MessageEmbed()
        .setTitle('Çekiliş Kazananı')
        .addField("Kazandığı Ödül", odul)
        .setDescription(message.guild.members.cache.random().displayName)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['çekiliş'],
    permLevel: 0
};

exports.help = {
    name: 'hızlı-çekiliş'
};