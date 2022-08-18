const Discord = require('discord.js');
const database = require('quick.db');
const {MessageEmbed} = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const yetkimyokbruh = new Discord.MessageEmbed()
        .setAuthor("Yetki Reddedildi")
        .setDescription("Görünüşe göre Thunar'ın bu sunucuda yeterli yetkisi yok. `KANALLARI_YÖNET` yetkisini vererek veya Thunar rolünü en üste taşıyarak yeniden deneyiniz")
        .setColor(renk)
        .setFooter(slogan)
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(yetkimyokbruh)

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription(`${message.author} Bu birimi sadece geliştiricim kullanabilir`)
        .setColor(renk)
        .setFooter(slogan)
    if (message.author.id !== '801006452416184330') return message.channel.send(izinyok);

    function caremode(content) {
        const infoEmbed = new Discord.MessageEmbed()
            .setDescription(content)
            .setTimestamp()
            .setColor(renk)
            .setFooter(slogan)
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}));
        return message.channel.send(infoEmbed)
    };

    const durum = await database.fetch(client.user.id);
    if (durum == true) {

        await database.delete(client.user.id);
        return caremode('Bakım artık sona erdi. Tüm özellikler kullanılabilir hale getirildi');

    } else {

        await database.set(client.user.id, true);
        database.set(client.user.id + ':)', {
            author: message.author,
            time: Date.now()
        });

        return caremode('Bakım modu açıldı.\nArtık hiç bir kimse (Geliştiricim hariç) birimleri kullanamayacak.');
    }
    ;

};
exports.conf = {
    enabled: true,
    usage: 'Bu birim geliştiriciye özeldir',
    guildOnly: false,
    aliases: ['bakım'],
    permLevel: 0
};

exports.help = {
    name: 'bakım-modu'
};
