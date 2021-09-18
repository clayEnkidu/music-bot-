const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "To Show All The Commands Of This Bot.",
        usage: "[command]",
        aliases: ["commands", "cmds"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="`"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Commands of "+ client.user.username, "https://cdn2.scratch.mit.edu/get_image/gallery/29006159_170x100.png")
        .setColor("#303136")
        .setDescription(allcmds)
        .setFooter(`To get info of each command you can do ${client.config.prefix}help [command]`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Unknown Command")
            let commandinfo = new MessageEmbed()
            .setTitle("__Command: "+command.info.name+" info__")
            .setColor("#303136")
            .setDescription(`
**Name: ${command.info.name}**
**Description: ${command.info.description}**
**Usage:** \`${client.config.prefix}${command.info.name} ${command.info.usage}\`
**Aliases: ${command.info.aliases.join(", ")}**
`)
.setFooter('Made With ❤️ ')
            message.channel.send(commandinfo)
        }
    }
}
