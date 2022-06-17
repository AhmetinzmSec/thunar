const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    const error = (abcdef) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Bir Hata Oluştu')
            .setDescription(abcdef)
            .setColor(renk)
            .setFooter(slogan)
        );
    };

    const commandname = args[0];
    if (!commandname) return error('Bir birim ismi giriniz.');

    const command = client.commands.get(commandname) || client.commands.get(client.aliases.get(commandname));
    if (!command) return error('Böyle bir birim bulunamadı.');

    const usage = command.conf.usage;

    let embed = new Discord.MessageEmbed()
        .setTitle("Okuma Başarısız")
        .setDescription("Bu birimin kullanımı okunamadı, henüz eklenmemiş gibi görünüyor")
        .setColor(renk)
        .setFooter(slogan)

    if (!usage) return message.reply(embed)

    message.channel.send(new Discord.MessageEmbed().setTitle(`${commandname} biriminin kullanım şekli`).setDescription(`\`${usage}\``).setColor(renk).setFooter(slogan));

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['usage'],
    usage: '$kullanım [birim ismi]',
    permLevel: 0
};

exports.help = {
    name: "kullanım"
};