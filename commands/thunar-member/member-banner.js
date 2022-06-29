const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let uid = user.id

    const kabuletmedi = new MessageEmbed()
        .setTitle("Afiş Görüntülenemiyor")
        .setDescription("Görünüşe göre bu kullanıcı Thunar Kullanıcı Sözleşmesi'ni kabul etmemiş. Gizlilik politikamız gereği bu kullanıcının afişini gösteremiyorum")
        .setColor(renk)
        .setFooter(slogan)
    if (!kabulettimi) return message.channel.send(kabuletmedi);

    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${client.token}`
        }
    })

    let receive = ''
    let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'

    response.then(a => {
        if (a.status !== 404) {
            a.json().then(data => {
                receive = data['banner']

                if (receive !== null) {

                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${client.token}`
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                        }

                    })
                }
            })
        }
    })

    setTimeout(() => {
        let eyok = new MessageEmbed()
            .setTitle("Hata")
            .setDescription("Bu kullanıcının afişi bulunamadı")
            .setColor(renk)
            .setFooter(slogan)
        if (!receive) return message.channel.send(eyok)
        let embed = new MessageEmbed()
            .setTitle("Afiş")
            .setColor(renk)
            .setFooter(slogan)
            .setImage(banner)
        message.channel.send(embed)
    }, 1000)

}

exports.conf = {
    aliases: ['afiş'],
    permLevel: 0,
    kategori: "Moderasyon",
};

exports.help = {
    name: 'banner',
    description: 'İstediğiniz kullanıcının Bannerını verir.',
    usage: 'banner <Kullanıcı Adı>',
};