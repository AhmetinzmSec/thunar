const Discord = require('discord.js');
const db = require('quick.db')
const {token, default_prefix} = require('../../config.json');
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = default_prefix;

    const yetkimyok = new discord.MessageEmbed()
        .setTitle("Thunar'a İzin Denetimini Geçemedi")
        .setDescription('**Thunar tarafından bu birimin işlenmesi için bota `KANALI_TAŞI` ya da `YÖNETİCİ` yetkisine sahip olmalıdır**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(yetkimyok)

    if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
        const zatevar = new discord.MessageEmbed()
            .setTitle("Kesilmiş Bilet Saptandı")
            .setDescription('Zaten önceden kesilmiş bir biletinizi var')
            .setColor(renk)
            .setFooter(slogan)
        return message.reply(zatevar);
    }

    message.delete();

    message.guild.channels.create(`ticket-${message.author.id}`, {
        permissionOverwrites: [
            {
                id: message.author.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
                id: message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
            },
        ],
        type: 'text',
    }).then(async channel => {
        const ticket = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} Tarafına Ait Destek Bileti`)
            .setDescription(`**${message.author}, Kanalınıza hoş geldiniz! Destek yakında gelecek**\n**Beklerken lütfen bize sorununun ne olduğunu söyle**\n**Bileti kapatmak istiyorsanız lütfen \`${prefix}close\` yazın**`)
            .setColor(renk)
            .setFooter(slogan)

        const oke = new discord.MessageEmbed()
            .setTitle("Bilet Kesildi")
            .setDescription(`Başarıyla bir bilet oluşturdunuz, biletinizi görüntülemek için lütfen ${channel} tıklayın`)
            .setColor(renk)
            .setFooter(slogan)
        message.reply(oke).then(m => m.delete({timeout: 14000}).catch(e => {
        }));
        channel.send(`${message.author}`, ticket);
        let mChannel = db.fetch(`modlog_${message.guild.id}`)
        let tChannel = message.guild.channels.cache.get(mChannel)
        if (!tChannel) return;
        const oldula = new discord.MessageEmbed()
            .setTitle("Destek Bileti Oluşturuldu")
            .setDescription(`Bilet ${message.author.id} tarafından oluşturuldu, <#${channel.id}> kanalında desteğe ulaşabilirsiniz`)
            .setColor(renk)
            .setFooter(slogan)
        tChannel.send(oldula)
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ticket", "bilet"],
    permLevel: 0
};

exports.help = {
    name: 'setup'
};