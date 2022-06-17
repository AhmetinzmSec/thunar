const Discord = require('discord.js');
const db = require('quick.db');
const {MessageEmbed} = require('discord.js');
const { renk, slogan } = require("../versioninfo.json");

module.exports = msg => {

    if (msg.channel.type == "dm") return;

    if (!db.has(`kufur_${msg.guild.id}`)) return;
    const kufur = ["sg", "amk", "siktirgit", "dalyarak", "daşşak", "taşak", "taşşak", "sikim", "sktr", "sikik", "yavşak", "yavsak", "yaram", "yarram", "yrrm", "yarrak", "skm"];
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
        msg.delete();

        const embed = new MessageEmbed()
            .setTitle('Mesaj Engellendi')
            .addField('Mesajı Silinen Kişi', `${msg.author}`)
            .addField('Silinme Nedeni', 'Mesajda küfür tespit edildi')
            .setColor(renk)
            .setFooter(slogan)

        return msg.channel.send(embed);
    }

}