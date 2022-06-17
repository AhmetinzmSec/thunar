const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
let {prefix} = require("../config.json")
const data = require("quick.db");
const { renk, slogan } = require("../versioninfo.json");

module.exports = async (member) => {

    let guild = member.guild;
    let user = member;

    const chimp = await data.fetch(`banned-tag.${guild.id}`)
    const sayı = await data.fetch(`atıldın.${guild.id}.${user.id}`)
    if (user.user.username.includes(chimp)) {

        if (sayı === null) {
            await data.add(`atıldın.${guild.id}.${user.id}`, 1)
            user.send(new Discord.MessageEmbed()
                .setTitle("Atıldın")
                .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz için atıldınız, tekrar giriş yapmayı denerseniz **yasaklanacaksınız**!`)
                .setColor(renk)
                .setFooter(slogan)
            )
            await user.kick()
        }

        if (sayı === 1) {
            await data.delete(`atıldın.${guild.id}.${user.id}`)
            user.send(new Discord.MessageEmbed()
                .setTitle("Yasaklandın")
                .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz için atılmıştınız, tekrar giriş yapmayı denediğiniz için **${guild.name}** sunucusundan kalıcı olarak **yasaklandınız**!`)
                .setColor(renk)
                .setFooter(slogan)
            )
            await user.ban()
        }
    }

}