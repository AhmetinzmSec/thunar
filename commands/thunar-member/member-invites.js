const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json");

module.exports.run = async (bot, message, args) => {

    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Davetleri göremiyorum yeterli iznim yok');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function (invites) {
        possibleinvites.push(`${invites.inviter.username}}`)
    })

    const embed = new MessageEmbed()
        .setTitle(`Davet Sıralaması`)
        .addField('Davet Oluşturanlar ve Kullanımları', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["davet-sırası"],
    permLevel: 0,
    kategori: "sunucu",
    usage: 'Sadece komut ismini yazmanız yeterlidir',

};

exports.help = {
    name: 'davet-sıralaması',
    description: 'Sunucunuza en çok kullanıcı getirenleri sıralar.',
    usage: 'davet-sıralaması',

};
