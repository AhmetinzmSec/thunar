const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

// * Command
exports.run = (client, message, args) => {
    // ? kullanımı ==> <prefix>poll başlık / şık1, şık2, şık3, şık4, şık5 .... şık10
    // ! başlıktan sonra / koyun ardından şıkları virgül ile ayırarak yazın. max 10 şık koyabilirsiniz.
    // ! örnek kullanım: !poll Gaziantep FK vs Beşiktaş / Gaziantep FK, Berabere, Beşiktaş

    const laura = (abcdef) => {
        message.channel.send(new discord.MessageEmbed()
            .setTitle('Hay Aksi! Bir Sorun Oluştu...')
            .setDescription(abcdef)
            .setColor(renk)
            .setFooter(slogan)
        )
    };

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `MESAJLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(yetkinyok)
    try {
        const rifleman = args.join(' ').split('/')
        const youthanasia = rifleman[0].trim();
        if (!youthanasia) return laura('Komutu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`!oylama [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
        const lauraa = rifleman[1].trim().split(',');
        const lauraaa = lauraa.length;
        if (lauraaa > 10) return laura('Maksimum 10 adet şık koyabilirsiniz.');
        if (lauraa.includes(' ')) return laura('Boş bir şık koyamazsınız.')

        const pollEmbed = new Discord.MessageEmbed()
            .setTitle('Lütfen bekleyiniz ayarlamalar yapılıyor..')
            .setColor(renk)
            .setFooter(slogan)
        const emojies = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        message.channel.send(pollEmbed).then(async pollMsg => {
            for (let lauraaaa = 0; lauraaaa < lauraaa; lauraaaa++) {
                pollMsg.react(emojies[lauraaaa]);
                pollEmbed.addField(`${emojies[lauraaaa]} ${lauraa[lauraaaa].trim()}`, `\u200B`, true);
            }
            ;

            await pollMsg.edit(pollEmbed.setTitle(youthanasia).setFooter('Seçeneğin emojisine tıklayarak oylamaya katılabilirsiniz.'));
        });
    } catch (err) {
        laura('Komutu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`!poll [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
    }
};

// * Command Config
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['çoklu-oylama', 'çoylama', 'poll'],
    usage: '!oylama [konu başlığı] / [şık1], [şık2], ... , [şık10]',
    permLevel: 0
};

exports.help = {
    name: "oylama"
};