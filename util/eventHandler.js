const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {

    client.on('ready', () => reqEvent('event-ready')(client, 'message')); // Bot Hazırlama Dosyası Çalıştırıldı

    client.on('message', () => reqEvent('event-coin')); // Coin

    client.on('message', reqEvent('event-message')); // Bot Genel Mesaj Bilgileri Tanımlandı
    client.on('message', reqEvent('event-adblock')); // Reklam Engelleyici Sistem Tanımlandı
    client.on('message', reqEvent('event-swearblock')); // Küfür Engelleyici Sistem Tanımlandı
    client.on('message', reqEvent('event-antispam')); // Spam Engelleyici Sistem Tamamlandı
    client.on('message', reqEvent('event-level')); // Level Sistemi Tamamlandı

    client.on('messageDelete', reqEvent('event-deletedmessage')); // Silinen Mesajların Kaydını Tutan Sistem Tanımlandı
    client.on('messageDelete', reqEvent('event-snipe')); // Silinen Mesajların Kaydını Veritabanında Tutan Sistem Tanımlandı

    client.on('messageUpdate', reqEvent('event-updatedmessage')); // Düzenlenen Mesajların Kaydını Tutan Sistem Tanımlandı


    client.on('guildMemberAdd', reqEvent('event-guardian')); // Güvenlik Sistemi Tanımlandı
    client.on('guildMemberAdd', reqEvent('event-autorole')); // Otomatik Rol Sistemi Tanımlandı
    client.on('guildMemberAdd', reqEvent('event-tagtest')); // Yasaklı Tag Sistemi Tanımlandı
    client.on('guildMemberAdd', reqEvent('event-welcome')); // Hoşgeldin Sistemi Tanımlandı

    client.on('guildMemberRemove', reqEvent('event-bye')); // Güle Güle Sistemi Tanımlandı
    client.on('guildMemberRemove', reqEvent('event-banclient')); // Üye Sunucucudan Ayrılınca Banlama İsteğini Soran Sistem Tanımlandı

    client.on('guildCreate', reqEvent('event-adbot')); // Bot Bir Sunucuya Eklendiğinde Sunucunun Rastgele Kanalına Bot Hakkında Bilgi Mesajı Atan Sistem Tanımlandı

}