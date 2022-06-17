const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, message, args) => {
    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birimi kullanmak için `EMOJİLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)

    if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(izinyok);

    if(!args[0]) return message.channel.send('Bir link ve ad yazmalısın. `!emojiekle https://cdn.discordapp.com/emojis/601379275769118731.png erensibot`');
    if(!args[0].endsWith('.png')) return message.channel.send('Doğru bir link yazmalısın. Link `.png` uzantısını belirtmelidir');
    if(!args[1]) return message.channel.send('Bir emoji adı yazmalısın. `!emojiekle https://cdn.discordapp.com/emojis/601379275769118731.png erensibot`');

    if(['ç', 'ö', 'ü', 'ş', 'İ', 'ğ', 'Ç', 'Ö', 'Ü', 'Ş', 'Ğ'].includes(args[1])) return message.channel.send('**Emoji adını yazarken Türkçe karakter kullanmamalısın!**');
    message.guild.emojis.create(args[0], args.slice(1).join(' ')).then(s => {

        const embed = new MessageEmbed()
            .setTitle('Emoji Oluşturuldu')
            .setDescription(`${s.name} adında emoji oluşturuldu. (${s})`)
            .setColor(renk)
        .setFooter(slogan)

        message.channel.send(embed);
    });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojiekle'],
    usage: '!emojiekle [fotoğraf linki] [emojinize vereceğiniz isim]',
    permLevel: 0
};

exports.help = {
    name: 'emoji-ekle'
};