import { ChannelType, EmbedBuilder } from "discord.js";
import { Event } from "../../structures/Classes/Event";

export default new Event({
  name: "messageCreate",
  run(client, message) {
    if (message.author.bot || !message.guild) return;

    if (!message.content.toLowerCase().startsWith(client.config.prefix)) return;

    let [cmd, ...args] = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    let command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.get(client.aliases.get(cmd.toLowerCase()));
    
    if (!command) return
    command.run({ args, client, message })
  },
});
