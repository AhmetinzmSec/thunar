const Discord = require("discord.js");
const db = require("quick.db");
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
   const ownerID = [
    "801006452416184330",
    "botOwner"
  ];
    const yetkinyok = new Discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu komutu sadece geliştiricim kullanabilir**')
        .setColor(renk)
        .setFooter(slogan)
  if (!ownerID.includes(message.author.id)) return message.channel.send(yetkinyok);

  let user = message.mentions.members.first() || message.author;

    const kabuldegil = new Discord.MessageEmbed()
        .setTitle("Aktarım Başarısız")
        .setDescription(`İlk olarak kullanıcı etiketlemeye ne dersin sahip?`)
        .setColor(renk)
        .setFooter(slogan)
    if (isNaN(args[1])) return message.channel.send(kabuldegil);

    db.add(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)

    const basari = new Discord.MessageEmbed()
        .setTitle("Aktarım Başarılı")
        .setDescription(`**${user}** kullanıcısının bakiyesine \`${args[1]}\` kredi eklendi \n > Mevcut bakiye: \`${bal}\` kredi`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(basari)

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['addmoney', 'para-ekle', 'paraver', 'paraekle'],
    usage: '',
    permLevel: 0
}

exports.help = {
    name: 'para-ver'
};