const fs = require('fs')

class DB {

    constructor(){

    }

    /* 
    
    yaz => set
    db.set('prefix', 'lb')
    <DB>.yaz('prefix', 'lb')
    
    */

    set(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz")
        if (!değer) throw new TypeError("Değer Girmediniz")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] = değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 1))
    }

    /* 
    
    bul => fetch/get
    db.fetch('prefix')
    <DB>.bul('prefix')
    
    */

    fetch(veri){
        if (!veri) throw new TypeError("Veri Girmediniz")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        if (!dosya[veri]) throw new TypeError('Yazdığınız veri bulunamadı')
        return dosya[veri]
    }

    /* 
    
    kontrol => has
    db.has('prefix')
    <DB>.kontrol('prefix')
    
    */

    has(veri){
        if (!veri) throw new TypeError("Veri Girmediniz")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return dosya[veri] ? true : false
    }

    /* 
    
    sil => delete
    db.delete('prefix)
    <DB>.sil('prefix)
    
    */

    delete(veri){
        if (!veri) throw new TypeError("Veri Girmediniz")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        if (!dosya[veri]) throw new TypeError('Yazdığınız veri bulunamadı')
        delete dosya[veri]
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 1))
    }

    /* 
    
    yedekle => backup
    db.backup('veri.json')
    <DB>.yedekle('veri.json')
    
    */

    backup(dosyaAdı){
        if (!dosyaAdı) throw new TypeError("Dosya Adı Girmediniz")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return fs.writeFileSync(`${dosyaAdı}.json`, JSON.stringify(dosya, null, 1))
    }

    /* 
    
    topla => add
    db.add('puan', 5)
    <DB>.topla('puan', 5)
    
    */

    add(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz")
        if (typeof değer !== 'number') throw new TypeError("Değer olarak sayı giriniz")
        if(!this.kontrol(veri)) TypeError("Veri olarak girdiğiniz değer veritabanımda bulunmamaktadır")
        if (typeof this.bul(veri) !== 'number') throw new TypeError("Ekleyeceğiniz değer sayı olmalıdır")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] += değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 1))
    }

    /* 
    
    çıkar => substr
    db.substr('puan', 5)
    <DB>.çıkar('puan, 5)
    
    */

    substr(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz")
        if (typeof değer !== 'number') throw new TypeError("Değer olarak sayı giriniz")
        if(!this.kontrol(veri)) TypeError("Veri olarak girdiğiniz değer veritabanımda bulunmamaktadır")
        if (typeof this.bul(veri) !== 'number') throw new TypeError("Ekleyeceğiniz değer sayı olmalıdır")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] -= değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 1))
    }

    /* 
    
    sıfırla => -
    <DB>.sıfırla()
    
    */

    sıfırla(){
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return fs.writeFileSync('database.json', JSON.stringify({}, null, 1))
    }

}

module.exports = new DB()