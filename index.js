const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
const {MessageEmbed} = require('discord.js');
const AsciiTable = require('ascii-table');
const fs = require('fs');
const db = require('quick.db');
const {renk, slogan} = require("./versioninfo.json");
const {methodSpread} = require("lodash/fp/_mapping");
require('./util/eventHandler.js')(client);
require("discord-buttons")(client);
const mongodb = require("mongoose");

mongodb.connect("mongodb+srv://toxygencode:AhmetinzmPicadRoot.1903@cluster0.rdrij.mongodb.net/thunar?retryWrites=true&w=majority")

mongodb.connection.on("open", async () => {

    var commandtable = new AsciiTable('Toxygen Command Table')

    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    commandtable.setHeading("Command", "Status", "Aliases")

    fs.readdirSync('./commands').forEach(dir => {

        const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {

            const commands = require(`./commands/${dir}/${file}`);

            if (commands.help.name) {

                client.commands.set(commands.help.name, commands);
                commandtable.addRow(commands.help.name, "Hazır", commands.conf.aliases)

            } else {

                commandtable.addRow(commands.help.name, `Arıza -> ${file} Komut istemcileri çalıştırılırken hata oluştu`)
                continue;

            }

            commands.conf.aliases.forEach(alias => {

                client.aliases.set(alias, commands.help.name)

            });

        }

    })

    console.log(commandtable.toString())

    client.elevation = message => {
        if (!message.guild) {
            return;
        }
        let permlvl = 0;
        if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
        if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
        if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 5;
        return permlvl;
    };

    client.on('guildCreate', async guild => {

        const sunucu = client.channels.cache.get("925412630057865266")
        const embed = new Discord.MessageEmbed()
            .setTitle("Thunar Yeni Bir Sunucuda Hizmete Başladı")
            .setDescription(`• Artık Thunar **${client.guilds.cache.size.toLocaleString()}** Sunucuda Hizmette`)
            .addField("Sunucu Şefi:", `${guild.owner.user.username}` + '#' + `${guild.owner.user.discriminator}`, true)
            .addField("Sunucu Rumuzu:", `${guild.name}`, true)
            .addField("Sunucu Kimliği:", `${guild.id}`)
            .setFooter(slogan)
            .setColor(renk)
        sunucu.send(embed)

    });

    client.on('guildDelete', async guild => {

        const sunucu = client.channels.cache.get("925412630057865266")
        const embed = new Discord.MessageEmbed()
            .setTitle("Thunar Bir Sunucuda Hizmetini Durdurdu")
            .setDescription(`• Artık Thunar **${client.guilds.cache.size.toLocaleString()}** Sunucuda Hizmette`)
            .addField("Sunucunun Şefi:", `${guild.owner.user.username}` + '#' + `${guild.owner.user.discriminator}`, true)
            .addField("Sunucu Rumuzu:", `${guild.name}`, true)
            .addField("Sunucu Kimliği:", `${guild.id}`)
            .setFooter(slogan)
            .setColor(renk)
        sunucu.send(embed)

    });

    console.log("MongoDB Bağlantısı Sağlandı")

    client.login(token)
});