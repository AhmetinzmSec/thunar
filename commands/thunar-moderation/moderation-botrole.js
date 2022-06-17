const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    var botrol = message.mentions.roles.first()

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(yetkinyok)

    if (!args[0]) return message.channel.send('Lütfen bir rol etiketleyiniz')

    if (args[0] === "sil" || args[0] == "delete") {

        if (!db.has("bototorole" + message.guild.id)) return message.reply('Botlar için ayarlanmış rol bulunmamakttadır')

        db.delete("bototorole" + message.guild.id)

        const embed = new MessageEmbed()
            .setTitle('Bot Otorol Sıfırılandı')
            .setDescription('Artık yeni eklenen botlara rol verilmeyecek')
            .setColor(renk)
            .setFooter(slogan)
        return message.channel.send(embed)

    }

    if (botrol) {

        db.set("bototorole" + message.guild.id, botrol.id)

        const embed = new MessageEmbed()
            .setTitle('Bot Otorol Ayarlandı')
            .setDescription(`Bot rolü <@&${botrol.id}> oldu. Sunucuya yeni bir üye katıldığında artık **${botrol.name}** adlı rol verilecek`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)

    } else {

        botrol = message.guild.roles.cache.find(role => role.name.includes(args.join(" ")))

        if (!botrol) botrol = message.guild.roles.cache.find(role => role.id.includes(args.join(" ")))

        if (!botrol) botrol = message.reply('Rolü bulamadım')

        db.set("bototorole" + message.guild.id, botrol.id)

        const embed = new MessageEmbed()
            .setTitle('Bot Otorol Ayarlandı')
            .setDescription(`Bot rolü <@&${botrol.id}> oldu. Sunucuya yeni bir üye katıldığında artık **${botrol.name}** adlı rol verilecek`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(embed)

    }

};

exports.conf = {
    aliases: ['bot-autorole',],
    usage: '!bot-otorol [rol etiketi] -- !bot-otorol sil',
    permLevel: 0
};

exports.help = {
    name: 'bot-otorol',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */
