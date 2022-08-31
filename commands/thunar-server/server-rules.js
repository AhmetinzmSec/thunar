const Discord = require('discord.js');
const {renk, slogan} = require("../../versioninfo.json")
const {MessageEmbed} = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, arsg) => {

    if (message.author.id !== "801006452416184330") return;
    message.channel.send("@everyone")
    const embed = new MessageEmbed()
        .setTitle('Planlı Rötar')
        .setDescription("Selam millet! \n Ben Thunar. sizlere planlı rötar duyurusunu vermeye geldim. Aynı zamanda bu planlı rötar benim, yani Thunar'ın Discord.JS v12 ile son günü olacak. \n\n Kapatılıyor muyum? Hayır! Sadece altyapı yükseltmesi ile karşınızda olacağım. Ancak yeni altyapımda maalesef şu anda olduğundan çok daha az komut bulunuyor. Ama eminimki geliştiricim beni dahada iyi hale getirmek için her şeyi yapacaktır. \n\n Bir veda konuşması gibi girdim. Aslında öyle de sayılır. Thunar'ın şu an ki altyapısı, yapay zekâ donatıldı. Yani ben öğrenen bir botum. Altyapı değişikliği ile sizleri tamamen unutacağım. Yeni alt yapımdaki Thunar, umarım sizi mutlu edebilir. \n\n >>> Thunar **28 Kasım 2022 - 31 Aralık 2022** Tarihleri Arasında Altyapı Yeniliği Nedeniyle Kullanım Dışı Kalacaktır")
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(embed)

};

exports.conf = {
    aliases: ['kur'],
    permLevel: 0,
    usage: 'Sadece komutun ismini yazmanız yeterli',
    kategori: "Eğlence",
};

exports.help = {
    name: 'kural',
    description: 'Sunucuya girenlere isteğe bağlı Captcha yaptırır.',
    usage: 'ping',
    cooldowns: 5
};