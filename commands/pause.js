const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "To Pause The Music.",
    usage: "",
    aliases: ["pause"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("RANDOM")
      .setTitle("Pause!")
      .setFooter(`Paused By: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      return message.channel.send(xd);
    }
    return sendError(`There Is Nothing Playing In This Server!\n Use \`${client.config.prefix}play [songname]\` To Play A Song.`, message.channel);
  },
};
