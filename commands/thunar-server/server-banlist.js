const Discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

    const bans = new Map();
    message.guild.fetchBans().then(g => {
        bans[g.id] = g;
        let banlist = (`${bans[g.id].map(ge => `\n (${ge.user.tag}) (${ge.user.id})`).join('\n')}`)
        try {
            let noembed = new Discord.MessageEmbed()
                .setDescription(`Bu Sunucuda Yasaklı Kullanıcı Bulunmuyor.`)
                .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : "https://images-ext-2.discord.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discord.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
                .setColor(renk)
                .setFooter(slogan)
            if (banlist.length === 0) return message.channel.send(noembed)
            const embed = new Discord.MessageEmbed()
                .setDescription(banlist)
                .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : "https://images-ext-2.discord.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discord.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(embed)
        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .addField(`Sunucuda Bulunan Yasaklılar`, '<:no:663378512417128449> Üzgünüm ama sunucunuzda fazla sayıda yasaklı kullanıcı bulunuyor Bu Yüzden gösteremiyorum. Discord buna izin vermiyor.')
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(embed)
        }

    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['yasak-listesi'],
    usage: 'Sadece komutun ismini girmeniz yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'banlist',
    description: 'Sunucudaki Yasaklı Kullanıcıları Gösterir.',
    usage: 'banlist',

};