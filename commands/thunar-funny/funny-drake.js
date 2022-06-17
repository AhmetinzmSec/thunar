const { MessageAttachment } = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {


    let yazı = args.slice(0).join(" ");
    if (!yazı) return message.channel.send(`Bir şeyler yazmalısın!`);
    if (!yazı.includes(","))
        return message.channel.send(
            `Lütfen mesajını \`,\` ile ayırt! Örnek: $drake "üst yazı", "alt yazı"`
        );
    let s = yazı.split(",");
    let link = `https://api.devs-hub.xyz/drake?top=${s[0]}&bottom=${s[1]}`;
    let encode = encodeURI(link);

    message.channel.send(new MessageAttachment(encode, `drake.png`));

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    usage: '$drake [metin1], [metin2]',
    aliases: ['drake-foto'],
}

exports.help = {
    name: 'drake',
};