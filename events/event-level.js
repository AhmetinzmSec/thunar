const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
client.cooldown = new Discord.Collection();
client.config = {
    cooldown: 1 * 1000
}
client.db = require("quick.db");
const { renk, slogan } = require("../versioninfo.json");

module.exports = async (message) => {

    if(message.channel.type == "dm") return;

    if (!db.has(`levels_${message.guild.id}`)) return;

    if (!message.guild || message.author.bot) return;
    exp(message);


    function exp(message) {
        if (!client.cooldown.has(`${message.author.id}`) || (Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
            let exp = client.db.add(`exp_${message.author.id}`, 1);
            let level = Math.floor(0.3 * Math.sqrt(exp));
            let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`, 1);
            ;
            if (level > lvl) {
                let newLevel = client.db.set(`level_${message.author.id}`, level);

                message.channel.send(`:tada: ${message.author.toString()}, Levelin ${newLevel} seviyesine yükseldi!`)

            }
            client.cooldown.set(`${message.author.id}`, Date.now());
        }
    }

}