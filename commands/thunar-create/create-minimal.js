const Discord = require('discord.js');
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yetkinyok)

    if (message.author.id !== message.guild.owner.user.id) return message.channel.send('Bu komutu kullanmak için, **Sunucu Sahibi** olmanız gerekiyor.')

    const rihtimveri = new MessageEmbed()
        .setTitle("Rıhtım Verileri Okunuyor...")
        .setDescription("Bot rıhtımından gerekli veriler okunuyor. Sunucu kurulum işlemini onayladığınızda veriler sunucunuza yazdırılacaktır")
        .setColor(renk)
        .setDescription(slogan)
    message.channel.send(rihtimveri)

    message.channel.send(new Discord.MessageEmbed()
        .setTitle('Minimal Sunucu Kurma İşlemi')
        .setColor(renk)
        .setFooter(slogan)
        .setDescription(`${message.author} **Minimal Sunucunun** kurulmasını onaylıyor musun? 

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

            message.guild.roles.create({data: {name: '🔑'}, reason: 'ayn'}).then(role => {
                role.setPermissions(['ADMINISTRATOR']);
                role.setColor('#070719');
            });
            message.guild.roles.create({data: {name: '👑・Kurucu'}, reason: 'ayn'}).then(role => {
                role.setPermissions(['MANAGE_GUILD', 'MANAGE_ROLES', 'KICK_MEMBERS', 'MANAGE_NICKNAMES', 'MANAGE_MESSAGES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']);
                role.setColor('#3b0b0b');
            });
            message.guild.roles.create({data: {name: '🔋・Projemiz'}, reason: 'ayn'}).then(role => {
                role.setPermissions(['MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'MANAGE_MESSAGES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']);
                role.setColor('#ff4000  ');
            });
            message.guild.roles.create({
                data: {name: '💫・Admin Sorumlusu'},
                reason: 'ayn'
            }).then(s => s.setColor('#2efef7'))
            message.guild.roles.create({
                data: {name: '👥・Destek Ekibi'},
                reason: 'ayn'
            }).then(s => s.setColor('#f4fa58'))
            message.guild.roles.create({
                data: {name: '🖥️・Onaylı Geliştirici'},
                reason: 'ayn'
            }).then(s => s.setColor('#955aab'))
            message.guild.roles.create({data: {name: '💻・Geliştirici'}, reason: 'ayn'}).then(s => s.setColor('#2e9afe'))
            message.guild.roles.create({data: {name: '✨・Özel Üye'}, reason: 'ayn'}).then(s => s.setColor('#00ff40'))
            message.guild.roles.create({data: {name: '⚡・Üye'}, reason: 'ayn'}).then(s => s.setColor('#e77e2e'))
            message.guild.roles.create({data: {name: '🎀・Onaylı Bot'}, reason: 'ayn'}).then(s => s.setColor('#ffffff'))
            message.guild.roles.create({data: {name: '📱・Bot'}, reason: 'ayn'}).then(s => s.setColor('#955aab'))
            message.guild.roles.create({data: {name: '🌙・JavaScript'}, reason: 'ayn'}).then(s => s.setColor('#ffff00'))
            message.guild.roles.create({data: {name: '▬▬▬▬▬▬▬▬'}, reason: 'ayn'}).then(s => s.setColor('#58fa58'))

            message.guild.channels.create('❗・Bilgi Kanalları', {type: 'category'}).then(parent => {
                message.guild.channels.create('🚀・boosters', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🎉・çekiliş', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('🛸・linkler', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('🔔・güncellemeler', {type: 'text'}).then(a => a.setParent(parent.id));
            });

            message.guild.channels.create('📓・Önemli Kanallar', {type: 'category'}).then(parent => {
                message.guild.channels.create('📓・kurallar', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('📥・anketler', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('📛・bilgi', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('📋・sunucularınız', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('📌・davetler', {type: 'text'}).then(c => c.setParent(parent.id));
            });

            message.guild.channels.create('🔩・Lobi', {type: 'category'}).then(parent => {
                message.guild.channels.create('💬・sohbet', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('📈・rank', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('📷・foto-chat', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🤖・bot-komut', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🌟・bot-giriş-çıkış', {type: 'text'}).then(c => c.setParent(parent.id));
            });

            message.guild.channels.create('🔊・Ses Kanalları', {type: 'category'}).then(parent => {
                message.guild.channels.create('🔊・ Sohbet ¹', {type: 'voice'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🔊・ Sohbet ²', {type: 'voice'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🔊・ Sohbet ³', {type: 'voice'}).then(c => c.setParent(parent.id));
            });

            message.guild.channels.create('🎶・Müzik Kanalları', {type: 'category'}).then(parent => {
                message.guild.channels.create('🎶・disko-komut', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🎵・ Disko ¹', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
                message.guild.channels.create('🎵・ Disko ²', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
                message.guild.channels.create('🎵・ Disko ³', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
            });

            message.guild.channels.create('💾・Log Kanalları', {type: 'category'}).then(parent => {
                message.guild.channels.create('💾・otorol', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('💾・sayaç', {type: 'text'}).then(a => a.setParent(parent.id));
                message.guild.channels.create('💾・mod-log', {type: 'text'}).then(a => a.setParent(parent.id));
            });


            message.guild.channels.create('🔨・Botlist Odaları', {type: 'category'}).then(parent => {
                message.guild.channels.create('🌟・bot-şartları', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('💫・bot-ekle', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🌈・bot-log', {type: 'text'}).then(c => c.setParent(parent.id));
                message.guild.channels.create('🔨・bot-test', {type: 'text'}).then(c => c.setParent(parent.id));
            });
        });


        no.on('collect', async reaction => {
            resulter.delete();
        });

    })


};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sunucu-oluştur-küçük', 'küçük-sunucu'],
    usage: 'Sadece komutun ismini yazmanız yeterlidir. Sunucu kurulumuna devam etmek isterseniz mesajda yer alan onay emojisine tıklamanız yeterli olacaktır',
    permLevel: 0
}

exports.help = {
    name: 'sunucu-kur-minimal'
};//THE MAN BEHİND THE İMPOSTER