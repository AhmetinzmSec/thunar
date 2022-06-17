const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");
const db = require('quick.db');

exports.run = (client, message, args) => {

    // Türkçe

    const error = (abcdef) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Bir Hata Oluştu')
            .setDescription(abcdef)
            .setColor(renk)
            .setFooter(slogan)
        );
    };

    const aliasess = args[0];
    if (!aliasess) return error('Bir birim ismi giriniz.');

    const command = client.commands.get(aliasess) || client.commands.get(client.aliases.get(aliasess));
    if (!command) return error('Böyle bir birim bulunamadı.');

    const commandname = command.conf.aliases;

    let embed = new Discord.MessageEmbed()
        .setTitle("Okuma Başarısız")
        .setDescription("Bu birimin kullanımı okunamadı, henüz eklenmemiş gibi görünüyor")
        .setColor(renk)
        .setFooter(slogan)

    if (!commandname) return message.reply(embed)

    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`${aliasess} biriminin alternatif birimleri`)
        .setDescription(`\`${commandname}\``)
        .setColor(renk)
        .setFooter(slogan)
    );

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['aliases', "alternatifler"],
    usage: '$kullanım [birim ismi]',
    permLevel: 0
};

exports.help = {
    name: "ek-birim"
};