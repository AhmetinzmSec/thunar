const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
let {prefix} = require("../config.json")
const { renk, slogan } = require("../versioninfo.json");

module.exports = member => {

    let preffix = db.fetch(`prefix_${member.guild.id}`)

    let prefixxx = preffix || prefix;

    if (member.user.bot) {

        if (!db.has("bototorole" + member.guild.id)) return;
        const rol = db.fetch("bototorole" + member.guild.id)
        const giverole = member.guild.roles.cache.find(r => r.id === rol)
        member.roles.add(giverole)

        if (!db.has("autorolelog" + member.guild.id)) return;
        const log_id = db.fetch("autorolelog" + member.guild.id)

        const embed = new MessageEmbed()

            .setTitle('Bot Özel Otorol çalıştırıldı')
            .setDescription(`<@${member.id}> botuna başarıyla <@&${rol}> adlı rol verildi`)
            .setColor(renk)
            .setFooter(slogan)

        const autorolelog = member.guild.channels.cache.get(log_id)

        autorolelog.send(embed)

    } else {

        if (!db.has("otorol" + member.guild.id)) return;
        const rol = db.fetch("otorol" + member.guild.id)
        const giverole = member.guild.roles.cache.find(r => r.id === rol)
        member.roles.add(giverole)

        if (!db.has("autorolelog" + member.guild.id)) return;
        const log_id = db.fetch("autorolelog" + member.guild.id)

        const embed = new MessageEmbed()
            .setTitle('Otorol çalıştırıldı')
            .setDescription(`<@${member.id}> kişisine başarıyla <@&${rol}> adlı rol verildi`)
            .setColor(renk)
            .setFooter(slogan)

        const autorolelog = member.guild.channels.cache.get(log_id)
        autorolelog.send(embed)

        if (!db.has("loginrole" + member.guild.id)) return;
        if (!db.has("loginlog" + member.guild.id)) return;
        const login_id = db.fetch("loginlog" + member.guild.id)

        const embed2 = new MessageEmbed()
            .setTitle('Kayıt Gerekli')
            .setDescription(`<@${member.id}> lütfen ${prefixxx}kayıt komutu ile kayıt yaptırın. Gerçek adınızı ve yaşınızı kullanmanız zorunlu değildir \`\`(Örnek; ${prefixxx}kayıt Ahmet 18) \`\``)
            .setColor(renk)
            .setFooter(slogan)

        const loginlog = member.guild.channels.cache.get(login_id)

        loginlog.send(embed2)

    }

    /* const embed = new Discord.MessageEmbed()
      .setTitle('Otorol çalıştırıldı')
      .setDescription(`<@${member.id}> kişisine başarıyla <@&${rol}> adlı rol verildi`)
      .setColor("GREEN")
    log.send(embed) */

}