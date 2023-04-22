import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: ".",
    exec: async ({ interaction, client }) => {
        interaction.reply({
            content: `${client.ws.ping}`
        })
    }
});