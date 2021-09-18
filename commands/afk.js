const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const fs = require('fs');


module.exports = {
  info: {
    name: "afk",
    description: "If You Use This Commands The Bot Doesn't Leave The VC.",
    usage: "",
    aliases: ["24/7", "24-7"],
  },

  run: async function (client, message, args) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var serverQueue = afk[message.guild.id]
       if (serverQueue) {
            serverQueue.afk = !serverQueue.afk;
             message.channel.send({
                embed: {
                    color: "#303136",
                    description: `💤  **|**  AFK is **\`${serverQueue.afk === true ? "enabled" : "disabled"}\`**`
                }
            });
            return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if (err) console.error(err);
    });
        };
    return sendError("There Is Nothing Playing In This Server!\nJoin THe Voice Channel And Play A Song Then Use This Command..", message.channel);
  },
};
