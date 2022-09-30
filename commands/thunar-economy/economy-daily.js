const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

  let user = message.author;

  let timeout = 86400000;
  let amount = 250;

   let daily = await db.fetch(`daily_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

    const erkenci = new Discord.MessageEmbed()
        .setTitle("Erkencisin Bakıyorum")
        .setDescription(`Birileri erkenci galiba. Sabret dostum. Günlük ödüller \`${time.hours} saat, ${time.minutes} dakika, ${time.seconds} saniye\` sonunda yenilenecek.`)
        .setColor(renk)
        .setFooter(slogan)
      message.channel.send(erkenci)
  } else {

    const odul = new Discord.MessageEmbed()
        .setTitle("Günlük Ödül Verildi")
        .setDescription(`Hesabınıza \`${amount}\` günlük ödül aktarıldı`)
        .setColor(renk)
        .setFooter(slogan)
  message.channel.send(odul)

  db.add(`money_${user.id}`, amount)
  db.set(`daily_${user.id}`, Date.now())

  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['günlük-hediye', 'daily', 'ödül'],
  usage: '',
  permLevel: 0
}

exports.help = {
  name: 'günlük'
};