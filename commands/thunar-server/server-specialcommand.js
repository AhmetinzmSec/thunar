const disbut = require("discord-buttons")
const Discord = require("discord.js")
const moment = require("moment");
const {version, version_name, renk, slogan} = require('../../versioninfo.json')
const db = require("quick.db");
const discord = require("discord.js");
const {MessageEmbed} = require("discord.js");

exports.run = async (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu komutu kullanmak için `KANALLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(yetkinyok)

    var kismi = message.content.split(" ")[2];
    var kyazi = args.slice(2).join(" ");

    if (args[0] === "ayarla" || args[0] == "set") {

        let eksikarguman = new MessageEmbed()
            .setTitle("Eksik Argüman")
            .setDescription("Sunucuya özel komut ayarlanırken eksik argümanlar tespit edildi. Lütfen doğru kullanım ile yazınız. Doğru kullanım: `özel ayarla <komut ismi> <komut kullanılınca yazılacak yazı>`")
            .setColor(renk)
            .setFooter(slogan)
        if (!kismi || !kyazi) return message.channel.send(eksikarguman)

        db.set(`${message.guild.id}özelkismi`, kismi);
        db.set(`${message.guild.id}özelkyazi`, kyazi);

        let basarili = new MessageEmbed()
            .setTitle("Suncuya Özel Komut Ayarlandı")
            .setDescription("Artık bu sunucuda **" + kismi + "** yazıldığında **" + kyazi + "**  tepkisini vereceğim")
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(basarili);
    }

    if (args[0] === "sil" || args[0] == "reset") {

        let eksikarguman = new MessageEmbed()
            .setTitle("Eksik Argüman")
            .setDescription("Sunucuya özel komut silinirken eksik argümanlar tespit edildi. Lütfen doğru kullanım ile yazınız. Doğru kullanım: `özel sil <komut ismi>`")
            .setColor(renk)
            .setFooter(slogan)
        if (!kismi) return message.channel.send("Doğru kullanım ``özelkomutayarla <komut ismi> <komut kullanılınca yazılacak yazı>``")

        db.delete(`${message.guild.id}özelkismi`, kismi);
        db.delete(`${message.guild.id}özelkyazi`, kyazi);

        let basarili = new MessageEmbed()
            .setTitle("Suncuya Özel Komut Silindi")
            .setDescription("Artık bu sunucuda **" + kismi + "** yazıldığında tepki vermeyeceğim")
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(basarili);

    }

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["spcl"],
    usage: 'Sadece birimun adını yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'özel',
    description: 'Yardım dokümanıni Gösterir',
    usage: '!yardım sa'
};