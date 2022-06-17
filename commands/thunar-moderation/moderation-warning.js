const Discord = require('discord.js')
const data = require('quick.db')
const {MessageEmbed} = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    let prefix = ''// botun prefixi

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription(`${message.author} Bu birimi sadece geliştiricim kullanabilir`)
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(izinyok)

    const aksikarguman = new MessageEmbed()
        .setTitle("İşlem Gerçekleştirilemedi")
        .setDescription("Sistemi kullanmak için birimi yazdıktan hemen sonra, ekle/sil/bilgi komutlarını kullanın. \n\n (Örnek Kullanım; !uyarı ekle/sil/bilgi)")
        .setColor(renk)
        .setFooter(slogan)
    if (!args[0]) return message.channel.send(aksikarguman)


    if (args[0] === 'ekle') {
        let userr = message.mentions.users.first()

        const usernerde = new MessageEmbed()
            .setTitle("İşlem Gerçekleştirilemedi")
            .setDescription("Bir kişiyi etiketlemelisin")
            .setColor(renk)
            .setFooter(slogan)
        if (!args[1]) return message.channel.send(usernerde)

        const sunucudayok = new MessageEmbed()
            .setTitle("Eşleşme Bulunamadı")
            .setDescription(`${args[1]}, Kullanıcısını sunucuda bulamıyorum`)
            .setColor(renk)
            .setFooter(slogan)
        if (!userr) return message.channel.send(sunucudayok)

        const botunsananeyidokunduaq = new MessageEmbed()
            .setTitle("Bot Tespiti")
            .setDescription(`Botları uyaramam.`)
            .setColor(renk)
            .setFooter(slogan)
        if (userr.bot) return message.channel.send(botunsananeyidokunduaq)

        const kendininiyeekliyonaq = new MessageEmbed()
            .setTitle("Yazar Eklenemez")
            .setDescription(`Kendini uyarı listesine ekleyemezsin`)
            .setColor(renk)
            .setFooter(slogan)
        if (userr.id === message.author.id) return message.channel.send(kendininiyeekliyonaq)

        let reason = args.slice(2).join(' ')

        data.add(`uyarı.${message.guild.id}.${userr.id}`, +1)
        const number = await data.fetch(`uyarı.${message.guild.id}.${userr.id}`)

        if (!reason) {

            const eklendi = new MessageEmbed()
                .setTitle("Rıhtım Verileri Güncellendi")
                .setDescription(`${userr} üyesi uyarıldı! \n\n Kullanıcının toplam uyarı adeti **${number}** sayısına yükseldi`)
                .setColor(renk)
                .setFooter(slogan)
            await message.channel.send(eklendi)

            try {
                await userr.send(`${userr}, merhaba! ${message.guild.name} sunucusunda sebepsiz bir şekilde uyarıldın. Dikkatli ol!`)
            } catch (e) {

                const yapamadikabi = new MessageEmbed()
                    .setTitle("Mesaj Gönderimi Başarısız")
                    .setDescription("Kullanıcıya özelden mesaj gönderilemiyor ancak uyarı başarıyla verildi")
                    .setColor(renk)
                    .setFooter(slogan)

                return message.channel.send(yapamadikabi)
            }
            return
        }

        if (reason) {

            const eklendisebepli = new MessageEmbed()
                .setTitle("Rıhtım Verileri Güncellendi")
                .setDescription(`${userr} üyesi uyarıldı! \n\n Kullanıcının toplam uyarı adeti **${number}** sayısına yükseldi`)
                .setColor(renk)
                .setFooter(slogan)
            await message.channel.send(eklendisebepli)

            try {

                await userr.send(`${userr}, merhaba! ${message.guild.name} sunucusunda ${reason} sebebiyle uyarıldın. Dikkatli ol!`)

            } catch (e) {

                const neyiyapamdinamk = new MessageEmbed()
                    .setTitle("Mesaj Gönderimi Başarısız")
                    .setDescription("Kullanıcıya özelden mesaj gönderilemiyor ancak uyarı başarıyla verildi")
                    .setColor(renk)
                    .setFooter(slogan)

                return message.channel.send(neyiyapamdinamk)

            }

            return
        }
    }

    if (args[0] === 'sil') {
        let userr = message.mentions.users.first()

        const usernerde = new MessageEmbed()
            .setTitle("İşlem Gerçekleştirilemedi")
            .setDescription("Bir kişiyi etiketlemelisin")
            .setColor(renk)
            .setFooter(slogan)
        if (!args[1]) return message.channel.send(usernerde)

        const sunucudayok = new MessageEmbed()
            .setTitle("Eşleşme Bulunamadı")
            .setDescription(`${args[1]}, Kullanıcısını sunucuda bulamıyorum`)
            .setColor(renk)
            .setFooter(slogan)
        if (!userr) return message.channel.send(sunucudayok)

        const botunsananeyidokunduaq = new MessageEmbed()
            .setTitle("Bot Tespiti")
            .setDescription(`Botları uyarılamadığı için herhangi bir silme gerçekleştirilemez`)
            .setColor(renk)
            .setFooter(slogan)
        if (userr.bot) return message.channel.send(botunsananeyidokunduaq)

        const kendininiyeekliyonaq = new MessageEmbed()
            .setTitle("Yazar Eklenemez")
            .setDescription(`Kendini uyarı listesinden silemezsin`)
            .setColor(renk)
            .setFooter(slogan)
        if (userr.id === message.author.id) return message.channel.send(kendininiyeekliyonaq)

        let sayı = args[2]

        const sayibelirtilmedi = new MessageEmbed()
            .setTitle("Adet Tespiti Başarısız")
            .setDescription(`Silinecek uyarı sayısı belirtilmemiş`)
            .setColor(renk)
            .setFooter(slogan)
        if (!sayı) return message.channel.send(sayibelirtilmedi)

        const alibicim = new MessageEmbed()
            .setTitle("Yanlış Argüman Biçimi")
            .setDescription(`Silinecek uyarı sayısı sadece sayısal değer içermelidir`)
            .setColor(renk)
            .setFooter(slogan)
        if (isNaN(sayı)) return message.channel.send(alibicim)

        const tehditke = new MessageEmbed()
            .setTitle("Amaç Dışı Kullanım")
            .setDescription(`Thunar birimlerini amacı dışı kullanmamanızı rica ediyoruz...`)
            .setColor(renk)
            .setFooter(slogan)
        if (sayı === '0') return message.channel.send(tehditke)

        const number2 = await data.fetch(`uyarı.${message.guild.id}.${userr.id}`)

        const buyukla = new MessageEmbed()
            .setTitle("Girilen Değer Çok Büyük")
            .setDescription(`${userr}, Kullanıcısının uyarı sayısı: ${number2}. Girdiğiniz değer bu değeri aşmamalıdır`)
            .setColor(renk)
            .setFooter(slogan)
        if (number2 < sayı) return message.channel.send(buyukla)

        data.add(`uyarı.${message.guild.id}.${userr.id}`, -sayı)
        const number = await data.fetch(`uyarı.${message.guild.id}.${userr.id}`)

        const silindi = new MessageEmbed()
            .setTitle("Rıhtım Verileri Güncellendi")
            .setDescription(`${userr} üyesinin uyarısı silindi!\nToplam uyarı sayısı: ${number ? number : '0'}`)
            .setColor(renk)
            .setFooter(slogan)
        await message.channel.send(silindi)

        try {

            await userr.send(`${userr}, merhaba! ${message.guild.name} sunucusunda uyarın silindi. Daha dikkatli ol!`)

        } catch (e) {

            const olmadike = new MessageEmbed()
                .setTitle("Mesaj Gönderimi Başarısız")
                .setDescription(`${userr}, kullanıcısına özelden mesaj gönderilemiyor ancak rıhtımdan veriler silindi`)
                .setColor(renk)
                .setFooter(slogan)
            await message.channel.send(olmadike)

        }
    }

    if (args[0] === 'bilgi') {
        let userr = message.mentions.users.first()

        const usernerde = new MessageEmbed()
            .setTitle("İşlem Gerçekleştirilemedi")
            .setDescription("Bir kişiyi etiketlemelisin")
            .setColor(renk)
            .setFooter(slogan)
        if (!args[1]) return message.channel.send(usernerde)

        const sunucudayok = new MessageEmbed()
            .setTitle("Eşleşme Bulunamadı")
            .setDescription(`${args[1]}, Kullanıcısını sunucuda bulamıyorum`)
            .setColor(renk)
            .setFooter(slogan)
        if (!userr) return message.channel.send(sunucudayok)

        const number2 = await data.fetch(`uyarı.${message.guild.id}.${userr.id}`)

        const temiz = new MessageEmbed()
            .setTitle("Temiz Sicil")
            .setDescription(`${userr}, Kullanıcısının hiç uyarısı yok`)
            .setColor(renk)
            .setFooter(slogan)
        if (!number2) return message.channel.send(temiz)

        const yanmissin = new MessageEmbed()
            .setTitle("Veriler Getirildi")
            .setDescription(`Rıhtımdan veriler getirildi \n\n ${userr}:\nToplam uyarı sayısı: ${number2 ? number2 : '0'}`)
            .setColor(renk)
            .setFooter(slogan)
        await message.channel.send(yanmissin)
    }
}
;

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['warn'],
    permLevel: 0,
}

exports.help = {
    name: 'uyarı'
}