const Discord = require("discord.js");
const hastebin = require('hastebin-gen');
const {MessageButton} = require('discord-buttons');
const {renk, slogan} = require("../../versioninfo.json");
const {MessageEmbed} = require("discord.js");
exports.run = (bot, message) => {

    const randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });
    const clean = text => {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    const args = message.content.split(" ").slice(1);
    const args2 = message.content.split(' ').slice(1).join(' ');

    try {

        if (!args2) {

            const codeempty = new MessageEmbed()
                .setTitle("Boş Komut Tespiti")
                .setDescription("Eval çıktısı verebilmem için kod girmelisiniz")
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(codeempty);
            return;
        }


        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        if (clean(evaled).length > 1024 || code.length > 1024) {
            hastebin(`Evaled: ${code}\n\nÇıktı: \n\n${clean(evaled)}`, "js").then(r => {
                var embed3 = new Discord.MessageEmbed()

                const oopss = new MessageEmbed()
                    .setTitle("Çıktı Çok Uzun")
                    .setDescription("Yazdığınız kodun çıktısı çok uzun olduğundan gösteremiyorum. Ancak merak etmeyin! Çıktıyı sizin için hastebine yükleyerek bir link hazırladım. Tıklayarak çıktıya ulaşabilirsiniz")
                    .setColor(renk)
                    .setFooter(slogan)
                const button = new MessageButton()
                    .setLabel('Çıktı')
                    .setStyle('url')
                    .setURL(r);

                return message.channel.send({embed: oopss, component: button});
            })
        } else {
            var embed2 = new Discord.MessageEmbed()
                .setTitle("Okuma - Çıktı Başarılı")
                .setColor(renk)
                .setFooter(slogan)
                .setDescription(`Okunan Kod \n \`\`\`js\n${args.join(" ")}\n\`\`\` \n\n Çıktı \n \`\`\`js\n${clean(evaled)}\`\`\``)
            message.channel.send({embed: embed2});
        }
    } catch (err) {
        const code = args.join(" ");
        if (clean(err).length > 1024 || code.length > 1024) {
            hastebin(`Evaled: ${code}\n\nError: \n\n${clean(err)}`, "js").then(r => {
                var embed3 = new Discord.MessageEmbed()
                    .setTitle("Arıza Tespiti")
                    .setDescription("Sanırım yazdığınız kodda hata tespit edildi. Kodunuzu gözden geçirerek yeniden deneyiniz")
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send({embed: embed3})
            })
        }
        var embed3 = new Discord.MessageEmbed()
            .setTitle("Arıza Tespiti")
            .setColor(renk)
            .setFooter(slogan)
            .setDescription(`\`\`\`xl\n${clean(err)}\n\`\`\``)
        message.channel.send({embed: embed3});
    }
}
exports.conf = {
    aliases: []
}
exports.help = {
    name: "eval",
    description: "discordJS eval komutu",
    usage: "<prefix>eval <code>",
}