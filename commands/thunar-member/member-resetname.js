const Discord = require('discord.js');
const prettyMilliseconds = require('pretty-ms');
const { renk, slogan } = require("../../versioninfo.json");
const discord = require("discord.js");

exports.run = async(client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `KULLANICI_İSİMLERİNİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if(!message.member.permissions.has("MANAGE_NICKNAMES")) return message.channel.send(yetkinyok)

    const yuzdeHesapla = (p1, p2) => {
        const yapilan = p2 - p1;
        return ((yapilan * 100) / p2).toFixed(2)
    };

    const yaklasikSure = (count) => {
        const toplamSure = 3000 * count;
        const tahminiSureIng = prettyMilliseconds(toplamSure);
        const tahminiSureTr = tahminiSureIng
            .replace(/s/g, ' saniye')
            .replace(/m/g, ' dakika')
            .replace(/h/g, ' saat')
            .replace(/ms/g, ' milisaniye');


        return tahminiSureTr;
    };

    const deneme = message.guild.members.cache.map(a => a.nickname)
    if (deneme) {
        var members = message.guild.members.cache.array()
        members = members.filter(x => x.nickname !== null && message.guild.me.roles.highest.position > x.roles.highest.position && x.id !== message.guild.owner.id)

        var members2 = message.guild.members.cache.array()
        members2 = members2.filter(x => x.nickname !== null)

        if (members.length == 0) return message.channel.send("Sunucuda takma adı olan kimse yok")


        const onayEmbed = new Discord.MessageEmbed()
            .setFooter(slogan)
            .setColor(renk)
            .addField('Kullanıcı Adı Sıfırlanacak Kişi:', members.length, true)
            .addField('İşlem Süresi:', yaklasikSure(members.length), true)
            .addField('İşlemi Onaylıyor Musun?', `Evet: ✅  Hayır: ❌`)
            .setAuthor(`${message.author.username} Herkesin kullanıcı adını sıfırlamak mı istiyorsun?`, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

        message.channel.send(onayEmbed).then(m => {
            m.react('✅');
            m.react('❌');
            const emojies = ['✅', '❌'];
            const filter = (reaction, user) => {
                return emojies.includes(reaction.emoji.name) && message.author.id == user.id;
            };

            const collector = m.createReactionCollector(filter, { max: 1, time: 30000 })
            collector.on('collect', (reaction, user) => {
                switch (reaction.emoji.name) {
                    case '✅':
                        m.reactions.removeAll();

                        var islemYapilan = 1, kalanKisi = members.length;
                        members.forEach(b => {
                            const timeout = setTimeout(() => {
                                message.guild.members.cache.get(b.user.id).setNickname("").catch(err => {})
                                message.guild.members.cache.get(client.user.id).setNickname("").catch(err => {})
                                m.edit(new Discord.MessageEmbed()
                                    .setColor(renk)
                                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                                    .setAuthor(`${message.author.username} Herkesin kullanıcı adı sıfırlanıyor...`)
                                    .addField('Kalan Kişi:', kalanKisi, true)
                                    .addField('Tamamlanacak Yüzde:', `%${yuzdeHesapla(kalanKisi, members.length)}`, true)
                                    .addField('Toplam Süre:', yaklasikSure(members.length), true)
                                    .addField(`Kalan Süre:`, `${yaklasikSure(kalanKisi)}`, true)
                                    .setFooter(slogan))
                                clearTimeout(timeout)
                                kalanKisi = kalanKisi - 1;
                                if (kalanKisi == 0) {
                                    setTimeout(() => {
                                        m.edit(new Discord.MessageEmbed()
                                            .setTitle("Tamamlandı")
                                            .setColor(renk)
                                            .setDescription(`Toplamda **${members.length}** üyenin kullanıcı adı  başarıyla sıfırlandı.`)
                                            .setFooter(slogan)
                                        )
                                    }, 1000)
                                }
                            }, islemYapilan * 1000);
                            islemYapilan = islemYapilan + 1;
                        })


                        break;
                    case '❌':
                        m.reactions.removeAll();
                        m.edit(new Discord.MessageEmbed().setColor(renk).setDescription(`❌ Ret tepkisine basıldığı için işlem iptal edildi.`));
                        break;
                };
            });

            collector.on('end', collected => {
                if (collected.size == 0) {
                    m.reactions.removeAll();
                    m.edit(new Discord.MessageEmbed().setColor(renk).setDescription(`❌ 30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
                }
            })
        });

    } else {
        message.channel.send(`Takma adı olan yok bu yüzden sıfırlamayamıyorum.`)
    }
}

exports.conf = {
    enabled: true,
    aliases: [ 'kas'],
};

exports.help = {
    name: 'kullanıcıadlarısıfırla',
    description: 'Sunucuda takma adların hepsini temizler',
    usage: 'kullanıcıadlarısıfırla'
};