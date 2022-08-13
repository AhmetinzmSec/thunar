const Discord = require('discord.js');
const db = require('quick.db')
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (bot, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `SUNUCUYU_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(yetkinyok)

    let logk = message.mentions.channels.first();
    let logkanal = await db.fetch(`guvenlikkanali_${message.guild.id}`)

    if (args[0] === "sıfırla" || args[0] === "kapat") {
        if (!logkanal) return message.channel.send(`Radar denetimini kapatmak için \`radar kanalının\` seçili olması gereklidir örnek kullanım: \`!güvenlik #kanal\``);

        db.delete(`guvenlikkanali_${message.guild.id}`)

        message.channel.send(`Radar Rapor başarıyla kapatıldı.`);
        return
    }

    if (!logk) return message.channel.send('Güvenlik kanalını bulamadım. Kullanım !güvenlik #kanal');


    db.set(`guvenlikkanali_${message.guild.id}`, logk.id)

    message.channel.send(`Radar Rapor kanalı ${logk} olarak ayarlandı\nSıfırlamak için !güvenlik sıfırla`);

}


module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['güvenlik'],
    kategori: "ayarlar",
    usage: '!güvenlik [kanal etiketi] -- !güvenlik kapat',
    permLevel: 3
};

module.exports.help = {
    name: 'radar',
    description: 'Güvenlik kanalı ayarlar',
    usage: 'güvenlik'
};