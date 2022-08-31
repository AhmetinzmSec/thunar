const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
const {token, default_prefix} = require('../../config.json');
const sourcebin = require('sourcebin_js');
const {renk, slogan} = require('../../versioninfo.json');

exports.run = async (client, message, args) => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = default_prefix;

    var author = message.author;
    var tickchan = message.guild.channels.cache.find(channel => channel.name === `ticket-${author.id}`)

    if (tickchan) {

        const silindi = new MessageEmbed()
            .setTitle('Görüşme Sonlandırıldı')
            .setDescription('Yetkililer ile gerçekleştirdiğiniz destek konuşması sonlandırıldı. Artık konuşma arşivine erişim sağlanamayacak. Biletinize açılmış kanal tamamen geri dönüşsüz silindi. Yeniden bilet keserek sıfırdan bir görüşme başlatabileceğinizi unutmayın')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(silindi)
        tickchan.delete();

    } else {

        const silinemedi = new MessageEmbed()
            .setTitle('Görüşme Zaten Sonlandırılmış')
            .setDescription('Yetkililer ile gerçekleştirdiğiniz destek konuşması önceden zaten sonlandırılmış. Desteğe ihtiyacınız varsa yeniden bilet keserek sıfırdan bir görüşme başlatabileceğinizi unutmayın')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(silinemedi)

    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kapat'],
    permLevel: 0
};

exports.help = {
    name: 'close'
};