const { MessageAttachment, MessageEmbed} = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");
/*const canvacord = require("canvacord");*/

module.exports.run = async (client, message, args) => {

    const kapali = new MessageEmbed()
        .setTitle('Bu Özellik Kullanılamıyor')
        .setDescription('Bu özellik çeşitli modül arızaları yüzünden geçici süre ile devredışıı bırakılmıştır')
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(kapali)

    /* let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let seyit = client.db.get(`level_${user.id}`) || 0;
    let hyperion = client.db.get(`exp_${user.id}`) || 0;
    let asunack = Math.floor(Math.pow(seyit / 0.1, 2));

    let herkes = client.db.all().filter(i => i.ID.startsWith("exp_")).sort((a, b) => b.data - a.data);
    let seviye = herkes.map(x => x.ID).indexOf(`exp_${user.id}`) + 1;


    const card = new canvacord.Rank()
        .setUsername(user.username)
        .setBackground("IMAGE", "https://i.hizliresim.com/1r9tm2i.png")
        .setDiscriminator(user.discriminator)
        .setRank(seviye)
        .setLevel(seyit)
        .setCurrentXP(hyperion)
        .setRequiredXP(asunack)
        .setStatus(user.presence.status)
        .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

    const img = await card.build();

    return message.channel.send(new MessageAttachment(img, "BÖRÜSeviye.png"));
     */
};

exports.conf = {
    aliases: ["seviye-kartı" , "rank-card", "rankcard", "seviyekartı", "level", "rank"],
    guildOnly: true,
    enabled: true,
    permLevel: 0
};

exports.help = {
    name: "seviye",
    description: "Botun istatistiklerini gösterir",
    usage: "istatistik"
};