const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../../config.json');
const discord = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {
        let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		

		if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
		}
		else {

			const silinemedi = new discord.MessageEmbed()
				.setTitle("Destek Bileti Silinemedi")
				.setDescription('Bu komutu burada kullanamazsınız. Lütfen bir bileti silmek istediğinizde bu komutu kullanın')
				.setColor(renk)
				.setFooter(slogan)
			return message.reply(silinemedi);
		}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'delete'
};