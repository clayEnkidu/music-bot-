const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "resume",
    description: "To Resume The Paused Music.",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("RANDOM")
      .setAuthor("Resume!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setFooter(`Resumed By: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      return message.channel.send(xd);
    }
    return sendError(`There Is Nothing Playing In This Server!\n Use \`${client.config.prefix}play [songname]\` To Play A Song.`, message.channel);
  },
};
