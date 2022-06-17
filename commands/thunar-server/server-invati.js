const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
    message.channel.createInvite({ maxAge: 0 }).then(invite => {
        let embed = new MessageEmbed()
            .setTitle('Sunucu Davet Linki Oluşturuldu')
            .setDescription(`[Davet linkimiz](${invite})`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['server-invitation', 'sdavet', 'davet-linki', 'link-oluştur'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    permLevel: 0 //// Perm Gerekmez
};

exports.help = {
    name: 'sunucu-davet',
    description: 'Sunucunun davetini atar.',
    usage: '!davet'
};