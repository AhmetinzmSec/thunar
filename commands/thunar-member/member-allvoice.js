const Discord = require('discord.js');
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {// can#0002
    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `KULLANICILARI_TAŞI` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MOVE_MEMBERS')) return message.channel.send(yetkinyok)

    const kanalyok = new discord.MessageEmbed()
        .setTitle("Kanal Belirtilmemiş")
        .setDescription("Bir hata oluştu: Üyelerin bulunduğu kanalın ismini girmelisin")
        .setColor(renk)
        .setFooter(slogan)
    if (!args[0]) return message.channel.send(kanalyok);

    const kanaltaninamdi = new discord.MessageEmbed()
        .setTitle("Kanal Tanınmadı")
        .setDescription('Bir hata oluştu: ' + args[0] + ' isminde bir kanal bulamadım')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[0])) return message.channel.send(kanaltaninamdi);

    const tasiyok = new discord.MessageEmbed()
        .setTitle("Kanal Belirtilmemiş")
        .setDescription(`Bir hata oluştu: ${args[0]} kanalında ki üyeleri taşayacağım kanalın ismini yazmadın`)
        .setColor(renk)
        .setFooter(slogan)
    if (!args[1]) return message.channel.send(tasiyok);

    const tasitaninamdi = new discord.MessageEmbed()
        .setTitle("Kanal Tanınmadı")
        .setDescription('Bir hata oluştu: ' + args[1] + ' isminde bir kanal bulamadım')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[1])) return message.channel.send(tasitaninamdi);

    let çekilecek = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[0])
    let aktarılacak = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[1]);

    const kanaltani = new discord.MessageEmbed()
        .setTitle("Kanal Tanınmadı")
        .setDescription('Bir hata oluştu: Üyelerin çekileceği kanalın üyelerin taşınacağı kanal ile aynı olmaması gerekiyor')
        .setColor(renk)
        .setFooter(slogan)
    if (çekilecek === aktarılacak) return message.channel.send(kanaltani);
    interval = 1000,// dokanmayın
        increment = 1;
    çekilecek.members.forEach(function (member) {
        var runner = setTimeout(function () {
            member.voice.setChannel(aktarılacak.id);
            clearTimeout(runner);

            const basari = new discord.MessageEmbed()
                .setTitle("Başarılı")
                .setDescription("Üyeleri Toplu Taşıma Başarılı")
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(basari)
        }, interval * increment);
        increment = increment + 1;
    });

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["all-move"],
    permLevel: 0
};

exports.help = {
    name: 'toplu-çek'
};