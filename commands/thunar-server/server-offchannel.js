const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birimi kullanmak için `KANLLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(izinyok);

    let every = message.guild.roles.cache.find(r => r.name === '@everyone')
    message.channel.createOverwrite(every, {
        'SEND_MESSAGES': false,

    })

    message.channel.send('Sohbet kanalı rolsüz üyelere ``Yazılamaz`` durumuna getirildi');
}
//Komut yusuf korucu tarafından hazırlanmıştır.

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['k', 'skapat', 'kapat'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    kategori: 'sohbet',
    permLevel: 3
};

exports.help = {
    name: 'sohbet-kapat',
    description: 'Sohbetinizi kapatmaya yarar. Açmak için !!aç.',
    usage: 'kapat'
};