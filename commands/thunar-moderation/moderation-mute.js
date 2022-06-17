const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
const discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");
var Jimp = require('jimp');

exports.run = async (client, message, args) => {

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[1])

    const yetkinyok = new discord.MessageEmbed()
        .setTitle("Yetki Reddedildi")
        .setDescription('**Bu birimi kullanmak için `ROLLERİ_YÖNET` ya da `YÖNETİCİ` yetkisine sahip olmalısın**')
        .setColor(renk)
        .setFooter(slogan)
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(yetkinyok)
    const time = args[2]

    var banlayan = message.author;

    var neden = args.slice(3).join(' ') ? args.slice(3).join(' ') : 'Neden Belirtilmedi';
    if (!Member) return message.channel.send('Kullanıcı Bulunamadı.')
    if (!time) return message.channel.send('Lütfen bir saat belirtin.')
    if (Member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Yetkili** Bir Kullanıcıyı **Susturmaya** Çalışıyorsun. Bunu Yapamam')
    const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'susturuldu')
    if (!role) {
        try {
            message.channel.send('`Susturuldu` rolü bulunamıyor, susturulan rol oluşturulmaya çalışılıyor.')

            let muterole = await message.guild.roles.create({
                data: {
                    name: 'susturuldu',
                    permissions: []
                }
            });
            message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            });
            message.channel.send('Susturulan rol başarıyla oluşturuldu.')
        } catch (error) {
            console.log(error)
        }
    }
    ;
    const embed = new MessageEmbed()
        .setTitle('Şşşş... Sessizlik :shushing_face:')
        .addField('Susturulan Üye', `${Member.displayName}`)
        .addField('Susturan Yetkili', `${banlayan}`)
        .addField('Susturma Süresi', `${time}`)
        .addField('Susturma Sebebi', `${neden}`)
        .setColor(renk)
        .setFooter(slogan)
    let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'susturuldu')
    if (Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} zaten sessize alındı.`)
    await Member.roles.add(role2)
    message.channel.send(embed)

    var user = message.mentions.users.first() || message.author;
    message.channel.startTyping();
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;

    if (!Member.roles.cache.has(role2.id)) return message.channel.send('Yasak Zaten Kaldırılmış')

    setTimeout(async () => {
        await Member.roles.remove(role2)
        const embed = new MessageEmbed()
            .setTitle('Beraat Kararı')
            .addField('Yasağı Kaldırılan Üye', `${Member.displayName}`)
            .addField('Kim Kaldırdı', 'Bot tarafından otomatik olarak kaldırıldı')
            .addField('Umarım Aynı Hatayı Tekrar Yapmazsın', `${Member.displayName} lütfen aynı hatayı yapma :blush:`)
            .setColor(renk)
            .setFooter(slogan)

        message.channel.send(embed)
    }, ms(time))

};

exports.conf = {
    aliases: ['sürelisustur', 'tempmute', 'mute', 'sustur'],
    usage: '!mute [kullanıcı etiketi] \n\n (Eğer Susturuldu isminde bir rolünüz bulunmuyorsa BÖRÜ sizin adınıza otomatik olarak oluşturulur. Daha sonra rolün rengi ve yetkileriyle oynama yapabilirsiniz. Rolün isiminde sadece büyük-küçük harf değişikliği yapabilirsiniz. İsmi değiştirirseniz yeniden rol oluşturulur)',
    permLevel: 0
};

exports.help = {
    name: 'timestamp',
    description: '',
    usage: ''
};

/*
   BAN İZNİ : 2
   ADMİN İZNİ : 3
   SADECE GELİŞTİRİCİ : 4
   ATMA İZNİ : 5
 */