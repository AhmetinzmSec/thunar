const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
let {prefix} = require("../config.json")
const { renk, slogan } = require("../versioninfo.json");

module.exports = (member) => {

    if (!db.has("welbye" + member.guild.id)) return;

    const log_id = db.fetch("welbye" + member.guild.id)
    const welbyechannel = member.guild.channels.cache.get(log_id)

    let embed = new MessageEmbed()
        .setTitle("Yeni Üyemiz Var!")
        .setDescription(`• Hoşgeldin **${member.user.username}!** \n • Seninle beraber **${member.guild.memberCount}** kişi olduk!`)
        .setImage("https://i.hizliresim.com/13c619i.png")
        .setColor(renk)
        .setFooter(slogan)
    welbyechannel.send(embed)

}