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


    const data1 = await message.channel.send("Sistem denetleniyor...")
    await data1.delete()
    const data2 = await message.channel.send("Sunucu sorgulanıyor...")
    await data2.delete()
    const data3 = await message.channel.send("Güvenli veri alışverişine hazırlanılıyor...")
    await data3.delete()
    const data4 = await message.channel.send("API ile anahtar takası yapılıyor...")
    await data4.delete()
    const data5 = await message.channel.send("Veri anonimize ediliyor...")
    await data5.delete()
    const data6 = await message.channel.send("Veri getiriliyor...")
    await data6.delete()
    const data7 = await message.channel.send("Neredeyse Hazır!")
    await data7.delete()

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
