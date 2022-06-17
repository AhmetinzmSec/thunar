const Discord = require("discord.js");
const {MessageButton} = require('discord-buttons');
const db = require("quick.db");
const {renk, slogan} = require("../../versioninfo.json");
const {MessageEmbed} = require("discord.js");

exports.run = (client, message, args) => {
    const erkekrol = db.fetch("erkek" + message.guild.id) //erkek rolünün id sini "" arasına giriniz
    const kadınrol = db.fetch("kadin" + message.guild.id) //kadın rolünün id sini "" arasına giriniz
    const istemsiz = db.fetch("istemsiz" + message.guild.id)
    const partner = db.fetch("partner" + message.guild.id)//kayıtsız rolünü girin
    const kayitsizrol = db.fetch("otorol" + message.guild.id) //kayıtsız rolünü girin
    const xerkekemoji = "👨"
    const xistemsizemoji = "⁉"
    const xpartner = "934888927955914802"
    const xkızemoji = "👩"
    const xiptalemoji = "❎"
    const xonayemoji = "✅"

    const hasar1 = new MessageEmbed()

        .setTitle('Sistem Bozuk')
        .setDescription(`**${message.author} Görünüşe göre bu sunucuda bu sistem bozulmuş. Sunucunun \`\`erkek\`\` rolünü bulamıyorum. Sunucu yetkilileriyle iletişime geçerek kayıt sistemini baştan ayarlamaları gerektiğini söyleyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!db.has("erkek" + message.guild.id)) return message.reply(hasar1)

    const hasar2 = new MessageEmbed()

        .setTitle('Sistem Bozuk')
        .setDescription(`**${message.author} Görünüşe göre bu sunucuda bu sistem bozulmuş. Sunucunun \`\`kadın\`\` rolünü bulamıyorum. Sunucu yetkilileriyle iletişime geçerek kayıt sistemini baştan ayarlamaları gerektiğini söyleyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!db.has("kadin" + message.guild.id)) return message.reply(hasar2)

    const hasar3 = new MessageEmbed()

        .setTitle('Sistem Bozuk')
        .setDescription(`**${message.author} Görünüşe göre bu sunucuda bu sistem bozulmuş. Sunucunun \`\`istemsiz\`\` rolünü bulamıyorum. Sunucu yetkilileriyle iletişime geçerek kayıt sistemini baştan ayarlamaları gerektiğini söyleyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!db.has("istemsiz" + message.guild.id)) return message.reply(hasar3)

    const hasar4 = new MessageEmbed()

        .setTitle('Sistem Bozuk')
        .setDescription(`**${message.author} Görünüşe göre bu sunucuda bu sistem bozulmuş. Sunucunun \`\`otomatik\`\` rolünü bulamıyorum. Sunucu yetkilileriyle iletişime geçerek kayıt sistemini baştan ayarlamaları gerektiğini söyleyebilirsin**`)
        .setColor(renk)
        .setFooter(slogan)

    if (!db.has("otorol" + message.guild.id)) return message.reply(hasar4)

    let uye = message.author ? message.guild.member(message.author) : null
    if (!uye) return message.channel.send("Bir kullanıcı girin.")
    const isim = args[0];
    const yas = args[1];
    if (!isim) return message.channel.send("İsim ve yaş yazman gerekli. Örnek kullanım; `!kayıt Ahmet 18`")

    // Yaş Ayarlamaları
    if (!yas) return message.channel.send("İsim ve yaş yazman gerekli. Örnek kullanım; `!kayıt Ahmet 18`")
    if (yas < 2 || yas > 100) return message.reply('Minimum yaş değeri 2 maksimum yaş değeri 100 olmalıdır');
    if (isNaN(yas)) return message.reply('Yaş Sayısal Bir Değer İçermelidir');

    const buttonErkek = new MessageButton()
        .setStyle('blurple')
        .setLabel(xerkekemoji)
        .setID('buttonErkek')

    const buttonKadın = new MessageButton()
        .setStyle('blurple')
        .setLabel(xkızemoji)
        .setID('buttonKadın')

    const buttonistemsiz = new MessageButton()
        .setStyle('blurple')
        .setLabel(xistemsizemoji)
        .setID('buttonistemsiz')

    const buttonPartner = new MessageButton()
        .setStyle('gray')
        .setEmoji(xpartner)
        .setID('buttonPartner')

    const buttoniptal = new MessageButton()
        .setStyle('red')
        .setLabel(xiptalemoji)
        .setID('buttoniptal')

    const login = new MessageEmbed()
        .setTitle("Kayıt Rolünü Seçiniz")
        .setDescription(`Sunucuya **[${isim}][${yas}]** şeklinde kayıt olacaksınız\n\n Lütfen aşağıdan rol seçiniz \n ${xerkekemoji} -> Erkek \n ${xkızemoji} -> Kadın \n ${xistemsizemoji} -> Cinsiyet Belirtmek İstemiyorum \n <:partner:934888927955914802> -> Partner Kanalını Görüntüle (İsteğe Bağlı) \n ${xiptalemoji} -> Kayıt İptal`)
        .setColor(renk)
        .setFooter(slogan)

    if (db.has("partner" + message.guild.id)) {
        message.channel.send(login, {buttons: [buttonErkek, buttonKadın, buttonistemsiz, buttonPartner, buttoniptal]}).then(async function (sent) {
            sent.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
                if (button.id == "buttonErkek") {
                    uye.setNickname(`[${isim}][${yas}]`)

                    uye.roles.add(erkekrol).catch()
                    uye.roles.remove(kayitsizrol).catch()
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Kayıt Başarılı")
                        .setDescription(`Üye erkek olarak kaydedildi`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(embed)
                    await message.react(xonayemoji)
                    button.reply.defer()

                    if (!db.has("autorolelog" + message.guild.id)) return;
                    const log_id = db.fetch("autorolelog" + message.guild.id)

                    const embed1 = new MessageEmbed()

                        .setTitle('Kayıt Yapıldı')
                        .setDescription(`<@!${uye.id}> üyesinin kaydı başarıyla yapıldı`)
                        .setColor(renk)
                        .setFooter(slogan)

                    const autorolelog = message.guild.channels.cache.get(log_id)

                    autorolelog.send(embed1)

                } else if (button.id == "buttonKadın") {
                    uye.setNickname(`[${isim}][${yas}]`)

                    uye.roles.add(kadınrol)
                    uye.roles.remove(kayitsizrol).catch()
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Kayıt Başarılı")
                        .setDescription(`Üye kadın olarak kaydedildi`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(embed)
                    await message.react(xonayemoji)
                    button.reply.defer()

                    if (!db.has("autorolelog" + message.guild.id)) return;
                    const log_id = db.fetch("autorolelog" + message.guild.id)

                    const embed1 = new MessageEmbed()

                        .setTitle('Kayıt Yapıldı')
                        .setDescription(`<@!${uye.id}> üyesinin kaydı başarıyla yapıldı`)
                        .setColor(renk)
                        .setFooter(slogan)

                    const autorolelog = message.guild.channels.cache.get(log_id)

                    autorolelog.send(embed1)

                } else if (button.id == "buttonistemsiz") {
                    uye.setNickname(`[${isim}][${yas}]`)

                    uye.roles.add(istemsiz)
                    uye.roles.remove(kayitsizrol).catch()
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Kayıt Başarılı")
                        .setDescription(`Üye cinsiyetini belirtmek istemedi`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(embed)
                    await message.react(xistemsizemoji)
                    button.reply.defer()

                    if (!db.has("autorolelog" + message.guild.id)) return;
                    const log_id = db.fetch("autorolelog" + message.guild.id)

                    const embed1 = new MessageEmbed()

                        .setTitle('Kayıt Yapıldı')
                        .setDescription(`<@!${uye.id}> üyesinin kaydı başarıyla yapıldı`)
                        .setColor(renk)
                        .setFooter(slogan)

                    const autorolelog = message.guild.channels.cache.get(log_id)

                    autorolelog.send(embed1)

                } else if (button.id == "buttonPartner") {

                    uye.roles.add(partner)
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Kayıt Başarılı")
                        .setDescription(`Üye partner kanalını görüntülemeyi seçti`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(embed)
                    await message.react(xpartner)
                    button.reply.defer()

                    if (!db.has("autorolelog" + message.guild.id)) return;
                    const log_id = db.fetch("autorolelog" + message.guild.id)

                    const embed1 = new MessageEmbed()

                        .setTitle('Partner Kanalı Görüntüleme')
                        .setDescription(`<@!${uye.id}> üyesi partner kanalını görütülemeyi seçti`)
                        .setColor(renk)
                        .setFooter(slogan)

                    const autorolelog = message.guild.channels.cache.get(log_id)

                    autorolelog.send(embed1)

                } else if (button.id == "buttoniptal") {
                    button.reply.defer()
                    sent.delete()
                }
            })
        })
    }

    if (!db.has("partner" + message.guild.id)) {
        message.channel.send(login, {buttons: [buttonErkek, buttonKadın, buttonistemsiz, buttoniptal]}).then(async function (sent) {
            sent.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
                if (button.id == "buttonErkek") {
                    uye.setNickname(`[${isim}][${yas}]`)

                    uye.roles.add(erkekrol).catch()
                    uye.roles.remove(kayitsizrol).catch()
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Kayıt Başarılı")
                        .setDescription(`Üye erkek olarak kaydedildi`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(embed)
                    await message.react(xonayemoji)
                    button.reply.defer()

                    if (!db.has("autorolelog" + message.guild.id)) return;
                    const log_id = db.fetch("autorolelog" + message.guild.id)

                    const embed1 = new MessageEmbed()

                        .setTitle('Kayıt Yapıldı')
                        .setDescription(`<@!${uye.id}> üyesinin kaydı başarıyla yapıldı`)
                        .setColor(renk)
                        .setFooter(slogan)

                    const autorolelog = message.guild.channels.cache.get(log_id)

                    autorolelog.send(embed1)

                } else if (button.id == "buttonKadın") {
                    uye.setNickname(`[${isim}][${yas}]`)

                    uye.roles.add(kadınrol)
                    uye.roles.remove(kayitsizrol).catch()
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Kayıt Başarılı")
                        .setDescription(`Üye kadın olarak kaydedildi`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(embed)
                    await message.react(xonayemoji)
                    button.reply.defer()

                    if (!db.has("autorolelog" + message.guild.id)) return;
                    const log_id = db.fetch("autorolelog" + message.guild.id)

                    const embed1 = new MessageEmbed()

                        .setTitle('Kayıt Yapıldı')
                        .setDescription(`<@!${uye.id}> üyesinin kaydı başarıyla yapıldı`)
                        .setColor(renk)
                        .setFooter(slogan)

                    const autorolelog = message.guild.channels.cache.get(log_id)

                    autorolelog.send(embed1)

                } else if (button.id == "buttonistemsiz") {
                    uye.setNickname(`[${isim}][${yas}]`)

                    uye.roles.add(istemsiz)
                    uye.roles.remove(kayitsizrol).catch()
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Kayıt Başarılı")
                        .setDescription(`Üye cinsiyetini belirtmek istemedi`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(embed)
                    await message.react(xistemsizemoji)
                    button.reply.defer()

                    if (!db.has("autorolelog" + message.guild.id)) return;
                    const log_id = db.fetch("autorolelog" + message.guild.id)

                    const embed1 = new MessageEmbed()

                        .setTitle('Kayıt Yapıldı')
                        .setDescription(`<@!${uye.id}> üyesinin kaydı başarıyla yapıldı`)
                        .setColor(renk)
                        .setFooter(slogan)

                    const autorolelog = message.guild.channels.cache.get(log_id)

                    autorolelog.send(embed1)

                } else if (button.id == "buttoniptal") {
                    button.reply.defer()
                    sent.delete()
                }
            })
        })
    }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kayıt-e-k"],
    permLevel: 0
};
exports.help = {
    name: "kayıt",
    description: "",
    usage: "kayıt <etiket> <isim> <yaş>"
}