const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    var boksmakinesi = ['**3000 Boks Makinesi Kırıldı, Bana Boks Makinesi Borçlusun!**',
        '**100 Kanka Bune Çok Yavaş Vurdun.**',
        '**900 Eh İşte Ne Diyelim? **',
        '**1000 İyimiş.**',
        '**50 Bune Bee Çooook Yavaş...**',
        '**2000 Mi? Çok İyi!**',
        '**700 Daha İyisini Yaparsın.**',
        '**500 Yeaaanii Daha İyisini Yapabilirsin Sen.**',
        '**999 Nasıl Bir Şeysin Sen 1 Puan Beee!**',
        '**1100 Bilemedim, İyinin Bir Üstü.**',
        '**1200 Güzel Güzel Böyle Devamke!** ',
        '**1 Hiç Vurmasaydın Be Kardeşim?**'
    ];
    var cevap = boksmakinesi[Math.floor(Math.random() * boksmakinesi.length)];

    const egehanss = new Discord.MessageEmbed()
        .setTitle(":boxing_glove: ・ Boks Makinesi Sonucu")
        .setDescription(cevap)
        .setImage('https://media.giphy.com/media/Rl4yxxVEvUge8b5mkW/giphy.gif')
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(egehanss)


};

exports.conf = {
    aliases: ['boksmakinesi'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
};

exports.help = {
    name: 'boks',
    description: 'egehanss'
}