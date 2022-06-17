const Discord = require("discord.js");
const { renk, slogan } = require("../../versioninfo.json");

exports.run = (client, msg, args) => {

    let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
    
    //yönetici
    if (msg.member.hasPermission("ADMINISTRATOR")) x = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("ADMINISTRATOR")) x = "<:hayir:924575992184442900>";
    
    //Denetim kaydı
    if (msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = "<:hayir:924575992184442900>";
    
    //Sunucuyu yönet
    if (msg.member.hasPermission("MANAGE_GUILD")) x3 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("MANAGE_GUILD")) x3 = "<:hayir:924575992184442900>";
    
    //Rolleri yönet
    if (msg.member.hasPermission("MANAGE_ROLES")) x4 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("MANAGE_ROLES")) x4 = "<:hayir:924575992184442900>";
    
    //Kanalları yönet
    if (msg.member.hasPermission("MANAGE_CHANNELS")) x5 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) x5 = "<:hayir:924575992184442900>";
    
    //üyeleri at
    if (msg.member.hasPermission("KICK_MEMBERS")) x6 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("KICK_MEMBERS")) x6 = "<:hayir:924575992184442900>";
    
    //üyeleri yasakla
    if (msg.member.hasPermission("BAN_MEMBERS")) x7 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("BAN_MEMBERS")) x7 = "<:hayir:924575992184442900>";
    
    //mesajları yönet
    if (msg.member.hasPermission("MANAGE_MESSAGES")) x8 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) x8 = "<:hayir:924575992184442900>";
    
    //kullanıcı adlarını yönet
    if (msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = "<:hayir:924575992184442900>";
    
    //emojileri yönet
    if (msg.member.hasPermission("MANAGE_EMOJIS")) x10 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("MANAGE_EMOJIS")) x10 = "<:hayir:924575992184442900>";
    
    //webhookları yönet
    if (msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = "<:evet:924575954548969472>";
    if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = "<:hayir:924575992184442900>";
    
    const embed = new Discord.MessageEmbed()

        .setTitle('Yetkiler')
        .setDescription(`**Yönetici** ${x}\n\n**Denetim Kaydını Görüntüle** ${x2}\n\n**Sunucuyu Yönet** ${x3}\n\n**Rolleri Yönet** ${x4}\n\n**Kanalları Yönet** ${x5}\n\n**Üyeleri At** ${x6}\n\n**Üyeleri Yasakla** ${x7}\n\n**Mesajları Yönet** ${x8}\n\n**Kullanıcı Adlarını Yönet** ${x9}\n\n**Emojileri Yönet** ${x10}\n\n**Webhook'ları Yönet** ${x11}\n\n=======================`)
        .addField("**Yetkin Var**", "<:evet:924575954548969472>")
        .setColor(renk)
        .setFooter(slogan)
        .addField("**Yetkin Yok**", "<:hayir:924575992184442900>")

    msg.channel.send(embed)

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["izinlerim"],
    usage: 'Sadece komutun ismini yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: "yetkilerim",
    description: "Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.",
    usage: "yetkilerim"
};