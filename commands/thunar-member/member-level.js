const { MessageAttachment, MessageEmbed} = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");
/*const canvacord = require("canvacord");*/
const db = require("quick.db")

module.exports.run = async (client, message, args) => {

    const hata = new MessageEmbed()
        .setTitle("Rank'a Erişilemiyor")
        .setDescription("Modülsel bir sorun saptandı. Modül sorunu çözülene kadar rank kullanılamaycak")
        .setColor(renk)
        .setFooter(slogan)

    return message.channel.send(hata)

    let mention = message.author;
    if (message.mentions.members.first()) mention = message.mentions.members.first().user;

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let seyit = db.fetch(`level_${user.id}`) || 0;
    let hyperion = db.fetch(`exp_${user.id}`) || 0;
    let asunack = Math.floor(Math.pow(seyit / 0.1, 2));

    let herkes = db.all().filter(i => i.ID.startsWith("exp_")).sort((a, b) => b.data - a.data);
    let seviye = herkes.map(x => x.ID).indexOf(`exp_${user.id}`) + 1;


    const card = new canvacord.Rank()
        .setUsername(user.username)
        .setBackground("IMAGE", "https://i.hizliresim.com/98otl7d.png")
        .setDiscriminator(user.discriminator)
        .setRank(seviye)
        .setLevel(seyit)
        .setCurrentXP(hyperion)
        .setRequiredXP(asunack)
        .setStatus(user.presence.status)
        .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

    const img = await card.build();

    return message.channel.send(new MessageAttachment(img, "ThunarLevel.png"));

};

exports.conf = {
    aliases: ["seviye-kartı" , "rank-card", "rankcard", "seviyekartı", "rc", "rank"],
    guildOnly: true,
    enabled: true,
    permLevel: 0
};

exports.help = {
    name: "seviye",
    description: "Botun istatistiklerini gösterir",
    usage: "istatistik"
};