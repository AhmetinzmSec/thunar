const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { version_name, version, yama_surum, discord_js, surum_notlari, renk, slogan } = require('../../versioninfo.json');

exports.run = async (client, message, args) => {

        var embed = new MessageEmbed()
            .setTitle('Thunar Sürüm Bilgisi')
            .addField(`Sürüm :`, `***${version}***`)
            .addField('Sürüm Kod Adı :', `***${version_name}***`)
            .addField('Sürüm Notları :', `${surum_notlari}`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sürüm-bilgi', 'v', 'version', 'versiyon'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'sürüm'
};
