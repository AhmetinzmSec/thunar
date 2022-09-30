const db = require("quick.db")
const Discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]) || message.member;
    let user = message.author;
    let author = await db.fetch(`fish_${user.id}`)

    let timeout = 60000;

    if (timeout - (Date.now() - author) > 9000) {
        let time = (timeout - (Date.now() - author));

        const yapildi = new Discord.MessageEmbed()
            .setTitle("Çok Acelecisin")
            .setDescription(`Yakın zamanda balık avladınız. Her 60 saniyede bir avlanma hakkı tanınır. Daha sonra tekrar deneyin`)
            .setColor(renk)
            .setFooter(slogan)
        message.channel.send(yapildi)

    } else {

        let fish = [
            "**🐠 `(Tropikal Balık)`**",
            "**🐟 `(Balık)`**",
            "**🐡 `(Balon Balığı)`**",
            "**🐬 `(Yunus)`**",
            "**🦐 `(Karides)`**",
            "**🦈 `(Köpek Balığı)`**",
            "**🔋 `(Pil)`**",
            "**🦂 `(Akrep)`**",
            "**⛸ `(Buz Pateni)`**",
            "**👕 `(Giyisi)`**",
            "**📦 `(Kutu)`**",
            "**🏓 `(Pin Pon)`**",
            "**🦑 `(Kalamar)`**",
            "**⚽ `(Top)`**"

        ]
        let fishresult = Math.floor((Math.random() * fish.length));
        let amount = Math.floor(Math.random() * 1000) + 1;
        if (!args[0]) {
            const kazanmawk = new MessageEmbed()
                .setTitle("Balık Avı")
                .setDescription(`${fish[fishresult]} avladınız ve \`${amount}\` kredi kazandınız`)
                .setColor(renk)
                .setFooter(slogan)
            message.channel.send(kazanmawk)
            db.add(`money_${user.id}`, amount)
            db.set(`fish_${user.id}`, Date.now())
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['balık-avı', 'fish'],
    usage: '',
    permLevel: 0
}

exports.help = {
    name: 'balık'
};