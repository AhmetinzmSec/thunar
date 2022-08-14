const discord = require('discord.js');
const moment = require("moment");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    await message.guild.members.fetch(message.guild.ownerID);

    var moderasyonseviye = message.guild.verificationLevel;
    if (message.guild.verificationLevel == "NONE") moderasyonseviye = "Yok";
    if (message.guild.verificationLevel == "LOW") moderasyonseviye = "Düşük";
    if (message.guild.verificationLevel == "MEDIUM") moderasyonseviye = "Orta";
    if (message.guild.verificationLevel == "HIGH") moderasyonseviye = "Yüksek";
    if (message.guild.verificationLevel == "VERY_HIGH") moderasyonseviye = "Çok Yüksek";

    const embed = new discord.MessageEmbed()

        .setTitle(`${message.guild.name}`, true)
        .setThumbnail(message.guild.iconURL())
        .addField(`👥 Sunucudaki Kişi Sayısı:`, `${message.guild.memberCount}`, true)
        .addField(`© Sunucunun Topluluk Güncellemeleri Kanalı:`, `${message.guild.systemChannel}`, true)
        .addField(`📜 Sunucunun Kurallar Kanalı:`, `${message.guild.rulesChannel}`, true)
        .addField(`🆔 Sunucunun ID'si:`, `${message.guild.id}`, true)
        .addField(`💤 Sunucunun AFK Zaman Aşımı:`, `${message.guild.afkTimeout} saniye`, true)
        .addField(`👑 Sunucunun Sahibi:`, `${message.guild.owner}`, true)
        .addField(`🔐 Sunucunun Moderasyon Seviyesi:`, `${moderasyonseviye}`, true)
        .addField('📇 Sunucudaki Rol Sayısı', `${message.guild.roles.cache.size}`, true)
        .addField('🧾 Sunucudaki Kanal Sayısı', `${message.guild.channels.cache.size}`, true)
        .addField('😀 Sunucudaki Emoji Sayısı', `${message.guild.emojis.cache.size}`, true)
        .addField('🔮 Sunucunun Boost Seviyesi', `${message.guild.premiumTier}/3`, true)
        .addField('🔮 Sunucunun Boost Sayısı', `${message.guild.premiumSubscriptionCount}`, true)
        .setColor(renk)
        .setFooter(slogan)
    await message.channel.send(embed)

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sunucu-profil", "sunucubilgi", "sb"],
    usage: 'Sadece komutun ismini girmeniz yeterlidir',
    permLevel: 0
};
exports.help = {
    name: "sunucu-bilgi"
};
