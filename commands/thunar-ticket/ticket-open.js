const Discord = require('discord.js');
const db = require('quick.db')
const { token} = require('../../config.json');
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

		if (message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			try {
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				})
					.then(() => {

						const silinemedi = new discord.MessageEmbed()
							.setTitle("Destek Bileti Yenilendi")
							.setDescription(`Başarıyla yeniden açıldı ${message.channel}`)
							.setColor(renk)
							.setFooter(slogan)
						message.channel.send(silinemedi);
					});
			}
			catch (e) {
				const hata = new discord.MessageEmbed()
					.setTitle("Hata")
					.setDescription(`Bir hata oluştu. Lütfen tekrar deneyin`)
					.setColor(renk)
					.setFooter(slogan)
				return message.channel.send(hata);
			}
		}
		else {
			const yasak = new discord.MessageEmbed()
				.setTitle("Destek Bileti Yenilenemedi")
				.setDescription(`Bu komutu burada kullanamazsınız, Lütfen bu komutu kapalı bir bilet üzerinde kullanın`)
				.setColor(renk)
				.setFooter(slogan)
			return message.reply(yasak);
		}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['aç'],
	permLevel: 0
};

exports.help = {
	name: 'open'
};