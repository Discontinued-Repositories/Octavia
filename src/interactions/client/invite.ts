import { SlashCommandBuilder } from "../../structures/Classes/SlashCommand";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new SlashCommandBuilder({
  name: "invite",
  description: "Add me on your server!",
  run({ client, interaction }) {
    const button = new ButtonBuilder().setLabel("Me Adicione").setStyle(ButtonStyle.Link).setURL("https://discord.com/")
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button])
    return interaction.reply({ content: "aoha", components: [row] })
  },
})