const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {

    try {

        const Member = message.mentions.members.first()

        if (!message.guild) return;
        const yetkinyok = new discord.MessageEmbed()
            .setTitle("Yetki Reddedildi")
            .setDescription('**Bu birimi kullanmak için `KULLANICILARI_AT` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
            .setColor(renk)
            .setFooter(slogan)
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(yetkinyok)
        var neden = args.slice(2).join(' ') ? args.slice(2).join(' ') : 'Neden Belirtilmedi';
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {

                        if (!db.has("log" + message.guild.id)) return;
                        const log_id = db.fetch("log" + message.guild.id)

                        const embed = new MessageEmbed()
                            .setTitle('Kullanıcı Atıldı')
                            .addField("Kullanıcı başarıyla sunucudan atıldı", "Bot yardımıyla kullanıcı sunucudan atıldı")
                            .addField("Atılan kişi", `${member}`)
                            .addField("Atan yetkili", `${message.author.tag}`)
                            .addField("Atılma nedeni", `${neden}`)
                            .setColor(renk)
                            .setFooter(slogan)

                        const log = message.guild.channels.cache.get(log_id)
                        log.send(embed)
                    })

                if (!db.has("log")) return message.reply('Kullanıcı Atıldı')

                    .catch(err => {

                        const error = new Discord.MessageEmbed()

                            .setTitle("Hata Oluştu")
                            .setDescription(`Bu üyeyi atamam`)
                            .setColor(renk)
                            .setFooter(slogan)

                        message.channel.send(error);
                        console.error(err);
                    });
                if (Member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Yetkili** Bir Kullanıcıyı **Atmaya** Çalışıyorsun. Bunu Yapamam')
            } else {
                const yok = new Discord.MessageEmbed()

                    .setTitle("Hata Oluştu")
                    .setDescription(`Bahsettiğin kişi bizim sunucumuzda bulunmuyor. Etiketi kontrol etmeyi dene`)
                    .setColor(renk)
                    .setFooter(slogan)

                message.channel.send(yok);
            }
        } else {
            const etiketnerdeyrrm = new Discord.MessageEmbed()

                .setTitle("Hata Oluştu")
                .setDescription(`Atılacak kişiyi belirtmedin`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(etiketnerdeyrrm);
        }

    } catch (e) {
        console.log(e)
    }

};

exports.conf = {
    aliases: ['at', 'çıkar',],
    usage: '!çıkar [kullanıcı etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'kick',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */