const Discord = require("discord.js");
const {MessageButton} = require('discord-buttons');
const db = require("quick.db");
const { renk, slogan } = require("../../versioninfo.json");
const {MessageEmbed} = require("discord.js");

exports.run = (client, message, args) => {
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    if (!role) return message.reply('Lütfen Vermek İstediğiniz Rolü Etiketleyin!')
    if (!member) return message.reply('Lütfen Rol Vermek İstediğiniz Kişiyi Etiketleyin!')

    const xiptalemoji = "❎ Rol Al"
    const xonayemoji = "✅ Rol Ver"

    const buttonOnay = new MessageButton()
        .setStyle('green')
        .setLabel(xonayemoji)
        .setID('buttonOnay')

    const buttonIptal = new MessageButton()
        .setStyle('red')
        .setLabel(xiptalemoji)
        .setID('buttonIptal')

    const embed = new MessageEmbed()
        .setTitle("Rol Verme İsteği")
        .setDescription(`${member} üyesine ${role} rolü ile hangi moderasyon uygulansın?`)
        .setColor(renk)
        .setFooter(slogan)

    message.channel.send(embed, {buttons: [buttonOnay, buttonIptal]}).then(async function (sent) {
        sent.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
            if (button.id == "buttonOnay") {

                member.roles.add(role).catch()
                const embed = new Discord.MessageEmbed()
                    .setTitle("Kullanıcı Güncellendi")
                    .setDescription(`${member} üyesine ${role} rolü verildi`)
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send(embed)
                await message.react("✅")
                button.reply.defer()

            } else if (button.id == "buttonIptal") {

                member.roles.remove(role).catch()
                const embed = new Discord.MessageEmbed()
                    .setTitle("Kullanıcı Güncellendi")
                    .setDescription(`${member} üyesinden ${role} rolü alındı`)
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send(embed)
                await message.react("✅")
                button.reply.defer()

            }
        })
    })

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["rol-mod"],
    permLevel: 0
};
exports.help = {
    name: "rolmod",
    description: "",
    usage: "kayıt <etiket> <isim> <yaş>"
}