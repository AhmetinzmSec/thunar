const Discord = require("discord.js");
const database = require('quick.db');

exports.run = async (client, message, args) => {
    const error = (str) => message.channel.send(new Discord.MessageEmbed().setColor('RED').setTitle('Hata').setDescription(str));

    const privateChannelID = '925412621111410748';
    const categoryID = '925412600978767965';

    if (message.channel.id != privateChannelID) return error(`Bu komut <#${privateChannelID}> kanalında kullanılabilir.`);
    const option = args[0];
    const options = ['oluştur', 'sil', 'izin'];
    try {
        switch (option) {
            case 'oluştur':
                if (database.has(`privateChannels.${message.author.id}`)) return error('Zaten bir özel kanala sahipsiniz.');

                const limit = args[1];
                if (!limit) return error('\`<üyeSayısı>\` değeri girilmemiş.');
                if (isNaN(limit)) return error('Maksimum üye sayısı sayı olmak zorundadır.');
                if (limit >= 99) return error('Maksimum üye sayısı sayı olmak zorundadır.');

                const channelName = args[2];
                if (!channelName) return error('\`<kanalAdı>\` değeri girilmemiş.');
                if (channelName.length > 20) return error('Girmiş olduğunuz kanal ismi 20 karakterden daha az olmalı.');

                message.guild.channels.create(channelName, {
                    type: 'voice',
                    topic: `${message.member.displayName} kişisine ait özel kanal.`,
                    userLimit: limit,
                    parent: categoryID,
                    permissionOverwrites: [{ id: message.member.id, allow: 'CONNECT' }, { id: message.guild.id, deny: 'CONNECT' }]
                }).then(async createdChannel => {
                    const privateChannelLink = await createdChannel.createInvite({ maxAge: 0 });
                    const privateChannelInfo = {
                        channelLink: privateChannelLink,
                        channelID: createdChannel.id,
                        channelName: createdChannel.name,
                        channelUserLimit: createdChannel.userLimit,
                        createdBy: message.member,
                    };

                    database.set(`privateChannels.${message.author.id}`, privateChannelInfo);
                    message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setTitle('Kurulum başarılı!').setDescription(`**Özel kanalınız başarıyla kuruldu. Girmek için [tıklayınız.](${privateChannelLink.url})**`).setFooter('Üç dakika hareketsizlik sonucunda kanal otomatik olarak kapatılır.'))

                    const interval = setInterval(() => {
                        if (createdChannel.members.size == 0) {
                            createdChannel.delete();
                            database.delete(`privateChannels.${message.author.id}`);
                            message.channel.send(`${message.author}`, new Discord.MessageEmbed().setColor('GREEN').setTitle('Silme başarılı!').setDescription(`**Özel kanalınız hareketsizlik sebebiyle silindi.**`));
                            clearInterval(interval);
                        };
                    }, 1000 * 60 * 3);
                });

                break;
            case 'sil':
                if (!database.has(`privateChannels.${message.author.id}`)) return error('Zaten herhangi bir özel kanala sahip değilsiniz.');

                const channelInfo = database.get(`privateChannels.${message.author.id}`);
                const privateChannel = message.guild.channels.cache.get(channelInfo.channelID);

                privateChannel.delete();
                database.delete(`privateChannels.${message.author.id}`);
                message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setTitle('Silme başarılı!').setDescription(`**Özel kanalınız başarıyla silindi.**`));

                break;
            case 'izin':
                if (!database.has(`privateChannels.${message.author.id}`)) return error('Zaten herhangi bir özel kanala sahip değilsiniz.');

                const channelInfo1 = database.get(`privateChannels.${message.author.id}`);
                const privateChannel1 = message.guild.channels.cache.get(channelInfo1.channelID);

                if (message.mentions.members.size <= 1) {
                    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.displayName.includes(args.slice(1).join(' ')));
                    if (!user) return error('Kullanıcı bulunamadı.');
                    if (privateChannel1.permissionsFor(user).has('CONNECT')) {
                        privateChannel1.updateOverwrite(user, {
                            CONNECT: false
                        }).then(() => {
                            message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setTitle('İzin silindi!').setDescription(`**${user} kişisinin, özel kanalınıza girme yetkisi silindi.**`));
                        });
                    } else {
                        privateChannel1.updateOverwrite(user, {
                            CONNECT: true
                        }).then(() => {
                            message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setTitle('İzin verildi!').setDescription(`**${user} kişisine, özel kanalınıza girme yetkisi verildi.**`));
                        });
                    };
                } else if (message.mentions.members.size > 1 && message.mentions.members.size <= 10) {
                    await message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription('İzinler ayarlanıyor..')).then(async m => {
                        const allowed = await [];
                        const disallowed = await [];
                        await message.mentions.members.forEach(async member => {
                            if (privateChannel1.permissionsFor(member).has('CONNECT')) {
                                privateChannel1.updateOverwrite(member, {
                                    CONNECT: false
                                }).then(async () => {
                                    await disallowed.push(member.user.tag);
                                });
                            } else {
                                privateChannel1.updateOverwrite(member, {
                                    CONNECT: true
                                }).then(async () => {
                                    await allowed.push(member.user.tag);
                                });
                            };
                        });

                        setTimeout(async () => {
                            await m.edit(new Discord.MessageEmbed()
                                .setColor('GREEN').setTitle('İzinler ayarlandı!')
                                .setDescription(`> **${allowed.length == 0 ? "Hiç kimseye izin verilmedi." : `${allowed.map(m => m).join(', ')} kişilerine özel kanalınıza girme yetkisi verildi.`}**\n\n> **${disallowed.length == 0 ? "Hiç kimseden kanala girme izni alınmadı." : `${disallowed.map(m => m).join(', ')} kişilerinden özel kanalınıza girme yetkisi alındı.**`}`));
                        }, message.mentions.members.size * 1000);
                    });

                } else {
                    error('Aynı anda maksimum 10 kişinin izinlerini ayarlayabilirsiniz.');
                };

                break;
            default:
                error(`Lütfen bir opsiyon belirtin.\n\n\`• !özelkanal oluştur <üyeSayısı> <kanalAdı>\`\n\`• !özelkanal sil\`\n\`• !özelkanal izin @üye\``);
        };
    } catch (err) {
        error('Bir hata oluştu..');
        console.error(err);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ök', 'özel-kanal'],
    permLevel: 0
};

exports.help = {
    name: 'özelkanal',
    description: 'Özel kanal sistemi. lauraa tarafından yapılmıştır.',
};