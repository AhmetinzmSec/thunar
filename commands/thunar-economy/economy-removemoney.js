const Discord = require("discord.js");
const db = require("quick.db");
const {renk, slogan} = require("../../versioninfo.json");

module.exports.run = async (bot, message, args) => {
  const ownerID = [
    "801006452416184330",
    "ownerID"
  ];
  if (!ownerID.includes(message.author.id)) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)

  const silivrisoguk = new Discord.MessageEmbed()
      .setTitle("Vergi Kesildi")
      .setDescription(`\`${args[1]}\` miktar kredi **${user}** kullanıcısının hesabından kesildi.\n> Kalan bakiye: \`${bal}\``)
      .setColor(renk)
      .setFooter(slogan)
  message.channel.send(silivrisoguk)

};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['parakes', 'parakaldır', 'parasil'],
  usage: '',
  permLevel: 0
}

exports.help = {
  name: 'vergi'
};