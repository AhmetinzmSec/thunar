const slotItems = ["🍇", "🎰", "🍌", "🍉", "🍋", "💸", "🍒"];
const db = require("quick.db");
const Discord = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json");

module.exports.run = async (client, message, args) => {
 
    let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    const nekadarveriyon = new Discord.MessageEmbed()
        .setTitle("Aktarım Başarısız")
        .setDescription(`Kredi vermek için bir miktar belirtin`)
        .setColor(renk)
        .setFooter(slogan)
    if (!money) return message.channel.send(nekadarveriyon);

    const cokzenginsin = new Discord.MessageEmbed()
        .setTitle("Bahis Başarısız")
        .setDescription(`Yeterince krediniz mevcut değil`)
        .setColor(renk)
        .setFooter(slogan)
    if (money > moneydb) return message.channel.send(cokzenginsin);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setTitle("Slotlar Düşürüldü")
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nKazandınız \`${money}\` kredi.`)
            .setColor(renk)
        message.channel.send(slotsEmbed1)

        db.add(`money_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setTitle("Slotlar Düşürüldü")
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nKaybettiniz \`${money}\` credits.`)
            .setColor(renk)
        message.channel.send(slotsEmbed)
        db.subtract(`money_${user.id}`, money)
    }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['bahis'],
    usage: '',
    permLevel: 0
}

exports.help = {
    name: 'slot'
};
