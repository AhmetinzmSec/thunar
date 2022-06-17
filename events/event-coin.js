const Discord = require('discord.js'); // Discord.JS Modülü Tanımlandı
const {MessageEmbed} = require('discord.js')
const db = require('quick.db'); // Database Tanımlandı
const database = require('../database');
const ayarlar = require('../config.json'); // Prefix Dosyaya Çağrıldı
const { renk, slogan } = require("../versioninfo.json");

module.exports = async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    const ayarfetch = db.fetch(`coinsistem_${message.guild.id}`)
    if (ayarfetch == true) {
        if (message.content.length > 20) {
            db.add(`coin_${message.author.id}_${message.guild.id}`, 2)
        }
        const fetch = db.fetch(`coin_${message.author.id}_${message.guild.id}`)
        const objfetch = db.fetch(`objcoin_${message.guild.id}`)
        if (objfetch !== null) {
            var res = objfetch.filter(obj => {
                return fetch >= obj.kacCoinLazim
            })
            if (res.length > 0) {
                try {
                    for (let index = 0; index < res.length; index++) {
                        await message.member.roles.add(res[index].rolID)
                    }
                } catch (e) {

                }
            }
        }
    }

}