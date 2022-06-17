const Discord = require("discord.js");
const { renk, slogan } = require("../versioninfo.json");

module.exports = async (message) => {
    if (message.author.bot || !message.content) return;
    require('quick.db').push(message.guild.id, {
        author: message.author,
        authorTAG: message.author.tag,
        authorID: message.author.id,
        authorUSERNAME: message.author.username,
        authorDISCRIMINATOR: message.author.discriminator,
        messageID: message.id,
        messageCHANNEL: message.channel,
        messageCHANNELID: message.channel.id,
        messageCONTENT: message.content,
        messageCREATEDAT: message.createdAt
    });
}