const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js")
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(yetkinyok)

    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    if (!role) return message.reply('Lütfen Vermek İstediğiniz Rolü Etiketleyin!')
    if (!member) return message.reply('Lütfen Rol Vermek İstediğiniz Kişiyi Etiketleyin!')
    member.roles.add(role)

    const embed = new MessageEmbed()
        .setTitle(`Roller Değiştirildi`)
        .setDescription(`**Rol Verilen Kullanıcı: **${message.mentions.users.first()}\n**Verilen Rol: **${role}\n**Yetkili: <@${message.author.id}>**`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    permLevel: 0,
    usage: '!rol-ver [kullanıcı etiketi] [rol etiketi]',
    aliases: ["rolver"]
};

exports.help = {
    name: "rol-ver",
    description: "Üyelere rol verirsiniz",
    usage: "rolver"
};