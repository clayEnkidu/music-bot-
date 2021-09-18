const { MessageEmbed, version: djsversion } = require("discord.js");
const { utc } = require('moment')
const cpuStat = require('cpu-stat')
const os = require('os')

module.exports = {
  info: {
    name: "botinfo",
    description: "To Get Info About This Bot.",
    usage: "",
    aliases: ["info", "binfo", "stats"],
  },

  run: async function (client, message, args) {

    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    cpuStat.usagePercent(function (error, percent, ) {
      if (error) {
        return;
      }

      const cores = os.cpus().length // Counting how many cores your hosting has.
      const cpuModel = os.cpus()[0].model // Your hosting CPU model.
      const speed = os.cpus()[0].speed // Your Processor Speed
      const cpuUsage = percent.toFixed(2) // Your CPU usage.
      const totalMem = formatBytes(process.memoryUsage().heapTotal) // Total Memory. 
      const memUsg = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.



    const embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setAuthor(`${client.user.username} Stats!`, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
      {
        name: '• __General Information__',
        value: `**Username** - ${client.user.username}#${client.user.discriminator}\n**Bot Id** - ${client.user.id}\n**Bot Developer - <@!587517896133967884>**\n**Websocket Ping** - ${client.ws.ping}ms\n**Uptime** - ${days}d ${hours}h ${minutes}m ${seconds}s\n**Creaton Date** - ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`
      },
      {
        name: '• Bot Library',
        value: 'Discord.js',
        inline: true
      },
      {
        name: 'Discord.js Version',
        value: `v${djsversion}`,
        inline: true
      },
      {
        name: '• NodeJS Version',
        value: process.version,
        inline: true
      },
    
      {
        name: "• __Note__",
        value: `**This Bot Is Only For This Server!**\n**If You Want A Music Bot Like This For Your Server Or If You Have Any Queries Related To This Bot Then DM <@!587517896133967884>.**`,
      }
    )
    .setFooter("Made With ❤️")

         message.channel.send(embed);
    })
    function formatBytes (a, b) {
      if (0 == a) return "0 Bytes";
      let c = 1024,
          d = b || 2,
          e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          f = Math.floor(Math.log(a) / Math.log(c));
      
      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    } // Create MB, KB, TB or something in the back of your memory counters.


  },
};
