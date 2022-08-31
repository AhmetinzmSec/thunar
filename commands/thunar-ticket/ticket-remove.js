const Discord = require('discord.js');
const db = require('quick.db')
const {token} = require('../../config.json');
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    if (message.channel.name.includes('ticket-')) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
        if (!member) {
            const eksikarg = new discord.MessageEmbed()
                .setTitle("Eksik Argüman")
                .setDescription('Destek talebi kanalınıza eklemek istediğiniz kullanıcın ID numarasını yazmalısınız')
                .setColor(renk)
                .setFooter(slogan)
            return message.channel.send(eksikarg);
        }
        try {
            message.channel.updateOverwrite(member.user, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: false,
            }).then(() => {
                const kaldirildi = new discord.MessageEmbed()
                    .setTitle("Kullanıcı Destek Kanalına Eklendi")
                    .setDescription(`${member} kullanıcısı ${message.channel} destek kanalından kaldırıldı`)
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send(kaldirildi);
            });
        } catch (e) {
            return message.channel.send('<a:no:784463793366761532> **Hmmm. Bir şeyler ters gitti**');
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kaldır'],
    permLevel: 0
};

exports.help = {
    name: 'remove'
};