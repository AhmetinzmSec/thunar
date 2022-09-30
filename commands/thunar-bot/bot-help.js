const disbut = require("discord-buttons")
const Discord = require("discord.js")
const moment = require("moment");
const {version, version_name, renk, slogan} = require('../../versioninfo.json')
const {MessageEmbed} = require("discord.js");

exports.run = async (client, message, args) => {

    if (message.author.bot) return;
    message.channel.send(`Sunucu İle Anahtar Takası Yapılıyor...`).then(async msj => {
        const botPing = (msj.createdTimestamp - message.createdTimestamp);
        msj.delete();
        const btn1 = new disbut.MessageMenuOption()
            .setLabel('Thunar Yardım Üssü')
            .setDescription("Thunar yardım üssü")
            .setValue('1')
            .setEmoji("1004478039905808445")
        const btn2 = new disbut.MessageMenuOption()
            .setLabel('Bot Temel Birimler')
            .setDescription(`Temel birimleri gösterir`)
            .setValue('2')
            .setEmoji("924661613993263104")
        const btn3 = new disbut.MessageMenuOption()
            .setLabel('BotList Birimleri')
            .setDescription(`Thunar botlist birimlerini gösterir`)
            .setValue('3')
            .setEmoji("1010936203501109258")
        const btn4 = new disbut.MessageMenuOption()
            .setLabel('Thunar Kod Paylaşım Üssü')
            .setDescription(`Thunar kod paylaşım üssü birimlerini gösterir`)
            .setValue('4')
            .setEmoji("1010937427097034873")
        const btn5 = new disbut.MessageMenuOption()
            .setLabel('Thunar Para Üssü')
            .setDescription(`Thunar para üssü birimlerini gösterir`)
            .setValue('5')
            .setEmoji("937859718326652929")
        const btn6 = new disbut.MessageMenuOption()
            .setLabel('Sunucu Kurma Üssü')
            .setDescription(`Sunucu kurma birimlerini gösterir.`)
            .setValue('6')
            .setEmoji("932270643322441748")
        const btn7 = new disbut.MessageMenuOption()
            .setLabel('Ekonomi Üssü')
            .setDescription(`Ekonomi birimlerini gösterir.`)
            .setValue('7')
            .setEmoji("1011753830746165279")
        const btn8 = new disbut.MessageMenuOption()
            .setLabel('Eğlence Üssü')
            .setDescription(`Eğlence birimlerini gösterir.`)
            .setValue('8')
            .setEmoji("932712172050604102")
        const btn9 = new disbut.MessageMenuOption()
            .setLabel('Çıktı Ayarları')
            .setDescription(`Çıktı Ayarları birimlerini gösterir`)
            .setValue('9')
            .setEmoji("933281800321658911")
        const btn10 = new disbut.MessageMenuOption()
            .setLabel('Kullanıcı Ayarları')
            .setDescription(`Kullanıcı birimlerini gösterir`)
            .setValue('10')
            .setEmoji("933282557896839218")
        const btn11 = new disbut.MessageMenuOption()
            .setLabel('Moderasyon Birimleri')
            .setDescription(`Moderasyon birimlerini gösterir`)
            .setValue('11')
            .setEmoji("933281661527949373")
        const btn12 = new disbut.MessageMenuOption()
            .setLabel('Gardiyan Birimleri')
            .setDescription(`Gardiyan birimlerini gösterir`)
            .setValue('12')
            .setEmoji("933281753806815263")
        const btn13 = new disbut.MessageMenuOption()
            .setLabel('Sunucu Üs Birimleri')
            .setDescription(`Sunucu üssü birimlerini gösterir`)
            .setValue('13')
            .setEmoji("924576023503331358")
        const btn14 = new disbut.MessageMenuOption()
            .setLabel('Sunucu Üs Birimleri #2')
            .setDescription(`Sunucu üssü birimlerini gösterir`)
            .setValue('14')
            .setEmoji("924576023503331358")
        const btn15 = new disbut.MessageMenuOption()
            .setLabel('Destek Bileti Üssü')
            .setDescription(`Bilet sistemi üssü birimlerini gösterir`)
            .setValue('15')
            .setEmoji("1011221423987097600")
        const btn16 = new disbut.MessageMenuOption()
            .setLabel('Kayıt Üssü')
            .setDescription(`Kayıt üssü birimlerini gösterir`)
            .setValue('16')
            .setEmoji("933281838942781470")
        const btn17 = new disbut.MessageMenuOption()
            .setLabel('Doğrulama Üssü')
            .setDescription(`Doğrulama üssü birimlerini gösterir`)
            .setValue('17')
            .setEmoji("932270169433202848")
        const btn18 = new disbut.MessageMenuOption()
            .setLabel('Gelişmiş Birimler Üssü')
            .setDescription(`Gelişmiş birimleri gösterir`)
            .setValue('18')
            .setEmoji("933445438835683358")
        const btn19 = new disbut.MessageMenuOption()
            .setLabel('Thunar İstatistik Üssü')
            .setDescription("İstatistik üssünü içeren sayfa")
            .setValue('19')
            .setEmoji("933281601108975656")
        const btn20 = new disbut.MessageMenuOption()
            .setLabel(`Geliştirici Bilgileri`)
            .setDescription("Geliştirici hakkında bilgiler")
            .setEmoji("933367258267385866") // arıza
            .setValue("20")
        const btn21 = new disbut.MessageMenuOption()
            .setLabel(`Sürüm Bilgisi`)
            .setDescription("Sürüm Bilgisi")
            .setEmoji("932270643322441748")
            .setValue("21")

        const menu = new disbut.MessageMenu()
            .addOptions(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10, btn11, btn12, btn13, btn14, btn15, btn16, btn17, btn18, btn19, btn20, btn21)
            .setMaxValues(1)
            .setMinValues(1)
            .setID("menu")

        const hakkinda = new Discord.MessageEmbed()
            .setTitle('Thunar Yardım Üssü')
            .setColor(renk)
            .setFooter(slogan)
            .setDescription(`***Yenilenmiş Yardım Üssüne Hoşgeldiniz! Yeni Birimleri Öğrenmeye Hazır mısınız?*** \n\n Merhabalar, ben Thunar. Yardım üssüm basit tasarlanmaya çalışılmıştır. Thunar yardım üssüne hoşgeldiniz. Thunar hakkında bilmek isteyeceğiniz şeyler ve Thunar'ın birimleri hakkında bilgiler yardım üssünde bulunuyor. \n\n Thunar, geniş kapsamlı çok fonksiyonlu Discord genel botudur. Her ihtiyacınıza uygun tasarlanmış yapısıyla sizlere hizmet vermektedir. \n\n Thunar, merkezi uptime servisi kullanmaz. Yonga seti uptime servisi ile devre dışı kalan bot çok kısa sürede yeniden aktif biçimde hizmetini devam ettirir. \n\n Güvenlkte endişeniz olmasın! Thunar, gerekli bilgileri anoniminize biçimde saklar. 6 saatte bir güvenlik yama güncellemesi verilir \n\n Hey! Bir sorun mu var? Merak etme! Geliştiricim hızlı biçimde bu sorun çözüme kavuşturabilir. Eğer botla ilgili bir sorun varsa \`!hata\` yazarak sorunu bize bildirebilirsin. Bot devre dışı mı kaldı? O halde ***thunarfederation@proton.me*** mail adresimize mail atabilirsin. Mail atarken kullanıcı adınızı ve 4 haneli etiketinizi belirtmeyi unutmayın *(Örnek: Thunar#8719)*. Aksi takdirde gerekli yerlerde size ulaşmamız mümkün olmayacaktır`)
            .setImage("https://cdn.discordapp.com/attachments/836225187132473364/932295115073028106/1.gif")
        const temelbirimler = new Discord.MessageEmbed()
            .setTitle('Bot Temel Birimleri')
            .setDescription("Aşağıda botun temel birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:ayar:924661613993263104> Bot Birimleri`,
                    value: `>>> | **şartlar** \n Thunar'ın kullanıcı sözleşmesini gösteriri \n\n | **ek-birim** \n Botta bulunan birimlerin alternatif birimlerini gösterir \n\n | **toplambirim** \n Botta bulunan birim sayısını gösterir \n\n | **duyuru #kanal [mesaj]** \n Bota sunucunuzda etiketlidiğiniz kanala duyuru attırır \n\n | **kullanım [birim]** \n Botta bir birimun kullanılma şeklini bilmiyorsanız bu birimu kullanabilirsiniz \n\n | **davet** \n Botun Davet Linkini Verir \n\n | **ping** \n Botun gecikme süresini gösterir \n\n | **prefix [ayarla/sıfırla] [prefixiniz]** \n Botun sunucudaki önekini değiştirir \n\n | **öner [mesaj]** \n Bota bir öneri özelliğiniz mi var? Bu birimla geliştiriciye bildirebilirsiniz \n\n | **bildir [mesaj]** \n Bota bir hata mı gözlemlediniz? Bu birimla geliştiriciye bildirebilirsiniz \n\n | **istatistik** \n Botun istatistiklerini gösterir \n\n | **sistemler** \n Sunucunuzda Thunar tarafından işlenen sistemlerin durumunu gösterir \n\n | **güncellemeler** \n Botun güncelleme notlarını gösterir \n\n | **versiyon** \n Botun sürümünü gösterir`,
                    inline: false
                },
            )

            .setColor(renk)
            .setFooter(slogan)

        const botlist = new Discord.MessageEmbed()
            .setTitle('Thunar BotList')
            .setDescription("Aşağıda botlist birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:bot:1010936203501109258> Thunar BotList Üssü`,
                    value: `>>> | **bot-ekle [ID] [prefix] [DBL Onay Durumu]** \n Botlist sistemi aktifse bot eklemek için gerekli bilgilerin kaydını yapar \n\n | **bot-client [ayarla/sil] #kanal** \n Bot ekleme isteklelerinin geleceği kanalı ayarlar \n\n | **botlist [ayarla/sil] #kanal** \n Etiketlediğiniz kanalı botlist kanalı olarak atar \n\n | **botlist-bilgi [ayarla/sil] #kanal** \n Etiketlediğiniz kanalı botlist bekleme kanalı olarak atar`,
                    inline: false
                },
            )

            .setColor(renk)
            .setFooter(slogan)

        const codeshare = new Discord.MessageEmbed()
            .setTitle('Thunar Kod Paylaşım Üssü')
            .setDescription("Aşağıda Thunar kod paylaşım üssünün birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:code:1010937427097034873> Thunar Kod Paylaşım Üssü`,
                    value: `>>> | **telif** \n Yazılan kanala lisans bildirgesini gönderir \n\n | **cs-log [ayarla/sil] #kanal** \n Etiketlediğiniz kanal kod paylaşımı yapıldığında bildirim gönderilecek kanalı belirler \n\n | **newcode** \n Yeni bir kod paylaşacağınız zaman kullanırsınız`,
                    inline: false
                },
            )

            .setColor(renk)
            .setFooter(slogan)

        const ecoin = new Discord.MessageEmbed()
            .setTitle('Thunar Para Üssü')
            .setDescription("Aşağıda Thunar para üssünün birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:coinboru:937859718326652929> Thunar Para Üssü`,
                    value: `>>> | **coin @kullanıcı** \n Hesabınızda bulunan toplam Thunar Coin miktarını gösterir \n\n | **coin-hesap [isim]** \n Eğer yoksa isminize ait bir Thunar Coin hesabı açılır \n\n | **coin-ekle @kullanıcı [miktar]** \n Etiketlediğiniz kullanıcıya belirlediğiniz miktar kadar Thunar Coin yollar \n\n | **coin-sil @kullanıcı** \n Etiketlediğiniz kullanıcıdan belirlediğiniz miktar kadar Thunar Coin siler`,
                    inline: false
                },
            )

            .setColor(renk)
            .setFooter(slogan)

        const serverc = new Discord.MessageEmbed()
            .setTitle('Sunucu Kurma Üssü')
            .setDescription("Aşağıda botun sunucu kurma üssü birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:discord:932270643322441748> Sunucu Kurma Üssü`,
                    value: `>>> | **sunucu-kur-minimal** \n Minimal sunucu kurarsınız \n\n | **sunucu-kur-normal** \n Normal sunucu kurarsınız \n\n | **sunucu-kur-ultra** \n Gelişmiş sunucu kurarsınız`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const economy = new Discord.MessageEmbed()
            .setTitle('Ekonomi Üssü')
            .setDescription("Aşağıda botun ekonomi üssü birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:economy:1011753830746165279> Ekonomi Üssü`,
                    value: `>>> | **para-ver [@kullanıcı]** \n Belirtilen kullanıcıya Thunar tarafından para verilir. Sadece geliştirici kullanabilir \n\n | **cüzdan [@kullanıcı]** \n Cüzdanınızda bulunan para miktarını gösterir \n\n | **ödül** \n Günlük ücretsiz dağıtılan para ödülünüzü alırsınız \n\n | **balık** \n Balık avı ile para kazanırsınız. Kazandığınız miktar yakalanan nesneye göre değişir. 60 saniyede bir kullanılabilir \n\n | **av** \n Av ile para kazanırsınız. Kazandığınız miktar avlanan nesneye göre değişir. 60 saniyede bir kullanılabilir \n\n | **bağış [@kullanıcı] [miktar]** \n Etiketlenen kullanıcıya belirtilen miktarda karşılıksız bağış yapılır \n\n | **para-kes [@kullanıcı]** \n İstenilen kullanıcıdan Thunar tarafından para kesilir. Sadece geliştirici kullanabilir \n\n | **slot [miktar]** \n Belirttiğiniz miktar kadar bahis oynarsınız`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const funny = new Discord.MessageEmbed()
            .setTitle('Eğlence Birimleri')
            .setDescription("Aşağıda botun sahip olduğu eğlence birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:funny:932712172050604102> Eğlence`,
                    value: `>>> | **anime** \n Anime tarzında logo/yazı hazırlamanızı sağlar \n\n | **napim** \n birimu kullandığınızda rastgele dalga geçmek için sözler yazar \n\n | **boks** \n Boks makinesine vurmuş gibi rastgele sayılar söyler \n\n  | **cool** \n Havalı tarzda logo/yazı hazırlamanızı sağlar \n\n  | **ateş** \n Ateşli logo/yazı hazırlamanızı sağlar \n\n  | **ateş-logo** \n Ateş birimunun benzeridir \n\n  | **gold-logo** \n Altın tarzında logo hazırlar \n\n  | **google-logo** \n Google logosunu sizin yazdığınız metne uygun çevirir \n\n  | **çekiç @kullanıcı** \n Etiketlediğiniz kullanıcıya çekiç atar \n\n | **zar-at** \n Zar atmış gibi rastgele sayılar verir \n\n | **neon-logo** \n Neon tarzda logo hazırlatırsınız \n\n | **odun-logo** \n Odun tarzda logo hazırlatırsınız \n\n | **kurukafa-logo** \n Kurukafa logo hazırlatırsınız \n\n | **müzik video** \n Ses kanalında YouTube üzerinden video izlersiniz`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const log = new Discord.MessageEmbed()
            .setTitle('Log Ayarları')
            .setDescription("Aşağıda botun sahip olduğu log birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:log:933281800321658911> Log birimleri`,
                    value: `>>> | **otorol-log #kanal** \n Eğer aktifse sunucuya bir üye katıldığında ve rol verildiğinde log tutar \n\n | **otorollog-sil** \n Ayarlanmış otorol log kanalına bir daha log mesajı atmaz \n\n | **kayıt-log #kanal** \n Kayıt sisteminiz aktifse sunucuya giren kişilerin sunucuya nasıl kayıt olacaklarını öğreten bir mesaj atar \n\n | **ban-log #kanal** \n Bot aracılığıyla bir kullanıcı sunucudan yasaklandığında log kaydı tutar \n\n | **level** \n Level log kaydı atmaya yarar \n\n | **log-ayarla #kanal** \n Genel log kaydının tutulacağı kanalı belirler \n\n | **log-sil** \n Ayarlanmış log kaydına bir daha log kaydı atmaz \n\n | **referans-log #kanal** \n Referans sistemiyle kullanıcı sunucuya katılacaksa atılacak mesajın çıktı kanalını atar \n\n | **gç-log #kanal** \n Giriş Çıkış loglarının tutulacağı kanalı atar`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const memberset = new Discord.MessageEmbed()
            .setTitle('Kullanıcı Ayarları')
            .setDescription("Aşağıda kullanıcılarla ilgili birimlerin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:user:933282557896839218> Kullanıcı birimleri`,
                    value: `>>> | **kısalt** \n Girdiğiniz linki belirttiğiniz tipte kısaltır \n\n | **toplu-çek** \n ID'sini girdiğiniz ses kanalındaki tüm kullanıcıları sizin olduğunuz kanala çeker \n\n | **avatar @kullanıcı** \n Etiketlediğiniz kullanıcının profil resmini ve linkini verir \n\n | **banner @kullanıcı** \n Etiketlediğiniz kullanının varsa nitro ile eklenen afişini verir \n\n | **bağlantı @kullanıcı** \n Etiketlediğiniz kullanıcın aktifliğini gösterir \n\n | **çekiliş** \n Sunucunuzda hızlı bir çekiliş yapar \n\n | **ban-sorgula [ID]** \n ID'sini girdiğiniz kullanıcın neden sunucuda banlandığını sorgularsınız \n\n | **davet-sırası** \n Sunucunuzdaki davet oluşturanları ve davetlerin kaç kez kullanıldığını gösterir \n\n | **level** \n Thunar Seviye sisteminde kastığınız rank seviyesini gösterir \n\n | **yetkilerim** \n Yetkilerinizi listeler \n\n | **kas** \n Kullanıcı adlarını sıfırlar. Kısaltmadır \n\n | **durum @kullanıcı** \n Etiketlediğiniz kullanıcının hangi modda atkif olduğunu gösterir`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const moderation = new Discord.MessageEmbed()
            .setTitle('Moderasyon birimleri')
            .setDescription("Aşağıda botun sahip olduğu moderasyon birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:moderation:933281661527949373> Moderasyon birimleri`,
                    value: `>>> | **uyarı [ekle/sil/bilgi] @kullanıcı** \n Uyarı sistemidir \n\n | **rolver @kullanıcı @rol** \n Etiketlediğiniz kullanıcıya etiketlediğiniz rolü verir \n\n | **rolal @kullanıcı @rol** \n Etiketlediğiniz kullanıcıdan etiketlediğiniz rolü alır \n\n | **otorol ayarla @rol / otorol sil** \n Otorol ayarlamanızı sağlar \n\n | **bot-otorol ayarla @rol / bot-otorol sil** \n Botlara özel otorol ayarlamanızı sağlar \n\n | **yaş @kullanıcı [isim] [yaş]** \n Etiketlediğiniz kullanıcıyı isim ve yaş olarak sunucuda görünen ismini değiştirir \n\n | **ban @kullanıcı / unban [ID]** \n Etiketlediğiniz kullanıcıyı yasaklarsınız veya yasağını kaldırırsınız \n\n | **at @kullanıcı** \n Etiketlediğiniz kullanıcıyı sunucudan atarsınız \n\n | **sustur @kullanıcı [süre]** \n Etiketlediğiniz kullanıcıyı belirlediğiniz süre boyunca susturur`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const security = new Discord.MessageEmbed()
            .setTitle('Güvenlik birimleri')
            .setDescription("Aşağıda botun sahip olduğu moderasyon birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:security:933281753806815263> Güvenlik birimleri`,
                    value: `>>> | **reklam-engelle aç / kapat** \n Sunucunuzda link engellemeyi açar veya kapatır \n\n | **anti-spam aç / kapat** \n Anti-Spam sistemini açar veya kapatır \n\n | **bot-ban [aç/kapat]** \n Sunucuya bot eklenince otomatik banlar \n\n | **şüpheli-üye-log [ayarla/sil] #kanal** \n Şüpheli olarak işaretlenen kullanıcıların logunu düşürecek kanalı belirler \n\n | **şüpheli-üye-rol [ayarla/sil] @rol** \n Şüpheli olarak işaretlenen kullanıcılara verilecek rolü belirler \n\n | **radar #kanal** \n Yeni giren üyelerin test edileceği kanalı ayarlar. Kanal ayarlandığında sistem otomatik olarak aktifleşir \n\n | **referans @kullanıcı** \n Etiketlediğiniz kullanıcıyı sunucuya almak için refearans olursunuz \n\n | **sunucu-bilgi** \n Sunucu hakkında güvenlik bilgileri verir \n\n | **yavaş-mod [saniye]** \n birimi yazdığınız kanala gecikme ekler. Spam koruması gibidir \n\n | **küfür-engel [aç/kapat]** \n Küfür Engelleyiciyi açar ya da kapatır`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const server1 = new Discord.MessageEmbed()
            .setTitle('Sunucu birimleri')
            .setDescription("Aşağıda botun sahip olduğu sunucu birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:discord:932270643322441748> Sunucu birimleri`,
                    value: `>>> | **toplu-unban** \n Sunucunuzda ne kadar banlı kullanıcı varsa hepsinin banını aynı anda kaldırır \n\n | **oylama** \n Sunucunuzda çok seçenekli oylama yaparsınız \n\n | **banlist** \n Sunucunuzun yasaklı dokümanıni getirir \n\n | **nuke** \n Birimi yazdığınız kanalı sıfırlar \n\n | **sil [miktar]** \n Belirttiğiniz miktar kadar mesaj siler \n\n | **emojiler** \n Sunucunuzda bulunan emojileri listeler \n\n | **emojiyükle [resimlink] [emoji ismi]** \n Sunucunuza emoji yüklersiniz \n\n | **levels [aç/kapat]** \n Level sistemini açmanıza veya kapatmanıza yarar \n\n | **fky [ayarla/sil] #kanal** \n Fikir veya öneri kanalı ayarla \n\n | **partner [ayarla/sil] #kanal** \n Partner kanalınızı ayarlar \n\n | **s-davet** \n Sunucunuza özel davet linki oluşturur \n\n | **davet-listesi** \n Sunucudaki davet istatistiklerini görüntüler`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const server2 = new Discord.MessageEmbed()
            .setTitle('Sunucu birimleri #2')
            .setDescription("Aşağıda botun sahip olduğu sunucu birimlerinin ikinci bölümünün bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:discord:932270643322441748> Sunucu birimleri`,
                    value: `>>> | **roller** \n Sunucudaki rolleri gösterir \n\n | **sunucu-resmi** \n Sunucunuzun fotoğrafını gösterir \n\n | **sunucu** \n Sunucu bilgilerini basitçe gösterir \n\n | **snipe** \n Belirttiğiniz miktar kadar silinen mesajı gösterir \n\n | **özel-kanal** \n Sunucunuzda özel kanal işlemleri yapar \n\n | **özel [ayarla/sil] [komut ismi]** \n Sunucunuza özel komut oluşturur \n\n | **oy** \n Sunucuyu oylar \n\n | **onayoy** \n Sunucu oylama doğrulama kodunu onaylatır`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const ticket = new Discord.MessageEmbed()
            .setTitle('Bilet Üssü')
            .setDescription("Aşağıda botun sahip olduğu bilet birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:ticketem:1011221423987097600> Bilet birimleri`,
                    value: `>>> | **ekle [ID]** \n Destek bileti kanalına ID'si girilen bir üyeyi ekler \n\n | **kapat** \n Destek bileti görüşmesi sonlandırılır \n\n | **sil** \n Destek bileti silinir \n\n | **aç** \n Destek biletini yeniden açar \n\n | **kaldır [ID]/[@kullanıcı]** \n ID'si girilen kullanıcı yahut etiketlenen kullanıcı destek bileti görüşmesinden kaldırılır \n\n | **bilet** \n Bir destek bileti oluşturulur \n\n | **notlar** \n Destek konuşmasında geçen tüm konuşmalar bir yazılı doküman biçiminde verilir`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const loginsystem = new Discord.MessageEmbed()
            .setTitle('Kayıt Sistemi')
            .setDescription("Aşağıda botun sahip olduğu Kayıt birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `Kayıt Sistemi birimleri`,
                    value: `>>> \n\n <:login:933281838942781470> **NORMAL KAYIT SİSTEMİ** \n\n | **kayıt-rol @rol** \n Normal kayıt sistemi için kayıt rolü ayarlarsınız \n\n | **kayıt [isim] [yaş]** \n Normal kayıt sistemi ile kayıt olursunuz \n\n\n\n <:login:933281838942781470> **GELİŞMİŞ KAYIT SİSTEMİ** \n\n | **erkek-rol @rol** \n Gelişmiş kayıt sistemi için erkek rolü ayarlarsınız \n\n | **kadın-rol @rol** \n Gelişmiş kayıt sistemi için kadın rolü ayarlarsınız \n\n | **kayıt-ek [isim] [yaş]** \n Gelişmiş biçimde kayıt olursunuz. İsim ve yaş girildikten sonra erkek veya kadın rollerinden birini seçmeniz gerekir \n\n`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const verify = new Discord.MessageEmbed()
            .setTitle('Doğrulama Sistemi')
            .setDescription("Aşağıda botun sahip olduğu doğrulama birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:checked:932270169433202848> Doğrulama Sistemi birimleri`,
                    value: `>>> | **doğrula-rol** \n Doğrulama yapıldığında verilecek rolü ayarlar \n\n | **doğrula-kod** \n Doğrulama yapabilmeniz için kod oluşturur \n\n | **doğrulama-onay** \n Size verilen kodu bu birimla yazarak doğrulama işlemini tamamlarsınız \n\n | **doğrulama-özel** \n Doğrulama kodunu özelden alırsınız \n\n | **onay** \n Özelden gelen doğrulama kodunu bu birimla yazarsanız doğrulama işlemini tamamlarsınız`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const development = new Discord.MessageEmbed()
            .setTitle('Gelişmiş Birimler')
            .setDescription("Aşağıda botun sahip olduğu gelişmiş birimlerinin bir dokümanı bulunmaktadır.")
            .addFields(
                {
                    name: `<:developed:933445438835683358> Gelişmiş Birimler`,
                    value: `>>> | **açılmayan-ban** \n Bu birimla üye yasakladığınızda unban birimu işe yaramaz. Sunucu ayarlarından kaldırılan yasak işe yaramaz. Bu birimun içinde bulunan unban birimu ile yasak kaldırılmalıdır \n\n | **hesapla** \n Size hesap makinesi sunar var her türlü işlemi yapabilirsiniz \n\n | **döviz** \n Gerçek zamanlı döviz kurlarını gösterir \n\n | **oy-kick** \n Oylama kararıyla kullanıcı atılır \n\n | **cinsiyet-kayıt** \n Erkek - Kadın biçiminde rol seçerek kayıt olursunuz`,
                    inline: false
                },
            )
            .setColor(renk)
            .setFooter(slogan)

        const uptime = moment.duration(client.uptime).format("D [gün],  H [saat], m [dakika], s [saniye]")
        let staticks = new Discord.MessageEmbed()
            .setAuthor(`Bot İstatistikleri`, client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Bot İstatistikleri Aşağıda Yazmaktadır`)
            .setThumbnail(client.user.displayAvatarURL({dynmaic: true}))
            .addFields(
                {name: ":heartbeat: | Ping Durumu'", value: client.ws.ping + 'ms', inline: true},

                {
                    name: "<:thunar:1004478039905808445> | Mesaj Gecikme Süresi",
                    value: `${Math.floor(message.createdAt - message.createdAt)} ms`,
                    inline: true
                },

                {
                    name: ":man_frowning: | Kullanıcı Sayısı",
                    value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                    inline: true
                },

                {name: "<:nodejs:932270582156910642> | Node Sürümü", value: `${process.version}`, inline: true},

                {name: ":man_frowning: | Kullanıcı Sayısı", value: `${client.users.cache.size}`, inline: true},

                {name: "<:thunar:1004478039905808445> Çalışma Durumu", value: uptime, inline: true}
            )
            .setColor(renk)
            .setFooter(slogan)
        let user = client.users.cache.get("849811561315827722");
        let developer = new Discord.MessageEmbed()
            .setAuthor(`Geliştirici Bilgileri`)
            .addFields(
                {name: `>>> Bot Sahibi ve Geliştiricisi:`, value: `[BUG](https://discord.com/users/801006452416184330/)`, inline: false},
                {
                    name: "> Linkler",
                    value: "<:github:932270128027025408> | BUG GitHub \n [Geliştiricimin GitHub Sayfası](https://www.github.com/ToxygenCode/) \n\n <:discord:932270643322441748> | Kardeş Sunucular \n [SoftwareStellar's](https://discord.gg/mPxsbpv7ZA) \n\n <:thunar:1004478039905808445> | Thunar Destek Sunucusu \n [Thunar Federasyonu](https://discord.gg/qgYhfW93FC)"
                }
            )
            .setColor(renk)
            .setFooter(slogan)

        let versioninf = new Discord.MessageEmbed()
            .setAuthor(`Thunar Sürüm Bilgisi`)
            .addFields(
                {name: `Sürüm : `, value: `***${version}***`, inline: false},
                {name: "Sürüm Kod Adı : ", value: `***${version_name}***`},
                {name: "Güncelleme Notları : ", value: "Bu Özellik **Alpha v0.6** Güncellemesi İle `!güncellemeler` birimine taşınmıştır"}
            )
            .setColor(renk)
            .setFooter(slogan)

        let msg = await message.channel.send({embed: hakkinda, component: menu})

        const filter = (menu) => menu.clicker.user.id === message.author.id; //Kullanıcı filtresi (Sadece Yazar)
        const collector = message.createMenuCollector(filter);
        client.on("clickMenu", menu => {
            if (menu.clicker.id !== message.author.id) return;
            menu.reply.defer();
            if (menu.values[0] === '1') {
                msg.edit({
                    embed: hakkinda,
                })
            }
            if (menu.values[0] === '2') {
                msg.edit({
                    embed: temelbirimler,
                })
            }
            if (menu.values[0] === '3') {
                msg.edit({
                    embed: botlist,
                })
            }

            if (menu.values[0] === '4') {
                msg.edit({
                    embed: codeshare,
                })
            }

            if (menu.values[0] === '5') {
                msg.edit({
                    embed: ecoin,
                })
            }
            if (menu.values[0] === '6') {
                msg.edit({
                    embed: serverc,
                })
            }
            if (menu.values[0] === '7') {
                msg.edit({
                    embed: economy,
                })
            }
            if (menu.values[0] === '8') {
                msg.edit({
                    embed: funny,
                })
            }
            if (menu.values[0] === '9') {
                msg.edit({
                    embed: log,
                })
            }
            if (menu.values[0] === '10') {
                msg.edit({
                    embed: memberset,
                })
            }
            if (menu.values[0] === '11') {
                msg.edit({
                    embed: moderation,
                })
            }
            if (menu.values[0] === '12') {
                msg.edit({
                    embed: security,
                })
            }
            if (menu.values[0] === '13') {
                msg.edit({
                    embed: server1,
                })
            }
            if (menu.values[0] === '14') {
                msg.edit({
                    embed: server2,
                })
            }
            if (menu.values[0] === '15') {
                msg.edit({
                    embed: ticket,
                })
            }
            if (menu.values[0] === '16') {
                msg.edit({
                    embed: loginsystem,
                })
            }
            if (menu.values[0] === '17') {
                msg.edit({
                    embed: verify,
                })
            }
            if (menu.values[0] === "18") {
                msg.edit({
                    embed: development
                })
            }
            if (menu.values[0] === "19") {
                msg.edit({
                    embed: staticks
                })
            }
            if (menu.values[0] === "20") {
                msg.edit({
                    embed: developer
                })
            }
            if (menu.values[0] === '21') {
                msg.edit({
                    embed: versioninf,
                })
            }
        })
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["help", "y", "h"],
    usage: 'Sadece birimun adını yazmanız yeterlidir',
    permLevel: 0
};

exports.help = {
    name: 'yardım',
    description: 'Yardım dokümanıni Gösterir',
    usage: '!yardım sa'
};