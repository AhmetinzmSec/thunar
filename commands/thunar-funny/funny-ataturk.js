const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {
    var gif = [
        "https://media.giphy.com/media/IgEzHBZvYKaJkoAK43/giphy.gif",
        "https://media.giphy.com/media/ZbMu6BSZQd8jPnlYCp/giphy.gif",
        "https://media.tenor.com/images/fdc0cda3a896ec6f7b62df614ffa1173/tenor.gif",
        "https://media.tenor.com/images/5da7b03fc97bad73b2fcdfb0a2ec1ab7/tenor.gif",
        "https://media.tenor.com/images/5da7b03fc97bad73b2fcdfb0a2ec1ab7/tenor.gif",
        "https://media.tenor.com/images/87c326c3a36e6c5d0b53cd58e8e6fce8/tenor.gif",
        "https://media.tenor.com/images/07ef5535a0a79dbbd992a9abf7c8f22a/tenor.gif"
    ]
    var gif = gif[Math.floor(Math.random(1) * gif.length)]
    const gifembed = new Discord.MessageEmbed()
        .setTitle('Atamızı Saygıyla ve Özlemle Anıyoruz...')
        .setColor(renk)
        .setFooter(slogan)
        .setImage(`${gif}`)

    return message.channel.send(gifembed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    aliases: ['atatürk', 'atam'],
    permLevel: 0
};

exports.help = {
    name: 'atatürk',
    description: 'Mustafa Kemal ATATÜRK gifleri atar.',
}