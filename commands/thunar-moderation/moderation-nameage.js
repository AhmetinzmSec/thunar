const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `KULLANICI_ADLARINI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_USERNAME')) return message.channel.send(yetkinyok)

    var user = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()) : null;

    if (!user) return message.reply('Bir kullanıcı etiketlemen gerekli');

    if ((args || []).length < 2) return message.reply('İsim ve yaş yazman gerekli')

    args = args.splice(1);
    var yas = args[args.length - 1];
    var ad = args.filter((e, i) => i != args.length - 1).join(' ');
    if (isNaN(yas)) return message.reply('Yaş Sayısal Bir Değer İçermelidir');

    user.setNickname(`[${ad}][${yas}]`);
    const embed = new MessageEmbed()
        .setTitle('Kullanıcı İsmi ve Yaşı Ayarlandı')
        .setDescription(`**<@${user.id}> kullanıcısının ismi ${ad} ${yas} olarak ayarlandı**`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    usage: '!isim-yaş [isminiz] [yaşınız]',
    aliases: ['isim-yaş', 'yaş'],
    permLevel: 0
};

exports.help = {
    name: 'name-age',
    description: 'etiketlediğin kullanıcının ismini düzenler.'
};
