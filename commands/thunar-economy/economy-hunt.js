const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const {renk, slogan} = require("../../versioninfo.json");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]) || message.member;
    let user = message.author;
    let author = await db.fetch(`hunt_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));


        const yapildi = new Discord.MessageEmbed()
            .setTitle("Çok Acelecisin")
            .setDescription(`Yakın zamanda balık avladınız. Her 60 saniyede bir avlanma hakkı tanınır. Daha sonra tekrar deneyin`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(yapildi)

      } else {


    let hunt = [
        "**🐰 `(Tavşan)`**",
        "**🐸 `(Kurbağa)`**",
        "**🐒 `(Maymun)`**",
        "**🐔 `(Tavuk)`**",
        "**🐤 `(Civciv)`**",
        "**🐺 `(Kurt)`**",
        "**🐓 `(Horoz)`**",
        "**🦃 `(Hindi)`**",
        "**🐿 `(Sincap)`**",
        "**🐃 `(Manda)`**",
        "**🐂 `(Öküz)`**",
        "**🐎 `(At)`**",
        "**🐖 `(Domuz)`**",
        "**🐍 `(Yılan)`**",
        "**🐄 `(İnek)`**"
    ]

    const huntresult = Math.floor((Math.random() * hunt.length));
    let amount = Math.floor(Math.random() * 2000) + 1;
        const kazanmawk = new MessageEmbed()
            .setTitle("Av")
            .setDescription(`${hunt[huntresult]} avladınız ve \`${amount}\` kredi kazandınız`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(kazanmawk)

    db.add(`money_${user.id}`, amount)
    db.set(`hunt_${user.id}`, Date.now())

    };
    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hunt'],
    usage: '',
    permLevel: 0
}

exports.help = {
    name: 'av'
};
