const Discord = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json")
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, arsg) => {
        
        const yetkimyok = new discord.MessageEmbed()
            .setTitle("Thunar'a İzin Denetimini Geçemedi")
            .setDescription('**Thunar tarafından bu birimin işlenmesi için bota `MESAJ_GÖNDER` ya da `YÖNETİCİ` yetkisine sahip olmalıdır**')
            .setColor(renk)
            .setFooter(slogan)
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return message.channel.send(yetkimyok)

        const msg = await message.channel.send(`🏓 Ping Ölçülüyor...`)
        const embed = new MessageEmbed()
            .setTitle('Ping Ölçüldü')
            .addField('Bot Pingi', `${client.ws.ping} ms`)
            .addField('Mesaj Gecikme Süresi', `${Math.floor(msg.createdAt - message.createdAt)} ms`)
            .setColor(renk)
            .setFooter(slogan)
        await message.channel.send(embed)
        msg.delete()

};

exports.conf = {
    aliases: ['ms'],
    permLevel: 0,
    usage: 'Sadece komutun ismini yazmanız yeterli',
    kategori: "Eğlence",
};

exports.help = {
    name: 'ping',
    description: 'Sunucuya girenlere isteğe bağlı Captcha yaptırır.',
    usage: 'ping',
    cooldowns: 5
};
