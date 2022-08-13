const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const {MessageButton} = require('discord-buttons');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    let mention = message.author;
    if (message.mentions.members.first()) mention = message.mentions.members.first().user;

    /*
    * let kabulettimi = db.fetch(`kabulettimi_${mention.id}`);

    const kabuletmedi = new MessageEmbed()
        .setTitle("Avatar Görüntülenemiyor")
        .setDescription("Görünüşe göre bu kullanıcı Thunar Kullanıcı Sözleşmesi'ni kabul etmemiş. Gizlilik politikamız gereği bu kullanıcının avatarını gösteremiyorum")
        .setColor(renk)
        .setFooter(slogan)
    if (!kabulettimi) return message.channel.send(kabuletmedi);
    * */

    const embed = new Discord.MessageEmbed()
        .setImage(mention.displayAvatarURL({dynamic: true, size: 4096, format: 'png'}))
        .setColor(renk)
        .setFooter(slogan)
        .setTitle("Avatarınız;");

    const button = new MessageButton()
        .setLabel('Avatar URL')
        .setStyle('url')
        .setURL(mention.displayAvatarURL({dynamic: true, size: 4096, format: 'png'}));

    return message.channel.send({
        embed: embed, component: button
    });

};

exports.conf = {
    aliases: ['pp', 'profile-pic',],
    usage: '!avatar [kullanıcı etiketi] \n\n (Etiket yapmazsanız sizin profil fotoğrafınız görüntülenir)',
    permLevel: 0
};

exports.help = {
    name: 'avatar',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */