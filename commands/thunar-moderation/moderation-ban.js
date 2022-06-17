const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const { renk, slogan } = require("../../versioninfo.json");
const discord = require("discord.js");

exports.run = (client, message, args) => {

    try {
        const yetkinyok = new discord.MessageEmbed()
            .setTitle("Yetki Reddedildi")
            .setDescription('**Bu birimi kullanmak için `KULLANICILARI_YASAKLA` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
            .setColor(renk)
            .setFooter(slogan)
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(yetkinyok)

        const Member = message.mentions.members.first()

        const user = message.mentions.users.first();

        if (!message.guild) return;

        var neden = args.slice(1).join(' ') ? args.slice(1).join(' ') : 'Neden Belirtilmedi';

        if (user) {

            const member = message.guild.member(user);
            if (member) {

                member
                    .ban({
                        neden: 'Kötü Çocuk!',
                    })
                    .then(() => {

                        if (!db.has("blog" + message.guild.id)) return;
                        const log_id = db.fetch("blog" + message.guild.id)

                        const embed = new MessageEmbed()
                            .setTitle('Kullanıcı Yasaklandı')
                            .addField("Kullanıcı başarıyla sunucudan yasaklandı", "Bot yardımıyla kullanıcı sunucudan yasaklandı")
                            .addField("Yasaklanan kişi", `${member}`)
                            .addField("Yasaklayan yetkili", `${message.author.tag}`)
                            .addField("Yasaklanma nedeni", `${neden}`)
                            .setColor(renk)
                            .setFooter(slogan)

                        const log = message.guild.channels.cache.get(log_id)
                        log.send(embed)

                        if (!db.has("blog")) return message.reply('Kullanıcı Yasaklandı')

                    })


                    .catch(err => {

                        const error = new Discord.MessageEmbed()

                            .setTitle("Hata Oluştu")
                            .setDescription(`Bu üyeyi atamam`)
                            .setColor(renk)
                            .setFooter(slogan)

                        message.channel.send(error);

                        console.error(err);
                    });

                if (Member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Yetkili** Bir Kullanıcıyı **Yasaklamaya** Çalışıyorsun. Bunu Yapamam')

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
                .setDescription(`Yasaklanacak kişiyi belirtmedin`)
                .setColor(renk)
                .setFooter(slogan)

            message.channel.send(etiketnerdeyrrm);

        }

    } catch (e) {

        console.log(e)

    }


};

exports.conf = {
    aliases: ['yasak',],
    usage: '!ban [kullanıcı etiketi]',
    permLevel: 0
};

exports.help = {
    name: 'ban',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */