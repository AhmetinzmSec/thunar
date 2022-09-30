const Discord = require("discord.js");
const db = require("quick.db");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.author;
    const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]) || message.member || message.author;

    let bal = db.fetch(`money_${user.id}`)

    if (bal === null) bal = 0;

    const bakiye = new Discord.MessageEmbed()
        .setTitle("Cüzdan İçeriği Görüntüleniyor")
        .setDescription(`Cüzdanda \`${bal}\` kredi bulunuyor.`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(bakiye)

};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['b', 'balance', 'bakiye',],
    usage: '',
    permLevel: 0
}

exports.help = {
    name: 'cüzdan'
};