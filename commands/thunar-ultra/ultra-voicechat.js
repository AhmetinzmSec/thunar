const Discord = require("discord.js");
const client = new (require("discord.js").Client)
const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch')
const {MessageButton} = require("discord-buttons");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply('Sesli kanala gir')

    const embed = new MessageEmbed()
    fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "880218394199220334",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(invite => {
            const embed = new MessageEmbed()
                .setTitle("Sistem Çalışır Duruma Getirildi")
                .setDescription(`[Buraya](https://discord.gg/${invite.code}) Tıklayarak Menzile Girebilirsiniz`)
                .setColor(renk)
                .setFooter(slogan)
            return message.channel.send(embed);
        })

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ses", "yt", "play", "music", "müzik"],
    permLevel: 0
};

exports.help = {
    name: 'ses',
    description: 'Ses kanalında youtube oyun v.s açmanıza yarar',
    usage: 'ses'
};