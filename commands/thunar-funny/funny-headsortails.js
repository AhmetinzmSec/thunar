const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = function (bot, message) {
    message.channel.send(new Discord.MessageEmbed()
        .setColor(renk)
        .setFooter(slogan)
        .setTitle('🎲 Zarın: ' + narcoscode()));

    function narcoscode() {
        var rand = ['1', '2', '3', '4', '5', '6'];

        return rand[Math.floor(Math.random() * rand.length)];
    }
}

exports.conf = {
    enabled: true,
    aliases: ['zar'],
    guildOnly: false,
    permLevel: 0
};

exports.help = {
    name: 'zarat',
    description: 'Zar Atın',
    usage: ''
};