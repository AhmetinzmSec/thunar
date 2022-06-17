const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
let {prefix} = require("../config.json")
const { renk, slogan } = require("../versioninfo.json");

module.exports = member => {

    if (!db.has("welbye" + member.guild.id)) return;

    const log_id = db.fetch("welbye" + member.guild.id)
    const welbyechannel = member.guild.channels.cache.get(log_id)

    let embed = new MessageEmbed()
        .setTitle("Ayrılık Vakti!")
        .setDescription(`• Güle Güle **${member.user.username}**... \n • Gidişinle beraber **${member.guild.memberCount}** kişi kaldık...`)
        .setImage("https://i.hizliresim.com/1o1gonf.png")
        .setColor(renk)
        .setFooter(slogan)
    welbyechannel.send(embed)

}