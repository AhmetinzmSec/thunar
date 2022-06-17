const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { renk, slogan } = require("../versioninfo.json");

module.exports = async (msg) => {

    if(msg.channel.type == "dm") return;

    if (!db.has(`reklam_${msg.guild.id}`)) return;
    const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".rf.gd", ".az", ".party", "discord.gg",];
    if (reklam.some(word => msg.content.includes(word))) {
        const role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === 'susturuldu')

        if (!role) {
            try {
                msg.channel.send('`Susturuldu` rolü bulunamıyor, susturulan rol oluşturulmaya çalışılıyor.')

                let muterole = await msg.guild.roles.create({
                    data: {
                        name: 'susturuldu',
                        permissions: []
                    }
                });
                msg.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                msg.channel.send('Susturulan rol başarıyla oluşturuldu.')

                const embed = new MessageEmbed()
                    .setTitle('Şşşş... Sessizlik :shushing_face:')
                    .addField('Susturulan Üye', `${message.author}`)
                    .addField('Susturan Yetkili', `${banlayan}`)
                    .addField('Susturma Sebebi', `Link Tespiti`)
                    .setColor(renk)
                    .setFooter(slogan)
                let role2 = msg.guild.roles.cache.find(r => r.name.toLowerCase() === 'susturuldu')
                await msg.author.roles.add(role2)
                msg.channel.send(embed)

            } catch (error) {
                console.log(error)
            }
        }

        try {
            if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
                msg.delete();

                const embed = new MessageEmbed()
                    .setTitle('Link Engellendi')
                    .addField('Mesajı Silinen Kişi', `${msg.author}`)
                    .addField('Silinme Nedeni', 'Mesajda link tespit edildi')
                    .addField('Yazılan mesajda link tespit ettik', 'Linkin güvenilirliğinden emin olamıyoruz. Sunucumuzun düzenini bozmamak için linkleri engelliyoruz')
                    .setColor(renk)
                    .setFooter(slogan)

                return msg.channel.send(embed);

            }
        } catch (err) {
            console.log(err);
        }
    }

}