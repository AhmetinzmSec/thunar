const Discord = require("discord.js")
const {MessageEmbed} = require("discord.js")
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
    if (!role) return message.reply('Lütfen Almak İstediğiniz Rolü Etiketleyin!')
    if (!member) return message.reply('Lütfen Rol Almak İstediğiniz Kişiyi Etiketleyin!')
    member.roles.remove(role)
    const embed = new MessageEmbed()
        .setAuthor(`Roller Değiştirildi`)
        .setDescription(`**Rolü Alınan Kullanıcı: **${message.mentions.users.first()}\n**Alınan Rol: **${role}\n**Yetkili: <@${message.author.id}>**`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    permLevel: 0,
    usage: '!rol-al [kullanıcı-etiketi] [rol etiketi]',
    aliases: ["rol-al"]
};

exports.help = {
    name: "rolal",
    description: "Birinden rol alırsınız.",
    usage: "rolal"
};