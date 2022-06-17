const Discord = require('discord.js');
const discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu komutu kullanmak için `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yetkinyok)

    if (message.author.id !== message.guild.owner.user.id) return message.channel.send('Bu komutu kullanmak için, **Sunucu Sahibi** olmanız gerekiyor.')

    const rihtimveri = new MessageEmbed()
        .setTitle("Rıhtım Verileri Okunuyor...")
        .setDescription("Bot rıhtımından gerekli veriler okunuyor. Sunucu kurulum işlemini onayladığınızda veriler sunucunuza yazdırılacaktır")
        .setColor(renk)
        .setFooter(slogan)
    message.channel.send(rihtimveri)

    message.channel.send(new Discord.MessageEmbed()
        .setTitle('Gelişmiş Sunucu')
        .setColor(renk)
        .setFooter(slogan)
        .setDescription(`${message.author} **Gelişmiş Sunucunun** kurulmasını onaylıyor musunuz?

**Dipnot:** Bazı kanllar silinmemiş gibi görünebilir. Discord'dan çıkıp girdiğinizde düzeldiğini göreceksiniz. Kanal ve rol yetkilerinin sizler tarafından ayarlanması gerekmektedir. Thunar yetkileri ayarlayamaz. El ile ayarlamanız gerekmektedir
**Dipnot:** Tüm roller ve kanallar silinecektir. Topluluk aktifse kurallar ve topluluk güncellemeleri kanalları silinemez.
`)).then(resulter => {
        resulter.react('✅').then(() => resulter.react('❌'));

        const yesFilter = (reaction, user) => {
            return reaction.emoji.name === '✅' && user.id === message.guild.owner.user.id;
        };
        const yes = resulter.createReactionCollector(yesFilter, {time: 0});
        const noFilter = (reaction, user) => {
            return reaction.emoji.name === '❌' && user.id === message.guild.owner.user.id;
        };
        const no = resulter.createReactionCollector(noFilter, {time: 0});

        yes.on('collect', async reaction => {
            message.guild.roles.cache.filter(a => !a.managed && a.name !== '@everyone' && a.position < message.guild.members.cache.get(client.user.id).roles.highest.position).forEach(role => role.delete('ok boomer') && console.log(role.name + ' silindi sqrt'));
            message.guild.channels.cache.forEach(a => a.delete());

            message.guild.roles.create({data: {name: '🔥'}, reason: 'ayn'}).then(role => {
                role.setPermissions(['ADMINISTRATOR']);
                role.setColor('#070719');
            });
            message.guild.roles.create({data: {name: '👑 ・King Of Ice'}, reason: 'ayn'}).then(role => {
                role.setPermissions(['MANAGE_GUILD', 'MANAGE_ROLES', 'KICK_MEMBERS', 'MANAGE_NICKNAMES', 'MANAGE_MESSAGES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']);
                role.setColor('#3b0b0b');
            });
            message.guild.roles.create({data: {name: '👑 ・ Owner Of Ice'}, reason: 'ayn'}).then(role => {
                role.setPermissions(['MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'MANAGE_MESSAGES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']);
                role.setColor('#ff4000  ');
            });
            message.guild.roles.create({
                data: {name: '🐲・Dragon Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#2efef7'))
            message.guild.roles.create({
                data: {name: '🌟 ・ Manager Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#f4fa58'))
            message.guild.roles.create({
                data: {name: '💣 ・Master Mod. Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#955aab'))
            message.guild.roles.create({data: {name: 'Köle'}, reason: 'ayn'}).then(s => s.setColor('#2e9afe'))
            message.guild.roles.create({
                data: {name: '💫・Experienced Mod. Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#00ff40'))
            message.guild.roles.create({
                data: {name: '⚡・Moderator Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#e77e2e'))
            message.guild.roles.create({
                data: {name: '🌠・Register Mod. Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#ffffff'))
            message.guild.roles.create({
                data: {name: '🌩 ・Testing Mod. Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#955aab'))
            message.guild.roles.create({data: {name: 'Mute Of Ice'}, reason: 'ayn'}).then(s => s.setColor('#ffff00'))
            message.guild.roles.create({
                data: {name: '📙・Guide Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '☢・Guest Of Honor'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '🌀・Family Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '💎・Special Member Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '🥂・Sponsor Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '🎨・Designer Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '⭐🎉・Ultra Supporter Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '🤝・Partner Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '🐲・Dragon Supporter Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '🎉・Supporter Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '🔥・Member Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '👤・Unregistered Of Ice'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '🔑・Bots Of Ice'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: 'Kayıt Uyarı 1'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♦・Lady'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♦・Gentleman'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '✨・ Ice Moderation Crew'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '🎮・Gamer'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '</>・Coder'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({
                data: {name: '📢・Partner Bildirim'},
                reason: 'ayn'
            }).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '📢・Bildirim'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '💖'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '💔'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '🔓'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '🔒'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♒Kova'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♓Balık'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♑Oğlak'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♐Yay'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♏Akrep'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♎Terazi'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♍Başak'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♌Aslan'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♋Yengeç'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♊İkizler'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♉Boğa'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: '♈Koç'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))
            message.guild.roles.create({data: {name: 'Susturuldu'}, reason: 'ayn'}).then(s => s.setColor('#d20000'))


            message.guild.channels.create('|▬▬|🚧 Sınır Kapısı 🚧|▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「💬」・fake-chat', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🎤」・Ses Teyit', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(2));
                message.guild.channels.create('「🎤」・Ses Teyit', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(2));
                message.guild.channels.create('「🎤」・Ses Teyit', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(2));
            });

            message.guild.channels.create('|▬▬| 🦅 Thunar 🦅 |▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「🧾」・log', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🏧」・otorol-log', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('「⏺️」・kayıt', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('「✅」・onayla', {type: 'text'}).then(a => a.setParent(parent.id));
            });

            message.guild.channels.create('|▬▬|🌐 Topluluk 🌀 |▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「💬」・chat', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「👻」・cmd', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「📈」・rank', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「📷」・photo-chat', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「✨」・öneri-oyla', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🤫」・itiraf-et', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🤝」・partner', {type: 'text'}).then(c => c.setParent(parent.id));
            });

            message.guild.channels.create('|▬▬|📌Önemli 📙|▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「📋」・kurallar', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「📋」・rol-alma', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「📋」・rol-bilgi', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🚪」・gelen-giden', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🎫」・ticket', {type: 'text'}).then(c => c.setParent(parent.id));
            });

            message.guild.channels.create('|▬▬|🐲Dragon🐲|▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('⛓・linkler', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🔱・sunucu-log', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🔱・premium-log', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🔱・dm-log', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('💫・premium-bilgi', {type: 'text'}).then(c => c.setParent(parent.id));
            });

            message.guild.channels.create('|▬▬|💫Bize Katıl🌠|▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「🔷」・boost-ayrıcalıkları', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🔶」・tag-ayrıcalıkları', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('「📃」・başvuru', {type: 'text'}).then(a => a.setParent(parent.id));
            });

            message.guild.channels.create('|▬▬|🗣Ses Kanalları📁|▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「❌」・mikrofonsuz-chat', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('「🗣」・Sohbet', {type: 'voice'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('「🗣」・Sohbet', {type: 'voice'}).then(a => a.setParent(parent.id));
            });


            message.guild.channels.create('|▬▬|🎶Müzik🎵|▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「🎵🤖」・müzik-komut', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「❌🎤」・mikrofonsuz-chat', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🎵🎧」・Müzik', {type: 'voice'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🎵🎧」・Müzik', {type: 'voice'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「💎🎧」・Müzik', {type: 'voice'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「💎🎧」・Müzik', {type: 'voice'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「💎🎧」・Müzik', {type: 'voice'}).then(c => c.setParent(parent.id));
            });


            message.guild.channels.create('|▬▬|🎮Oyun 🎱|▬▬|', {type: 'category'}).then(parent => {
                message.guild.channels.create('「💬🎮」・oyun-chat', {type: 'text'}).then(c => c.setParent(parent.id))
                message.guild.channels.create('「📥」・indirme', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('「🎮」・Rainbow Six Siege', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(20));
                message.guild.channels.create('「🎮」・Among Us', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(10));
                message.guild.channels.create('「🎮」・Among Us', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(10));
                message.guild.channels.create('「🎮」・Among Us', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(10));
                message.guild.channels.create('「🎮」・Among Us', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(10));
                message.guild.channels.create('「🎮」・Valorant', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(5));
                message.guild.channels.create('「🎮」・Valorant', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(5));
                message.guild.channels.create('「🎮」・Valorant', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(5));
                message.guild.channels.create('「🎮」・Fortnite squad', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(4));
                message.guild.channels.create('「🎮」・Fortnite trio', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(3));
                message.guild.channels.create('「🎮」・Fortnite duo', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(2));
                message.guild.channels.create('「🎮」・Fortnite solo', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(1));
                message.guild.channels.create('「🎮」・Pubg M. squad', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(4));
                message.guild.channels.create('「🎮」・Pubg M. trio', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(3));
                message.guild.channels.create('「🎮」・Pubg M. duo', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(2));
                message.guild.channels.create('「🎮」・Pubg M. solo', {type: 'voice'}).then(c => c.setParent(parent.id) && c.setUserLimit(1));
            });

            message.guild.channels.create('|▬▬|🎫Tickets🔒|▬▬|', {type: 'category'}).then(parent => {
            });
        });

        no.on('collect', async reaction => {
            resulter.delete();
            message.channel.send('Kurulum İptal edildi')
        });

    })


};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sunucu-kur', 'create-server', 'sunucu-oluştur', 'gelişmiş-sunucu'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir. Sunucu kurulumuna devam etmek isterseniz mesajda yer alan onay emojisine tıklamanız yeterli olacaktır',
    permLevel: 0
}

exports.help = {
    name: 'sunucu-kur-gelişmiş'
};//THE MAN BEHİND THE İMPOSTER