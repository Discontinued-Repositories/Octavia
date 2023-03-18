import { CommandBuilder } from "../../structures/Classes/Command";
import { EmbedBuilder } from "discord.js";

export default new CommandBuilder({
  name: "ping",
  description: "Shows Bot Latency Ping",
  run({ client, message }) {
    message.reply({ content: "slacaralho", })
  },
})