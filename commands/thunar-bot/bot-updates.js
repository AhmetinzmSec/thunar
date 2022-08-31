const Discord = require('discord.js');
const database = require('quick.db');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    if(!database.fetch('güncellemeler') || database.fetch('güncellemeler').length <= 0) return message.reply('Hiç güncelleme notu eklenmemiş.');

    let pages = [];
    let page = 1;
    database.fetch('güncellemeler').sort((a, b) => b.number-a.number).forEach(data => {
        pages.push(new Discord.MessageEmbed()
            .setColor(renk)
            .setFooter(slogan)
            .setTitle('Mulan Güncellemesi')
            .setDescription(data.title)
            .addField("Güncelleme Notu Numarası", data.number)
            .addField('Güncelleme Notları', '・ '+data.description.split('\n').join('\n・ ')));
    });

    message.channel.send(pages[0]).then(m => {
        m.react('⬅').then(() => m.react('➡'));
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

        const backwards = m.createReactionCollector(backwardsFilter, { time: 0 });
        const forwards = m.createReactionCollector(forwardsFilter, { time: 0 });

        forwards.on('collect', (reaction, user) => {
            if(page === pages.length) {
                page = 0;
            };
            page++;
            reaction.users.remove(user.id);
            m.edit(pages[page-1]);
        })
        backwards.on('collect', (reaction, user) => {
            console.log(page);
            if(page <= 1) {
                page = pages.length+1;
            };
            reaction.users.remove(user.id);
            page--;
            m.edit(pages[page-1]);
        })
    });

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'güncellemeler'
};