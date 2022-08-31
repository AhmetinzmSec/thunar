const Discord = require("discord.js");
const {createCanvas, loadImage} = require('canvas')
const db = require('quick.db');
const ayarlar = require('../../config.json')
const {renk, slogan} = require("../../versioninfo.json");

exports.run = async (client, message, args) => {

    const canvas = createCanvas(1000, 500)
    const ctx = canvas.getContext('2d')
    let preffix = db.fetch(`prefix_${message.guild.id}`);
    let prefixx = preffix ? preffix : ayarlar.prefix;

    function random(randomFlag, min, max) {
        let birharf = "",
            range = min,
            harfler = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min; // Any length
        }
        for (let i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (harfler.length - 1));
            birharf += harfler[pos];
        }
        return birharf;
    }

    const hersey = random(false, 6) //burayı değiştirebilirsin

    const bg = await loadImage('https://i.hizliresim.com/ajgn32d.png')

    ctx.drawImage(bg, 0, 0);
    ctx.font = `100px "sans-serif"`
    ctx.fillStyle = "#ffffff"
    ctx.fillText(hersey, 350, 275)

    db.set(`kod_${message.author.id}`, hersey) // => message.author.id verisini data1 kullanımıyla 100 olarak ayarladık

    const msg = await message.channel.send(`Kod Oluşturuluyor...`)

    await message.channel.send(`Resimde görülen 6 haneli kodu **${prefixx}onayoy** komutu ile yazınız `, {files: [canvas.toBuffer()]});

    msg.delete()

}

exports.conf = {
    aliases: ['oyla', 'sunucu-oyla'],
    permLevel: 0,
    usage: 'Sadece komutun adını girmeniz yeterlidir. Kod bir süre sonra otomatik olarak oluşturulacaktır',
    kategori: "Eğlence",
};

exports.help = {
    name: 'oy',
    description: 'Sunucuya girenlere isteğe bağlı Captcha yaptırır.',
    usage: 'sa knk nabün',
};