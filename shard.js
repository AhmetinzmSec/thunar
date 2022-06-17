const { ShardingManager } = require('discord.js');
const {prefix, official_ahmetinzm, token} = require('./config.json');

const bumbe = new ShardingManager('./index.js', { //main dosyanızı yazın!
	totalShards: 2, //Auto yazılabilir veya farklı bir sayı yazabilirsiniz.
    token: token //Tokeninizi giriniz
});
bumbe.spawn();

bumbe.on('shardCreate', shard => {
    console.log(`Shard ${shard.id} başlatıldı!`);
});

//Discord.js v12 İçindir. 
