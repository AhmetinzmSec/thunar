const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
const db = require("quick.db");
const {renk, slogan} = require("../../versioninfo.json");
let {prefix} = require("../../config.json")

exports.run = async (client, message, args) => {

    let preffix = db.fetch(`prefix_${message.guild.id}`)

    let prefixxx = preffix || prefix;

    const seksizaman = moment
        .duration(client.uptime)
        .format(" D [gün], H [saat], m [dakika], s [saniye]");
    const istatistikler = new Discord.MessageEmbed()
        .setTitle("Bot Paneli")
        .addField("» **Botun Sahibi ve Geliştirici**", "[Toxygen (Picadro)](https://discord.com/users/801006452416184330/)")
        .addField("» **Gecikme süreleri**", "Mesaj Gecikme süresi {ping1} ms \nBot Gecikmesi: {ping2} ms"
            .replace("{ping1}", new Date().getTime() - message.createdTimestamp)
            .replace("{ping2}", client.ws.ping))
        .addField("📅 **Lansman Tarihi**", "Çarşamba, 1 Haziran 2022, 00:00", true)
        .addField("📅 **Piyasaya Sürülme Tarihi**", "Pazartesi, 16 Haziran 2022, 00:00", true)
        .addField("📊 **Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB", true)
        .addField("⏰ **Çalışma süresi**", seksizaman, true)
        .addField("👨‍ **Kullanıcılar**", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
        .addField("🏦 **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
        .addField("👣 **Kanallar**", client.channels.cache.size.toLocaleString(), true)
        .addField("📈 **Kütüphane**", "discord.js", true)
        .addField("📉 **Node.JS sürüm**", `${process.version}`, true)
        .addField("💻 **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``, true)
        .addField("‍💼 **İşlemci Mimarisi**", `\`${os.arch()}\``, true)
        .addField("⌨ **İşletim Sistemi**", `\`\`${os.platform()}\`\``, true)
        .addField("🔢 **Birim Sayısı**", `${client.commands.size}`, true)
        .addField("❗ **Varsayılan Prefix**", prefix, true)
        .addField("⁉ **Bu Sunucudaki Prefix**", `${prefixxx}`, true)
        .addField("💌 **Bot Davet**", " [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)", true)
        .addField("💪 **Destek Sunucusu**", "[Thunar Federasyonu](https://discord.gg/qgYhfW93FC)", true)
        .setColor(renk)
        .setFooter(slogan)
    return message.channel.send(istatistikler);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    usage: 'Sadece birimi yazmanız yeterlidir',
    aliases: ["i"],
    permLevel: 0
};

exports.help = {
    name: "istatistik",
    description: "Botun istatistiklerini gösterir",
    usage: "istatistik"
};