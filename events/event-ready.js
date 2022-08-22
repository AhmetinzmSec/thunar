const Discord = require('discord.js'); // Dicord.JS Modülü Tanımlandı
const {version_name, botstatus, botstatusno, discord_js, version} = require('../versioninfo.json');

module.exports = client => {


    client.user.setStatus("online");

    // Konsola THUNAR Yazdırıldı
    console.log(`THUNAR || ${version_name}`);

    console.log(`THUNAR || ${version}`)

    console.log(`TOPLAM KOMUT SAYISI : ${client.commands.size}`)

    var randommessages = [

        `${version} || !şartlar`,
        `${version} || !yardım`,
        `${version} || Efsanevi Mulan Güncellemesine Son 8 Gün!`,
        `${version} || Efsanevi Güncellemeye Son 8 Gün!`,
        `${version} || Büyük Değişime 8 Gün!`,
        `${version} || Efsanevi Sistemlere Hazır Olun...`,
        `${version} || ${version_name}`

    ]

    // Rastgele Yazılar Her 5 Saniyede Bir Değişecek Şekilde Zamanlandı
    setInterval(function () {

        var randommessages1 = randommessages[Math.floor(Math.random() * (randommessages.length))]

        client.user.setActivity(randommessages1, { type: 'PLAYING' });

    }, 15000);

    /* client.user.setActivity(`${version} || +yardım`, {type: 'PLAYING'}); */

    client.on('message', msg => {
        client.emit('checkMessage', msg);
    })
}
