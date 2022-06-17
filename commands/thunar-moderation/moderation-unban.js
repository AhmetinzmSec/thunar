const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    let id = args[0]
    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `KULLANICILARI_YASAKLA` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(yetkinyok)
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return;
    if (isNaN(id)) return message.reply('Lütfen geçerli bir ID giriniz');
    message.guild.fetchBans().then(ban => {

        const kimseyok = new Discord.MessageEmbed()
            .setTitle("Hmm... Burası Boş Görünüyor")
            .setDescription(`Bu sunucuda henüz kimse yasaklanmamış`)
            .setColor(renk)
            .setFooter(slogan)
        if (ban.size === 0) return message.channel.send(kimseyok);

        const banned = ban.find(b => b.user.id === id)

        const yokki = new Discord.MessageEmbed()
            .setTitle("Zaten Yasaklı Değil")
            .setDescription(`Bu kişi bu sunucuda yasaklı değil`)
            .setColor(renk)
            .setFooter(slogan)
        if (!banned) return message.channel.send(yokki);

        message.guild.members.unban(banned.user)

        const damam = new Discord.MessageEmbed()
            .setTitle("Yasak Kaldırıldı")
            .setDescription(`Kişinin yasağı başarıyla kaldırıldı`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(damam)
    })


};

exports.conf = {
    aliases: ['yasakkaldır',],
    usage: '!unban [kullanıcı id]',
    permLevel: 0
};

exports.help = {
    name: 'unban',
    description: '',
    usage: '',
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */