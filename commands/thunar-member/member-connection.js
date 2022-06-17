const Discord = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {// Can°B#1308

    let member;
    if (message.mentions.members.first()) {
        member = message.mentions.members.first()
    } else {
        member = message.member;

    }

    let baknedicm = {
        web: 'İnternet Tarayıcısı',
        desktop: 'Bilgisayar Masaüstü Programı',
        mobile: 'Mobil Uygulama'
    }

    let durum = (member.user.presence.status).replace('dnd', 'Rahatsız etmeyin').replace('idle', 'Boşta').replace('online', 'Çevrimiçi').replace('offline', 'Çevrimdışı');
    let uyy;
    if (member.user.presence.status !== 'offline') {
        uyy = ` ${baknedicm[Object.keys(member.user.presence.clientStatus)[0]]}`
    } else { return message.channel.send('Kullanıcı Çevrimdışı') }
    const basarili = new Discord.MessageEmbed()
        .setTitle('Bağlantı Durumu')
        .addField('Bilgi Gösterilen Kullanıcı', member.user.tag)
        .addField('Durumu', durum)
        .addField('Bağlandığı Cihaz', `${uyy}`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(basarili)

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['connection', 'bağlantı-durumu'],
    usage: '!bağlantı [kullanıcı etiketi]',
    permLevel: 0
}

exports.help = {
    name: 'bağlantı'
};
