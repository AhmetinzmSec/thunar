const Discord = require("discord.js");
const fs = require('fs');
const axios = require('axios');
const prettyMilliseconds = require('pretty-ms');
const AdmZip = require('adm-zip')
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    const error = (str) => message.channel.send(new Discord.MessageEmbed().setColor(renk).setTitle('Hata').setDescription(str));

    const yuzdeHesapla = (p1, p2) => {
        const yapilan = p2 - p1;
        return ((yapilan * 100) / p2).toFixed(2)
    };

    const yaklasikSure = (count) => {
        const toplamSure = 2000 * count;
        const tahminiSureIng = prettyMilliseconds(toplamSure);
        const tahminiSureTr = tahminiSureIng
            .replace(/s/g, ' saniye')
            .replace(/m/g, ' dakika')
            .replace(/h/g, ' saat')
            .replace(/ms/g, ' milisaniye');


        return tahminiSureTr;
    };

    const downloadImage = (url, imagePath) =>
        axios({
            url,
            responseType: 'stream',
        }).then(
            response =>
                new Promise((resolve, reject) => {
                    response.data
                        .pipe(fs.createWriteStream(imagePath))
                        .on('finish', () => resolve())
                        .on('error', e => reject(e));
                }),
        );

    message.channel.send(new Discord.MessageEmbed().setTitle('İndirme Onaylıyor musunuz?').setColor(renk).setDescription(`**${message.guild.emojis.cache.size} adet** emoji indirilip, ZIP dosyası olarak verilecek.`).setFooter(slogan)).then(m => {
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
                    fs.promises.mkdir('emojiler')
                    var yuklenen = 1; kalan = message.guild.emojis.cache.size;
                    message.guild.emojis.cache.forEach(async emoji => {
                        const timeout = setTimeout(async () => {
                            var emojiURL = emoji.url, emojiAd = emoji.name, emojiUzanti = emoji.url.split('.')[3].trim();
                            await downloadImage(emojiURL, `emojiler/${emojiAd}.${emojiUzanti}`);
                            await m.edit(new Discord.MessageEmbed().setTitle('Emoji İndirme').setColor(renk).addField('Toplam Emoji Sayısı', message.guild.emojis.cache.size, true).addField('Kaç Emoji Kaldı', kalan).addField('Yüzdelik', `Yüklenen: %${yuzdeHesapla(kalan, message.guild.emojis.cache.size)}`).setFooter(`yaklaşık ${yaklasikSure(kalan)} süre kaldı`))
                            await clearTimeout(timeout)
                            kalan = kalan - 1;
                            if (kalan == 0) {
                                const file = new AdmZip();
                                file.addLocalFolder('./emojiler', 'lauraaaaa from dreamland');
                                fs.writeFileSync('/picadrosec.zip', file.toBuffer());
                                const embed = new Discord.MessageEmbed().setTitle('Emoji İndirme').setColor(renk).setDescription(`**İşlem tamamlandı!** Toplam **${message.guild.emojis.cache.size} adet** emoji indirildi.`)
                                m.edit(embed);
                                message.channel.send({
                                    files: [{ name: 'picadro.zip', attachment: '/picadrosec.zip' }]
                                })
                            }
                        }, yuklenen * 2000);
                        yuklenen = yuklenen + 1;
                    });
                    break;
                case '❌':
                    m.reactions.removeAll();
                    m.edit(new Discord.MessageEmbed().setColor(renk).setDescription(`İşlem kullanıcı isteğiyle iptal edildi`));
                    break;
            };
        });

        collector.on('end', collected => {
            if (collected.size == 0) {
                m.reactions.removeAll();
                m.edit(new Discord.MessageEmbed().setColor(renk).setDescription(`30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
            }
        });
    });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ei', 'emojiindir'],
    permLevel: 0
};

exports.help = {
    name: 'emoji-indir',
    description: 'emoji indirme sistemi, laura tarafından yapıldı.'
};