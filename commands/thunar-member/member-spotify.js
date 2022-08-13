const Discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send("Birini Etiketle Veya ID'sini Gir!");
    const user = message.mentions.members.first() || await client.users.fetch(args[0]) || message.member;
    if (!user) return message.channel.send("Birini Etiketle Veya ID'sini Gir!");

    let kabulettimi = db.fetch(`kabulettimi_${user.id}`);

    /*
    * const kabuletmedi = new MessageEmbed()
        .setTitle("Spotify Bilgisi Görüntülenemiyor")
        .setDescription("Görünüşe göre bu kullanıcı Thunar Kullanıcı Sözleşmesi'ni kabul etmemiş. Sözümü tutarak bu kullanıcının spotify bilgisini gösteremiyorum")
        .setColor(renk)
        .setFooter(slogan)
    if (!kabulettimi) return message.channel.send(kabuletmedi);
    * */

    let spotify = user.presence.activities.filter(x => x.name == 'Spotify' && x.type == 'LISTENING')[0];
    if (!spotify) return message.channel.send("Spotify Açık Değil!");
    let resim = `https://i.scdn.co/image/${spotify.assets.largeImage.slice(8)}`;
    let url = `[Tıkla](https://open.spotify.com/track/${spotify.syncID})`
    let ad = spotify.details;
    let album = spotify.assets.largeText;
    let yapimci = spotify.state;
    const embed = new Discord.MessageEmbed()
        .setTitle("Spotify Bilgisi")
        .setThumbnail(resim)
        .addField('Gözlemlediğiniz Kişi', user.user.username)
        .addField('Şarkı İsmi', ad, true)
        .addField('Albüm', album, true)
        .addField('Yapımcı', yapimci, false)
        .addField('Şarkı Bağlantısı', url, true)
        .setColor(renk)
        .setFooter(slogan)

    message.channel.send(embed);


};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
};
exports.help = {
    name: 'spotify',
    description: '',
    usage: 'spotify'
};