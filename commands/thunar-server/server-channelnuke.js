const Discord = require("discord.js")
const {MessageEmbed} = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const izinyok = new MessageEmbed()
        .setTitle('Yetki Reddedildi')
        .setDescription('**Bu birimi kullanmak için `KANLLARI_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(izinyok);

    const onayembed = new Discord.MessageEmbed()
        .setColor(renk)
        .setFooter(slogan)
        .setFooter("Onaylamak için 👍 emojisine, Red etmek içinse 👎 emojisine tıklayabilirsiniz")
        .setDescription("**UYARI!** \n\nEğer nuke işlemini onaylarsanız bu kanalın içeriği (mesajlar, resimler vb.) kalıcı olarak **silinecek**, **geri getirilemeyecektir!**")
    message.channel.send(onayembed).then(msg => {
        msg.react('👍').then(() => msg.react('👎'));

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        msg.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    message.channel.clone({position: message.channel.position});
                    message.channel.delete();
                } else {
                    message.reply('Nuke işlemi iptal edildi!');
                    msg.delete({timeout: 3000})
                }
            })
            .catch(collected => {
                message.reply('Hmm... Ters giden bir şeyler var. Lütfen daha sonra tekrar deneyiniz.');
            });

    })

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['chnuke'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'nuke',
    description: 'Acaba Kazanabilecek Misin?',
    usage: 'piyango'
};