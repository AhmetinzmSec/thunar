const Discord = require("discord.js");
const db = require("quick.db")
const {prefix} = require("../../config.json");
const {MessageEmbed} = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");
const {MessageButton} = require("discord-buttons");

exports.run = (client, message, args) => {

    const xonayemoji = "✅ Onayla"
    const xiptalemoji = "❎ Reddet"
    const xsilemoji = "🚮 İzni Geri Çek"

    const buttonOnay = new MessageButton()
        .setStyle('green')
        .setLabel(xonayemoji)
        .setID('buttonOnay')

    const buttonSil = new MessageButton()
        .setStyle('blurple')
        .setLabel(xsilemoji)
        .setID('buttonSil')

    const buttonIptal = new MessageButton()
        .setStyle('red')
        .setLabel(xiptalemoji)
        .setID('buttonIptal')

    const embed = new Discord.MessageEmbed()
        .setTitle("Kullanıcı Sözleşmesi")
        .setDescription(`***Thunar;*** \n\n ●   Uyarı sistemi, karaliste ve seviye sistemi için kullanıcı ID'lerini rıhtıma kaydeder \n ●   Log kayıtları göndermek için kanal ID'lerini rıhtıma kaydeder \n ●   Otomatik rol, kayıt rolü, erkek-kadın rolü gibi rolleri hatırlamak için rıhtıma kaydeder \n ●   Şartların onaylandığını veya reddedildiğini anımasak için kullanıcı ID'lerini rıhtıma depolar \n ●   Toplam sunucu sayılarını anımasak için sunucu ID'lerini rıhtıma depolar \n ●   Sunucu güvenliği bilgilerini öğrenmek amacıylar sunucu verileriniz anonim biçimde rıhtımda geçici süreliğine bekletilir. Bu süre maksimum 1.1 saniyedir \n\n\n ***Thunar'dan Bağımsız;*** \n\n ●   Eğer log sistemi aktifse sunucu yöneticileri sildiğiniz ve düzenlediğiniz mesajları görebilir \n ●   Sunucunuzda bulunan çıkartmalar kullanıcılar tarafından indirilebilir \n ●   Kullanıcı profil fotoğrafı herkes tarafıdan istenilebilir \n ●   Kullanıcı profil bilgileri bot aracılığıyla herkes tarafından istenilebilir. Ancak gizlilik ihlali söz konusu değildir. Veriler Discord tarafından herkese açık paylaşılan bilgilerdir \n\n\n ***Kullanıcı Haklarınız;*** \n\n  ●   Kişisel verilerin işlenip işlenmediğini öğrenme hakkı \n ●   Kişisel verilerin işlenmesi hakkında bilgi talep hakkı \n ●   Kişisel verilerin işlenme amacına uygun kullanılıp kullanılmadığını öğrenme hakkı \n ●   Kişisel verilerin 3. parti şirektlerle paylaşılıp paylaşılmadığı, paylaşılması halinde şirket bilgilerini talep etme hakkı \n ●   Kişisel verilerin sözleşmeye aykırı işlenmesi durumunda düzeltilmesini isteme yahut rıhtımdan yok edilmesini isteme hakkı \n ●   Kişisel verilerin **Türkiye Cumhuriyeti Yasalarına** aykırı biçimde kullanılması durumunda zararın giderilmesini talep etme hakkı \n\n *Yukarıdaki haklarınızı kullanmak için **picadrodev@protonmail.com** mail adresine e-posta atmanız yeterli olacaktır*`)
        .setColor(renk)
        .setFooter(slogan)

    let kabulettimi = db.fetch(`kabulettimi_${message.author.id}`);

    if (kabulettimi) {

        message.channel.send(embed, {buttons: [buttonSil]}).then(async function (sent) {
            const filter = (button) => button.clicker.user.id === message.author.id;
            const collector = message.createMenuCollector(filter);
            sent.createButtonCollector(filter).on('collect', async (button) => {
                if (button.id == "buttonOnay") {

                    db.set(`kabulettimi_${message.author.id}`, "kabul etti")

                    const onay = new MessageEmbed()
                        .setTitle("Kullanıcı Sözleşmesi Onaylandı")
                        .setDescription(`Thunar'ın şartları onayladınız. Artık Thunar'ı kullanabilirsiniz. Fikriniz değişirse yeniden bu birimi kullanarak yeniden gözden geçirebilirsiniz`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(onay)
                    button.reply.defer()

                } else if (button.id == "buttonIptal") {

                    const red = new MessageEmbed()
                        .setTitle("Kullanıcı Sözleşmesi Reddedildi")
                        .setDescription(`Thunar'ın şartlarını reddettiniz. Thunar'ı kullanamayacaksınız. Fikriniz değişirse yeniden bu birimi kullanarak yeniden gözden geçirebilirsiniz`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(red)
                    button.reply.defer()

                } else if (button.id == "buttonSil") {

                    db.delete(`kabulettimi_${message.author.id}`, "kabul etti")

                    const red = new MessageEmbed()
                        .setTitle("Kullanıcı Sözleşmesi Silindi")
                        .setDescription(`Thunar hesap izinleri rıhtımdan silindi. Hesabınız izin listesinden güvenle kaldırıldı. Fikriniz değişirse yeniden bu birimi kullanarak yeniden gözden geçirebilirsiniz`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(red)
                    button.reply.defer()
                }
            })
        })
    } else {

        message.channel.send(embed, {buttons: [buttonOnay, buttonIptal]}).then(async function (sent) {

            const filter = (button) => button.clicker.user.id === message.author.id;
            const collector = message.createMenuCollector(filter);
            sent.createButtonCollector(filter).on('collect', async (button) => {
                if (button.id == "buttonOnay") {

                    db.set(`kabulettimi_${message.author.id}`, "kabul etti")

                    const onay = new MessageEmbed()
                        .setTitle("Kullanıcı Sözleşmesi Onaylandı")
                        .setDescription(`Thunar'ın şartları onayladınız. Artık Thunar'ı kullanabilirsiniz. Fikriniz değişirse yeniden bu birimi kullanarak yeniden gözden geçirebilirsiniz`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(onay)
                    button.reply.defer()

                } else if (button.id == "buttonIptal") {

                    const red = new MessageEmbed()
                        .setTitle("Kullanıcı Sözleşmesi Reddedildi")
                        .setDescription(`Thunar'ın şartlarını kabul etmediniz. Thunar'ı kullanamayacaksınız. Fikriniz değişirse yeniden bu birimi kullanarak yeniden gözden geçirebilirsiniz`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(red)
                    button.reply.defer()

                } else if (button.id == "buttonSil") {

                    db.delete(`kabulettimi_${message.author.id}`, "kabul etti")

                    const red = new MessageEmbed()
                        .setTitle("Kullanıcı Sözleşmesi Silindi")
                        .setDescription(`Thunar hesapları izinleri rıhtımdan silindi. Hesabınız izin listesinden güvenle kaldırıldı. Fikriniz değişirse yeniden bu birimi kullanarak yeniden gözden geçirebilirsiniz`)
                        .setColor(renk)
                        .setFooter(slogan)
                    message.channel.send(red)
                    button.reply.defer()
                }
            })
        })

    }

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    permLevel: 0,
    kategori: "bot",
    aliases: []
};

exports.help = {
    name: "şartlar",
    description: "Şartları görüntülersiniz. C:",
    usage: "şartlar"
};