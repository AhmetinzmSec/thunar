const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    let chimped = message.guild.roles.cache.filter(a => a.name !== 'everyone' && !a.managed).sort((a, b) => a.position - b.position).map(c => c.name).reverse()
    message.channel.send

    var guild = message.guild
    var kanallar = guild.channels.cache
    var uyeler = guild.members.cache
    var emoji = guild.emojis.cache
    var roller = guild.roles.cache
    var embed = new MessageEmbed()
        .setTitle(`${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField(`**:id:  | Sunucu ID **`, `${guild.id}`, true)
        .addField(`**:crown: | Sunucu Sahibi **`, `${guild.owner}`, true)
        .addField(`**:busts_in_silhouette: | Üyeler ( ${guild.memberCount} ) **`, `Çevrimiçi : ${uyeler.filter(uye => uye.presence.status === 'online').size} \n Boşta : ${uyeler.filter(uye => uye.presence.status === 'idle').size} \n Rahatsız Etmeyin : ${uyeler.filter(uye => uye.presence.status === 'dnd').size} \n Çevrimdışı : ${uyeler.filter(uye => uye.presence.status === 'offline').size}`, true)
        .addField(`:speech_balloon: | Kanallar ( ${kanallar.size} )`, `Metin : ${kanallar.filter(kanal => kanal.type === 'text').size} \n Ses : ${kanallar.filter(kanal => kanal.type === 'voice').size}`, true)
        .addField(`:earth_africa: | Diğer ( 3 )`, `İnsan : ${uyeler.filter(uye => !uye.user.bot).size} \n Bot : ${uyeler.filter(uye => uye.user.bot).size} \n Emoji : ${emoji.size}`, true)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

};

exports.conf = {
    aliases: ['server-info', 'sunucu-bilgisi',],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'sunucu',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */