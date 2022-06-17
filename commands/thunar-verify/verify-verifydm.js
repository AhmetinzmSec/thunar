const Discord = require('discord.js');
const db = require('quick.db')

const hrfler = ["a","b","c","d","e","f","g","i","h","j","k","k","l","m","n","o","p","s","t","u","v","y","z","1","2","3","4","5","6","7","8","9","0","A","C","B","D","E","F","G","M","H","I","J","K","L","N","O","P","S","T","U","V","Y","Z"]
const hrfler2 = ["a","b","c","d","e","f","g","i","h","j","k","k","l","m","n","o","p","s","t","u","v","y","z","1","2","3","4","5","6","7","8","9","0","A","C","B","D","E","F","G","M","H","I","J","K","L","N","O","P","S","T","U","V","Y","Z"]
const hrfler3 = ["a","b","c","d","e","f","g","i","h","j","k","k","l","m","n","o","p","s","t","u","v","y","z","1","2","3","4","5","6","7","8","9","0","A","C","B","D","E","F","G","M","H","I","J","K","L","N","O","P","S","T","U","V","Y","Z"]
const hrfler4 = ["a","b","c","d","e","f","g","i","h","j","k","k","l","m","n","o","p","s","t","u","v","y","z","1","2","3","4","5","6","7","8","9","0","A","C","B","D","E","F","G","M","H","I","J","K","L","N","O","P","S","T","U","V","Y","Z"]
const hrfler5 = ["a","b","c","d","e","f","g","i","h","j","k","k","l","m","n","o","p","s","t","u","v","y","z","1","2","3","4","5","6","7","8","9","0","A","C","B","D","E","F","G","M","H","I","J","K","L","N","O","P","S","T","U","V","Y","Z"]

exports.run = (client, message, params) => {

    var random = Math.floor(Math.random()*(hrfler.length-0+1)+0);
    var random2 = Math.floor(Math.random()*(hrfler2.length-0+1)+0);
    var random3 = Math.floor(Math.random()*(hrfler3.length-0+1)+0);
    var random4 = Math.floor(Math.random()*(hrfler4.length-0+1)+0);
    var random5 = Math.floor(Math.random()*(hrfler5.length-0+1)+0);

    var h1 = hrfler[random]
    var h2 = hrfler2[random2]
    var h3 = hrfler3[random3]
    var h4 = hrfler4[random4]
    var h5 = hrfler[random5]

    var tedoa = h1 + h2 + h3 + h4 + h5
    db.set(`kod_${message.author.id}`,tedoa)
    message.delete()

    const embed = new Discord.MessageEmbed()
        .setTitle("Onay Kodu")
        .setDescription(tedoa)
        .setColor(renk)
        .setFooter(slogan)
    message.author.send(embed)
    message.reply("Özel mesaj olarak gönderilen kodu bu kanala !onayla-özel yazarak onaylayınız")
}

exports.conf = {
    aliases: ["özel-doğrulama"],
};

exports.help = {
    name: 'doğrulama-özel',
};