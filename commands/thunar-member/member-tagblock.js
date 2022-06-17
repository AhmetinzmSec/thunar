const Discord = require('discord.js');
const data = require('quick.db');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {// chimp#0110
    let prefix = '!'// botun prefixi
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Komutu kullanabilmek için gerekli yetkiye sahip değilsin.`)

    if (!args[0]) return message.channel.send(`Yasaklı tag sistemini kullanabilmek için: ${prefix}**yasaklı-tag ekle tag** yazmalısın.`)
    let argümanlar = ['ekle', 'çıkar']
    if (!argümanlar.includes(args[0])) return message.channel.send(`Sadece ${prefix}**yasaklı-tag ekle**/**çıkar** kullanabilirsin.`)

    if (args[0] === 'ekle') {

        const codare = await data.fetch(`banned-tag.${message.guild.id}`)
        if (!args[1]) return message.channel.send(`Bir tag yazmalısın.`)

        await data.set(`banned-tag.${message.guild.id}`, args[1])

        message.channel.send(new Discord.MessageEmbed()
            .setTitle("Yeni Yasaklı Tag Eklendi")
            .setDescription(`**${args[1]}** tagı yasaklı olarak listeye eklendi.`)
            .setColor(renk)
            .setFooter(slogan))
    }


    if (args[0] === 'çıkar') {

        const codare = await data.fetch(`banned-tag.${message.guild.id}`)
        if (!codare) return message.channel.send(`Hiç tag eklememişsin.`)
        if (!args[1]) return message.channel.send(`Bir tag yazmalısın.`)

        await data.delete(`banned-tag.${message.guild.id}`)

        message.channel.send(new Discord.MessageEmbed()
            .setTitle("Yasaklı Tag Kaldırıldı")
            .setDescription(`**${args[1]}** tagı artık yasaklı değil..`)
            .setColor(renk)
            .setFooter(slogan))
    }


};
exports.conf = {
    enabled: true,
    guildOnly: 0,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'yasaklı-tag'
};