const Discord = require('discord.js');
const db = require('quick.db')
const {token, prefix} = require('../../config.json');
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    let prefix = await db.has(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = prefix;

    const yetkimyok = new discord.MessageEmbed()
        .setTitle("Thunar'a İzin Denetimini Geçemedi")
        .setDescription('**Thunar tarafından bu birimin işlenmesi için bota `ÜYELERİ_TAŞI` ya da `YÖNETİCİ` yetkisine sahip olmalıdır**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send(yetkimyok)

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
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
            }).then(() => {
                const eklendi = new discord.MessageEmbed()
                    .setTitle("Kullanıcı Destek Kanalına Eklendi")
                    .setDescription(`${member} kullanıcısı ${message.channel} destek kanalına eklendi`)
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send(eklendi);
            });
        } catch (e) {
            return message.channel.send('<a:no:784463793366761532> **Hmm... Bir şeyler ters gitti...**');
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["destek-ekle"],
    permLevel: 0
};

exports.help = {
    name: 'add'
};