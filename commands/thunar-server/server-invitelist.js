const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Davetleri göremiyorum yeterli iznim yok');
    });

    invites = invites.array();

    let guild = message.guild;

    guild.fetchInvites()
        .then(invites => message.channel.send(new MessageEmbed()
            .setTitle('Davet Sayısı')
            .setDescription(`Bu sunucuda **${invites.size}** adet davet linki bulunmaktadır`)
            .setColor(renk)
            .setFooter(slogan)))
        .catch(console.error);

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['invinumber'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'davetsayısı',
    description: 'İstediğiniz kişiyi uyarır.',
    usage: 'davet sayısı'
};