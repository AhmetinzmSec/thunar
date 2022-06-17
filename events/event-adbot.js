const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../config.json');
const {sendAPICallback} = require("discord-buttons");
const { renk, slogan } = require("../versioninfo.json");

module.exports = guild => {

    let preffix = db.fetch(`prefix_${guild.id}`);
    let prefixx = preffix ? preffix : ayarlar.prefix

    const emmmmbed = new Discord.MessageEmbed()
        .setTitle("Thunar Botunu Tercih Ettiğiniz İçin Teşekkürler")
        .setThumbnail()
        .addField(`Thunar`, `**Selamlar, Ben Thunar. Öncelikle Beni Eklediğiniz ve Bize Destek Olduğunuz İçin Sizlere Teşekkürlerimi Sunarım. Herhangi bir hata ile karşılaşırsanız gelişitiricime Discord hesabından; <@!801006452416184330> veya ${prefixx}hata yazarak bot üzerinden bildirebilirsiniz.**`)
        .addField(`Thunar Hakkında Ufak Bilgilendirme`, `BÖRÜ'nın sunucunuzda sorunsuz çalışmasını istiyorsanız **Sunucu Ayarları > Roller** kısmından **Thunar** rolünü en üste taşımalısınız. Eğer Thunar rolünü göremiyorsanız botu sunucunuzdan atıp yeniden davet edin ve **Yönetici** yetkisi verdiğinzden emin olun.`)
        .addField(`Thunar Nasıl Kullanılır?`, `**${prefixx}yardım** Yazarak BÖRÜ'nın Yardım Menüsüne Ulaşabilir, Komutlar, Geliştiricim ve Bot Hakkında Detaylı Bilgilere Sahip Olabilirsiniz`)
        .addField(`Thunar'da Hata mı Tespit Ettiniz?`, `**${prefixx}hata** Yazarak Geliştiricime Hatayı Bildirebilirsiniz. (Ör; ${prefixx}hata Bot bu özelliği düzgün çalışmıyor. Lütfen bir an önce düzeltin)`)
        .addField(`Thunar Destek Bağlantıları Nerede?`, `Herhangi Bir Metin Kanalına **${prefixx}yardım** Komutunu Yazıp Sayfalar Arasında Geçiş Yaptığınız Zamana Destek Linklerimize Ulaşabilirsini`)
        .setColor(renk)
        .setFooter(slogan)

    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
        if (channel.type == "text" && defaultChannel == "") {
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        }
    })

    defaultChannel.send(emmmmbed)

}