const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../../config.json');
const sourcebin = require('sourcebin_js');
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
        let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: 'Ticket',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Sohbet Dökümü ${channel.name}`,
							description: `Bilet Sahibi ${message.author.tag}`,
						});
					}
					catch(e) {
						return message.channel.send('<a:no:784463793366761532> **An error occurred, please try again**');
					}

					const embed = new Discord.MessageEmbed()
					    .setTitle(`${message.author.tag} Tarafına Ait Destek Bileti Çıktısı`)
						.setDescription(`**İşte biletinizin dökümü, dökümü görüntülemek için lütfen aşağıdaki bağlantıya tıklayın** \n**[Görüntüle](${response.url})**`)
						.setFooter(slogan)
						.setColor(renk);
					message.reply(embed);
				});
			}
		}
		else {
			const yasak = new Discord.MessageEmbed()
				.setTitle(`Döküm Görüntülenemedi`)
				.setDescription(`Bu komutu burada kullanamazsınız, Lütfen bu komutu açık bir bilette kullanın`)
				.setFooter(slogan)
				.setColor(renk);
			return message.reply();
		}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["özet"],
	permLevel: 0
};

exports.help = {
	name: 'notlar'
};