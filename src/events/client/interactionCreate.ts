import { ChannelType, CommandInteractionOptionResolver, ContextMenuCommandInteraction, EmbedBuilder } from "discord.js";
import { Event } from "../../structures/Classes/Event";
import { ContextCommandType } from "../../structures/Types/ContextCommandType";
import { ExtendedInteraction, SlashCommandType } from "../../structures/Types/SlashCommandType";

export default new Event({
  name: "interactionCreate",
  run(client, interaction) {
    if (interaction.isChatInputCommand()) {
      let command = client.slashCommands.get(interaction.commandName) as SlashCommandType

      if (!command) {
        return;
      }
      command.run({ 
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtendedInteraction
      })
    }

    if (interaction.isContextMenuCommand()) {
      let command = client.slashCommands.get(interaction.commandName) as ContextCommandType

      command.run({
        client,
        interaction
      })
    }
  },
})