import { Command } from "../../structures/Command";

export default new Command({
    name: "bot",
    description: "[ 🛌 Bot ] Informações minhas.",
    options: [
      {
        name: "botinfo",
        description: "[ 🛌 Bot ] Olhe minhas informações e muito mais.",
        type: 1
      }
    ],
    exec: async ({ interaction, client }) => {
      if(interaction.options.getSubcommand() === "botinfo") {
        interaction.reply("a")
      }
    }
});