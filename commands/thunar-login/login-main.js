const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const rolyoh = new MessageEmbed()

        .setTitle('Sistem Kullanılamıyor')
        .setDescription(`**${message.author} Bu sunucuda bu sistem aktif değildir. Eğer sunucuda sohbete başlamak için kayıt olman isteniyorsa sunucu sahibiyle iletişime geçerek sistemi aktif etmesini isteyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!db.has("loginrole" + message.guild.id)) return message.reply(rolyoh)

    var user = message.author ? message.guild.member(message.author) : null;

    if (!user) return message.reply('Herkes Kendini Kaydedebilir');

    if ((args || []).length < 2) return message.reply('İsim ve yaş yazman gerekli. Örnek kullanım; `!kayıt Ahmet 18`')

    args = args.splice(0);
    var ad = args.filter((e, i) => i != args.length - 1).join(' ');
    var yas = args[args.length - 1];

    if (yas < 2 || yas > 100) return message.reply('Minimum yaş değeri 2 maksimum yaş değeri 100 olmalıdır');
    if (isNaN(yas)) return message.reply('Yaş Sayısal Bir Değer İçermelidir');


    const hasar = new MessageEmbed()

        .setTitle('Sistem Bozuk')
        .setDescription(`**${message.author} Görünüşe göre bu sunucuda bu sistem bozulmuş. Sunucu yetkilileriyle iletişime geçerek kayıt sistemini baştan ayarlamaları gerektiğini söyleyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!db.has("otorol" + message.guild.id)) return message.reply(hasar)

    const role = db.fetch("otorol" + message.guild.id)
    const removerole = message.guild.roles.cache.find(r => r.id === role)
    user.roles.remove(removerole)


    const hasar2 = new MessageEmbed()

        .setTitle('Sistem Bozuk')
        .setDescription(`**${message.author} Görünüşe göre bu sunucuda bu sistem bozulmuş. Sunucu yetkilileriyle iletişime geçerek kayıt sistemini baştan ayarlamaları gerektiğini söyleyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!db.has("loginrole" + message.guild.id)) return message.reply(hasar2)

    const rol = db.fetch("loginrole" + message.guild.id)
    const giverole = message.guild.roles.cache.find(r => r.id === rol)
    user.roles.add(giverole)

    user.setNickname(`[${ad}][${yas}]`);
    const embed = new MessageEmbed()
        .setTitle('Kayıt Yapıldı')
        .setDescription(`<:borunew:896355246442434591> | **<@${user.id}> Kaydın yapıldı. ${ad} ${yas} olarak sunucumuza kaydoldun**`)
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

    if (!db.has("autorolelog" + message.guild.id)) return;
    const log_id = db.fetch("autorolelog" + message.guild.id)

    const embed1 = new MessageEmbed()

        .setTitle('Kayıt Yapıldı')
        .setDescription(`<@!${user.id}> üyesinin kaydı başarıyla yapıldı`)
        .setColor(renk)
        .setFooter(slogan)

    const autorolelog = message.guild.channels.cache.get(log_id)

    autorolelog.send(embed1)

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isim-yaş', 'yaş'],
    usage: '!kayıt [isim] [yaş]',
    permLevel: 0
};

exports.help = {
    name: 'kayıt-klasik',
    description: 'etiketlediğin kullanıcının ismini düzenler.'
};
