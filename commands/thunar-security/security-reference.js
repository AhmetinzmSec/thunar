const Discord = require('discord.js');
const db = require("quick.db")
const {MessageEmbed} = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => { /// Created by ByMayFe_0#3960 && Zeaste#2841 for CodAre
    const msg = message

    var kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!kisi) return message.reply("ReferansOlmak İçin Bir Kullanıcı Belirtiniz!");
    var referansSayisi = await db.fetch(`Referans_${message.guild.id}_${kisi.id}`);

    if(referansSayisi >= 5) return message.reply("5'ten fazla kişiye referans olamazsın!");

    if (!db.has("rlog" + message.guild.id)) return message.reply("Log Kanalı Ayarlı Değil");

    var logkanali = db.fetch("rlog" + message.guild.id)  // LOGKANALI DATABASE ÜZERİNDEN ÇEKİLDİ
    
    var rolcukE = db.fetch("erkek" + message.guild.id) // ERKEK ROLÜ DATABASE ÜZERİNDEN ÇEKİLDİ
    var rolcukK = db.fetch("kadin" + message.guild.id) // KIZ ROLÜ DATABASE ÜZERİNDEN ÇEKİLDİ

    const referencechannel = message.guild.channels.cache.get(logkanali)

    const emebd = new MessageEmbed()
        .setTitle("Referans İsteği")
        .setDescription(`${kisi} seni ${message.author} referansı ile sunucuya alacağım. Kabul etmek için 10 dakikan var. \n Cinsiyetinizi belirtmeyi unutmayın`)
        .setColor(renk)
        .setFooter(slogan)

    var mesaj = await referencechannel.send(emebd);
    await mesaj.react("👨")
    await mesaj.react("👩")


    const filter = (r, user) => user.id !== client.user.id && user.id == kisi.id;


    try {
        var collector = mesaj.createReactionCollector(filter, {
            max: 1,
            time: 600000,
        });


    } catch(e) {
        console.log(e)
    }


    collector.on("collect", async (r, user) => {

        if(r.emoji.name == "💙") {
            var kırmızı = mesaj.reactions.cache.get("❤️").users.cache.get(user.id);
            if(kırmızı) {
                r.users.remove(user).catch(console.error);
                return kisi.send("Zaten Tıkladın");
            }
            await kisi.roles.set([rolcukE])
            await db.add(`Referans_${message.guild.id}_${message.author.id}`, 1)
        }
        if(r.emoji.name == "❤️") {
            var mavi = mesaj.reactions.cache.get("💙").users.cache.get(user.id);
            if(mavi) {
                r.users.remove(user).catch(console.error);
                return kisi.send("Zaten Daha Önce Birine Tıkladın");
            }
            await kisi.roles.set([rolcukK])
            await db.add(`Referans_${message.guild.id}_${message.author.id}`, 1)
        }

    });


    collector.on('end', async collected => {
        if(mesaj) await mesaj.delete({timeout: 1000});
    });


};


exports.conf = {
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'referans',
    description: 'Kullanıcıya Referans Olursunuz!',
    usage: 'referans [@bymayfe/402047297963294730]'
};