const Discord = require("discord.js");
const db = require('quick.db');
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    /* var Member = message.author ? message.guild.member(message.author) : null;

    if (Member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Yetkili** Bir Kullanıcıya Onay Veremem') */

    const answer = args.join(" ")
    const verifydata = new db.table('verifydata')
    var user = message.author ? message.guild.member(message.author) : null;

    const basarili = new Discord.MessageEmbed()
        .setTitle('Kod Tespit Edilemedi')
        .setDescription('Kod kısmı boş bırakılamaz')
        .setColor(renk)
        .setFooter(slogan)
    if (!answer) return message.channel.send(basarili)

    if (answer == verifydata.get(`${message.author.id}`)) {

        //Buraya botun ne yapacağını girin!!!!!!!!!!

        const bozuk = new Discord.MessageEmbed()
            .setTitle('Sistem Kullanılamıyor')
            .setDescription(`**${message.author} Bu sunucuda bu sistem aktif değildir. Doğrulama rolü bozulmuş olabilir. Eğer sunucuda sohbete başlamak için onaylama yapman isteniyorsa sunucu sahibiyle iletişime geçerek sistemi aktif etmesini isteyebilirsin**`)
            .setColor(renk)
            .setFooter(slogan)
        if (!db.has("verifyrole" + message.guild.id)) return message.channel.send(bozuk);

        const rol = db.fetch("verifyrole" + message.guild.id)
        const giverole = message.guild.roles.cache.find(r => r.id === rol)
        user.roles.add(giverole)

        const basarili = new Discord.MessageEmbed()
            .setTitle('Doğrulama Başarılı')
            .setDescription('Doğrulama İşlemi Başarılı')
            .addField("Doğrulama Yapılan Üye", user, true)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(basarili).then(i => i.react("<:member_verified:877541571187322910>"))

        /*<a:verifiedanim:929635552582598667>*/

    } else {

        const err = new Discord.MessageEmbed()
            .setTitle('Hatalı Bilgi')
            .setDescription('Girilen kod hatalı. Lütfen tekrar deneyiniz')
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(err)
    }

}


exports.conf = {
    aliases: ['onayla', 'confirm', 'doğrula'],
    permLevel: 0,
    usage: '!onay [!doğrula komutu ile aldığınız kod]',
    kategori: "Eğlence",
};

exports.help = {
    name: 'onay',
    description: 'Kod girmenizi sağlar.',
    usage: 'enter <kod>',
};
