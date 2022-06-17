const Discord = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json")
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, arsg) => {

    if (message.author.id !== "801006452416184330") return;

    const embed = new MessageEmbed()
        .setTitle('<:yasalar:971145116834230302> Thunar Yasaları')
        .setDescription("TOPLULUK YASALARIMIZ")
        .addField('>>> Din ve Irk Ayrımı', 'Din, dil, ırk ayrımı yapan Discord kullanıcıları sunucumuzdan hoş görülmez')
        .addField('>>> Saygı Denetimi', 'Sunucu üyelerimizle dalga geçen, üyelerimize küfür eden ve üyelerimize hakaret eden Discord kullanıcıları suncumuzda hoş görülmez')
        .addField('>>> Reklam', 'Sunucumuzda reklam yapmak veya sunucu üyelerimize özel mesaj yoluyla yapılan reklamlar kesinlikle yasaktır')
        .addField('>>> Uygunsuz İçerik', 'Sunucumuz genel kitleye hitap eden bir topluluktur. Genel kitleye hitap etmeyen içerik paylaşımları yasaktır')
        .addField('>>> Korsan Desteği', 'Sunucumuzda korsan yazılım veya içeriğe kesinlikle izin yoktur')
        .addField('>>> TC Anayasası & Discord ToS Kuralları', 'Sunucumuzda resmi yasaları ihlal eden her türlü sohbet veya paylaşım yasaktır')
        .addField('>>> Minnettarız', 'Sunucu kurallarımızı okuyup kurallara uyduğun ve üyelerimizi rahatsız edecek davranışlarda bulunmadığın için minnettarız')
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

};

exports.conf = {
    aliases: ['kur'],
    permLevel: 0,
    usage: 'Sadece komutun ismini yazmanız yeterli',
    kategori: "Eğlence",
};

exports.help = {
    name: 'kural',
    description: 'Sunucuya girenlere isteğe bağlı Captcha yaptırır.',
    usage: 'ping',
    cooldowns: 5
};