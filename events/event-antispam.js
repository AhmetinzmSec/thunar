const Discord = require('discord.js'); // Discord.JS Modülü Tanımlandı
const {MessageEmbed} = require('discord.js')
const db = require('quick.db'); // Database Tanımlandı
const database = require('../database');
const ayarlar = require('../config.json');// Prefix Dosyaya Çağrıldı
const userMap = new Map();
const { renk, slogan } = require("../versioninfo.json");

module.exports = async message => {

    if (!message.guild) return;
    const TheSid = db.get(`antispam_${message.guild.id}`)
    if (message.author.bot) return;
    if (TheSid === "acik") {

        if (message.member.permissions.has("MANAGE_MESSAGES") || message.member.permissions.has("ADMINISTRATOR")) return;
        if (userMap.has(message.author.id)) {
            const userdata = userMap.get(message.author.id);
            let msgcount = userdata.msgcount;
            ++msgcount;
            if (parseInt(msgcount) === 5) {
                message.channel.bulkDelete('5')

                const spamyapmamk = new MessageEmbed()
                    .setTitle('Şüpheli Davranış')
                    .setDescription(`<@${message.author.id}>, Bu sunucuda Spam yapmak yasaktır!`)
                    .setColor(renk)
                    .setFooter(slogan)
                message.channel.send(spamyapmamk)

            } else {

                userdata.msgcount = msgcount;
                userMap.set(message.author.id, userdata)

            }

        } else {
            userMap.set(message.author.id, {
                msgcount: 1,
                lastMessage: message,
                timer: null

            });
            setTimeout(() => {
                userMap.delete(message.author.id);
            }, 5000);
        }


    } else return;

}