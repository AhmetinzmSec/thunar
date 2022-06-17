const Discord = require("discord.js");
const database = require("quick.db");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format');
const { renk, slogan } = require("../../versioninfo.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");

exports.run = (client, message, args) => {//hamzamertakbaba#1268

    let Member = message.mentions.users.first()
    if (!Member) return message.channel.send(`${message.author} Durumuna bakmak istediğin bir kullanıcıyı etiketlemelisin.`).then(m => m.delete({ timeout: 10000 }));

    let kabulettimi = db.fetch(`kabulettimi_${Member.id}`);

    const kabuletmedi = new MessageEmbed()
        .setTitle("Durum Bilgisi Görüntülenemiyor")
        .setDescription("Görünüşe göre bu kullanıcı Thunar Kullanıcı Sözleşmesi'ni kabul etmemiş. Sözümü tutarak bu kullanıcının durum bilgisini gösteremiyorum")
        .setColor(renk)
        .setFooter(slogan)
    if (!kabulettimi) return message.channel.send(kabuletmedi);

    if (Member.bot) return message.channel.send(`${message.author} Botların durumlarına bakamıyorum`).then(m => m.delete({ timeout: 10000 }));
    if (Member.presence.status === "offline") {
        const Embed = new Discord.MessageEmbed()
            .setAuthor(Member.username, Member.displayAvatarURL({ dynamic: true }))
            .setColor("BLACK")
            .setDescription(`Bu kullanıcı Çevrimdışı`)
            .setFooter(slogan)
        message.channel.send(Embed)
    } else {
        let Array = [];
        if (Member.presence.status === "dnd") Array.push("#FF0000")
        if (Member.presence.status === "idle") Array.push("GOLD")
        if (Member.presence.status === "online") Array.push("GREEN")
        const Embed = new Discord.MessageEmbed()
            .setAuthor(Member.username, Member.displayAvatarURL({ dynamic: true }))
            .setColor(`${Array}`)
            .setDescription(`Bu Kullanıcı ${Member.presence.status.replace("dnd", "Rahatsız Etmeyin").replace("idle", "Boşta").replace("online", "Çevrimiçi")} modunda aktif.`)
            .setFooter(slogan)
        message.channel.send(Embed)
    };

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['status'],
    usage: '!durum [kullanıcı etiketi]',
    permLevel: 0
}

exports.help = {
    name: 'durum'
};
