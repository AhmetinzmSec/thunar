const Discord = require('discord.js'); // Dicord.JS Modülü Tanımlandı
const {version_name, botstatus, botstatusno, discord_js, version, renk, slogan} = require('../versioninfo.json');
const db = require("quick.db");

module.exports = async (member) => {

    if (!db.has("blog" + member.guild.id)) return;
    const log_id = db.fetch("blog" + member.guild.id)

    const channel = member.guild.channels.cache.get(log_id)

    const cikti = new Discord.MessageEmbed()
        .setTitle("Yasaklama İsteği")
        .setDescription(`${member} sunucudan çıkış sağladı. Yasaklanmasını istiyorsanız \`👍\` tepkisine tıklayın.`)
        .setColor(renk)
        .setFooter(slogan)
    channel.send(cikti).then(sent => {
        sent.react('👍').then(() => sent.react('👎'));
        sent.awaitReactions((reaction, user) => member.guild.members.cache.get(user.id).hasPermission('BAN_MEMBERS') && !user.bot, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(collected => {
            collected = collected.first();
            if (collected.emoji.name == '👍') {
                member.guild.members.ban(member.user.id);
                sent.reactions.removeAll();

                const banned = new Discord.MessageEmbed()
                    .setTitle("Yasaklama Onaylandı")
                    .setDescription(`${member} Üyesi banlandı`)
                    .setColor(renk)
                    .setFooter(slogan)
                return channel.send(banned);
            } else {
                sent.reactions.removeAll();

                const noban = new Discord.MessageEmbed()
                    .setTitle("Yasaklama İptal Reddedildi")
                    .setDescription(`${member} için yasaklama işlemi iptal edildi`)
                    .setColor(renk)
                    .setFooter(slogan)
                return channel.send(noban);
            }
            ;
        });
    });

}