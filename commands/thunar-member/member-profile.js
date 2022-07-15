const Discord = require('discord.js');
const moment = require('moment');
const db = require("quick.db");
moment.locale('tr');
const { renk, slogan } = require("../../versioninfo.json");
const {MessageEmbed} = require("discord.js");

exports.run = (client, message, args) => {

    let mention = message.author;
    if (message.mentions.members.first()) mention = message.mentions.members.first().user;

    let kabulettimi = db.fetch(`kabulettimi_${mention.id}`);

    let mentionMember = message.guild.members.cache.get(mention.id);

    let slm = {
        web: 'İnternet Tarayıcısı',
        desktop: 'Bilgisayar',
        mobile: 'Mobil'
    }
    let oyunlar = [];
    mention.presence.activities.forEach(slm => {
        if (slm.type === 'CUSTOM_STATUS') {
            oyunlar.push(`${slm.emoji ? slm.emoji : ''} ${slm.state}`);
        } else {
            oyunlar.push(`**${slm.name}** ${slm.type.replace('PLAYING', 'oynuyor').replace('STREAMING', 'yayınlıyor').replace('LISTENING', 'dinliyor').replace('WATCHING', 'izliyor')}`)
        }
    });

    var sunucugirme = "";
    if (moment(mention.joinedAt).format("MM") === "01") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Ocak ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "02") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Şubat ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "03") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Mart ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "04") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Nisan ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "05") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Mayıs ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "06") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Haziran ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "07") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Temmuz ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "08") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Ağustos ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "09") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Eylül ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "10") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Ekim ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "11") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Kasım ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.joinedAt).format("MM") === "12") {
        var sunucugirme = `${moment(mention.joinedAt).format("DD")} Aralık ${moment(
            mention.joinedAt
        ).format("YYYY HH:mm:ss")} `;
    }

    var dcolusturma = "";
    if (moment(mention.createdAt).format("MM") === "01") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Ocak ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "02") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Şubat ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "03") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Mart ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "04") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Nisan ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "05") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Mayıs ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "06") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Haziran ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "07") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Temmuz ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "08") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Ağustos ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "09") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Eylül ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "10") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Ekim ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "11") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Kasım ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    if (moment(mention.createdAt).format("MM") === "12") {
        var dcolusturma = `${moment(mention.createdAt).format("DD")} Aralık ${moment(
            mention.createdAt
        ).format("YYYY HH:mm:ss")} `;
    }
    let nitroDurum = false;
    if (mention.presence.activities[0]) {
        if (mention.presence.activities[0].emoji) {
            if (mention.presence.activities[0].emoji.animated) nitroDurum = true;
        };
    };

    let rozetler = false;
    if (mention.flags.toArray().length <= 0) {
        rozetler = false;
    } else {
        rozetler = true;
    };

    let mentionFlags = mention.flags.toArray().join(' | ')
        .replace('HOUSE_BRAVERY', '<:bravery:899228014674595870> Bravery')
        .replace('HOUSE_BRILLIANCE', '<:brillance:899228017690304522>  Brilliance')
        .replace('HOUSE_BALANCE', '<:balance:899228017291833364>  Balance')
        .replace('VERIFIED_DEVELOPER', '1. Dönemde Doğrulanmış Bot Geliştiricisi')
        .replace('DISCORD_EMPLOYEE', 'Discord Çalışanı')
        .replace('PARTNERED_SERVER_OWNER', 'Discord Partner')
        .replace('HYPESQUAD_EVENTS', 'HypeSquad Events')
        .replace('BUGHUNTER_LEVEL_1', 'Bug Avcısı 1. Lvl')
        .replace('EARLY_SUPPORTER', 'Erken Destekçi')
        .replace('TEAM_USER', 'Takım Üyesi')
        .replace('SYSTEM', 'Sistem')
        .replace('BUGHUNTER_LEVEL_2', 'Bug Avcısı 2. Lvl')
        .replace('VERIFIED_BOT', 'Onaylı Bot')
        .replace('SUBSCRIBER', 'Nitro Aboneliği')
        .replace('SERVER_BOOSTING', 'Sunucu Takviyecisi');
    let userinfo = {};
    userinfo.status = mention.presence.status.toString()
        .replace('online', '<:online:880495809139970048> Çevrimiçi')
        .replace('idle', '<:idle:880495819852238868> Boşta')
        .replace('dnd', '<:dnd:880495819869003846> Rahatsız Etmeyin')
        .replace('offline', '<:offline:880495818690412566> Çevrimdışı')
    userinfo.od1 = message.guild.members.cache.get(mention.id).user.presence.game || "Oynadığı Bir Oyun Yok.";

    const kabuletmedi = new MessageEmbed()

        .setAuthor(mention.tag, mention.avatarURL({ dynamic: true }))
        .setThumbnail(mention.avatarURL({ dynamic: true }))
        .setDescription("Kullanıcı gizlilik politikamızı kabul etmediği için belirli kısıtlamalar ile proifl içeriği görüntüleniyor")
        .addField("> Kullanıcı Bilgi", "** **")
        .addField('**__Durum__**', 'Gizlilik politikası uygulanıyor', true)
        .addField('**__Ad__**', ` ${mention.username}`, true)
        .addField('**__Rozetler__**', `${rozetler ? mentionFlags : 'Rozet Almamış'}`, true)
        .addField('**__Kullanıcı Kimliği__**', `Gizlilik politikası uygulanıyor`, true)
        .addField(

            `**__Güvenilirlik__**`,

            `${(
                (new Date().getTime()) - mention.createdAt.getTime() <
                15 * 24 * 60 * 60 * 1000
                    ? ":warning:  Tehlikeli"
                    : ":shield:  Güvenli"
            )}
      `,

            true

        )
        .addField("> Tarih Bilgisi", "** **")
        .addField('**__Discord`a Kayıt Tarihi__**', `Gizlilik politikası uygulanıyor`, true)
        .addField(">  Sunucu İçi Bilgisi", "** **")
        .addField('**__Takma Ad__**', `:scroll:  ${mentionMember.displayName}`, true)
        .addField('**__Roller__**', `:scroll:  ${mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Hiç yok.'}`, true)
        .setColor(renk)
        .setFooter(slogan)

    if (!kabulettimi) return message.channel.send(kabuletmedi);

    const embed = new Discord.MessageEmbed()
        .setAuthor(mention.tag, mention.avatarURL({ dynamic: true }))
        .setThumbnail(mention.avatarURL({ dynamic: true }))
        .addField("> Kullanıcı Bilgi", "** **")
        .addField('**__Durum__**', `${userinfo.status}`, true)
        .addField('**__Ad__**', ` ${mention.username}`, true)
        .addField('**__Rozetler__**', `${rozetler ? mentionFlags : 'Rozet Almamış'}`, true)
        .addField('**__Kullanıcı Kimliği__**', `:id:  ${mention.id}`, true)
        .addField(

            `**__Güvenilirlik__**`,

            `${(
                (new Date().getTime()) - mention.createdAt.getTime() <
                    15 * 24 * 60 * 60 * 1000
                    ? ":warning:  Tehlikeli"
                    : ":shield:  Güvenli"
            )}
      `,

            true

        )
        .addField("> Tarih Bilgisi", "** **")
        .addField('**__Discord`a Kayıt Tarihi__**', `:date:  ${dcolusturma}`, true)
        .addField(">  Sunucu İçi Bilgisi", "** **")
        .addField('**__Takma Ad__**', `:scroll:  ${mentionMember.displayName}`, true)
        .addField('**__Roller__**', `:scroll:  ${mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Hiç yok.'}`, true)
        .setColor(renk)
        .setFooter(slogan)

    if (kabulettimi) return message.channel.send(embed);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["profil", 'kb', "kullanıcı-bilgi"],
    usage: '!profil [kullanıcı etiketi] \n\n (Eğer kullanıcı etiketlemezseniz sizin profiliniz hakkında bilgi verir)',
    permLevel: 0
};

exports.help = {
    name: 'kullanıcıbilgi'
};