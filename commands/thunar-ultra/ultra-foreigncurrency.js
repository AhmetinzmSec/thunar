const discord = require("discord.js");
const {
    MessageActionRow,
    MessageButton
} = require("discord-buttons")
const { renk, slogan } = require("../../versioninfo.json");

const fetch = require("node-fetch") // node-fetch 2.6.5 sürümünün kurulması gerekmektedir
const cheerio = require("cheerio")

exports.run = async (client, message, args) => {


    async function get() {
        const response = await fetch('https://uzmanpara.milliyet.com.tr/dolar-kuru/');
        const altinfetch = await fetch("https://uzmanpara.milliyet.com.tr/altin-fiyatlari/")
        const altinbody = await altinfetch.text()
        const cheeraltin = await cheerio.load(altinbody)
        const body = await response.text();
        const $ = await cheerio.load(body)
        const alis = await $("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detR > div.realTimeBox > div.realTimeBoxIn.up > div.realTimeBoxL").text().replace("Alış Fiyatı ", " ")
        const satis = await $("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detR > div.realTimeBox > div.realTimeBoxIn.up > div.realTimeBoxR").text().replace("Satış Fiyatı ", " ")
        let degisim = await $("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detR > div.realTimeBox > span.price-arrow-down").text()
        const aliseuro = await $("#doviz_tbl_1 > tbody > tr:nth-child(3) > td:nth-child(3)").text()
        const satiseuro = await $("#doviz_tbl_1 > tbody > tr:nth-child(3) > td:nth-child(4)").text()
        let degisimeuro = await $("#doviz_tbl_1 > tbody > tr:nth-child(3) > td.degisim.up").text()

        const alisgram = await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(3)").text()
        const satisgram = await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(4)").text()
        let degisimgram = await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.degisim.up").text()
        if (degisimgram == "") {
            degisimgram = "⬇️ " + await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.degisim.down").text()
        } else {
            degisimgram = "⬆️ " + degisimgram
        }
        const alisceyrek = await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(3)").text()
        const satisceyrek = await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(4)").text()
        let degisimceyrek = await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.degisim.up").text()
        if (degisimceyrek == "") {
            degisimceyrek = "⬇️ " + await cheeraltin("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detL > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.degisim.down").text()
        } else {
            degisimceyrek = "⬆️ " + degisimceyrek
        }


        if (degisimeuro == "") {
            degisimeuro = "⬇️ " + await $("#doviz_tbl_1 > tbody > tr:nth-child(3) > td.degisim.down").text()
        } else {
            degisimeuro = "⬆️ " + degisimeuro
        }
        if (degisim == "") {
            degisim = "⬆️ " + await $("body > div:nth-child(10) > div.detMain.borsaMain.goldMain > div.detR > div.realTimeBox > span.price-arrow-up").text()
        } else {
            degisim = "⬇️ " + degisim
        }
        return {
            "alis": alis,
            "satis": satis,
            "degisim": degisim,
            "aliseur": aliseuro,
            "satiseur": satiseuro,
            "degisimeur": degisimeuro,
            "satisgram": satisgram,
            "alisgram": alisgram,
            "degisimgram": degisimgram,
            "alisceyrek": alisceyrek,
            "satisceyrek": satisceyrek,
            "degisimceyrek": degisimceyrek
        }
    }

    const wait = await get()

    const btn = new MessageButton()
        .setLabel("Yenile")
        .setID("f5")
        .setStyle("green")

    const row = new MessageActionRow()
        .addComponent(btn)

    const embed = new discord.MessageEmbed()
        .setTitle("Döviz Kuru Çekildi")
        .setDescription("Kaynak: uzmanpara.milliyet.com.tr")
        .addField("Dolar", `
    Alış Fiyatı: **${wait.alis}**
    Satış Fiyatı: **${wait.satis}**
    Varyasyon Durumu: **${wait.degisim}**
    `)
        .addField("Euro", `
    Alış Fiyatı: **${wait.aliseur}**
    Satış Fiyatı: **${wait.satiseur}**
    Varyasyon Durumu: **${wait.degisimeur}**
    `)
        .addField("Gram Altın", `
    Alış Fiyatı: **${wait.alisgram}**
    Satış Fiyatı: **${wait.satisgram}**
    Varyasyon Durumu: **${wait.degisimgram}**
    `)
        .addField("Çeyrek Altın", `
    Alış Fiyatı: **${wait.alisceyrek}**
    Satış Fiyatı: **${wait.satisceyrek}**
    Varyasyon Durumu: **${wait.degisimceyrek}**
    `)
        .setColor(renk)
        .setFooter(slogan)

    await message.channel.send(embed, {
        components: [row]
    }).then(async function (mesaj) {
        await mesaj.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
            if (button.id == "f5") {
                const wait2 = await get()
                const embed2 = new discord.MessageEmbed()
                    .setTitle("Döviz Kuru Çekildi")
                    .setDescription("Kaynak: uzmanpara.milliyet.com.tr")
                    .addField("Dolar", `
    Alış Fiyatı: **${wait2.alis}**
    Satış Fiyatı: **${wait2.satis}**
    Varyasyon Durumu: **${wait2.degisim}**
    `)
                    .addField("Euro", `
    Alış Fiyatı: **${wait2.aliseur}**
    Satış Fiyatı: **${wait2.satiseur}**
    Varyasyon Durumu: **${wait2.degisimeur}**
    `)
                    .addField("Gram Altın", `
    Alış Fiyatı: **${wait2.alisgram}**
    Satış Fiyatı: **${wait2.satisgram}**
    Varyasyon Durumu: **${wait2.degisimgram}**
    `)
                    .addField("Çeyrek Altın", `
    Alış Fiyatı: **${wait.alisceyrek}**
    Satış Fiyatı: **${wait.satisceyrek}**
    Varyasyon Durumu: **${wait.degisimceyrek}**
    `)
                    .setColor(renk)
                    .setFooter(slogan)
                button.reply.defer()
                mesaj.edit(embed2)
            }
        })
    })


}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["doviz"],
    permLevel: 0
};
exports.help = {
    name: "döviz",
    description: "doviz işte",
    usage: "doviz"
};