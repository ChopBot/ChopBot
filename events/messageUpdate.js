exports.run = async (client, msg) => {
    const newMessage = await msg.channel.fetchMessage(msg.id);
    
    if(msg.content === newMessage.content){
        return;
    }

    try {
        const editEmbed = new client.methods.Embed()
            .setAuthor(`#${msg.channel.name}`, msg.guild.avatarURL())
            .setColor("#4286f4")
            .setTitle("Message Edited")
            .addField("BEFORE", `${msg.edits[0]}`)
            .addField("AFTER", `${newMessage.content}`)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL());
        return client.channels.get(msg.guild.settings.logChannel).send('', { disableEveryone: true, embed: editEmbed });
    } catch (err) {
        return client.emit("log", err, "error");
    }
};
