import { CommandInteractionOptionResolver, ChatInputCommandInteraction, ChatInputApplicationCommandData } from "discord.js";
import { Octavia } from "./Octavia";

interface ExecuteOptions {
    client: Octavia
    interaction: ChatInputCommandInteraction;
    args: CommandInteractionOptionResolver
}

export type CommandType = {
    exec: (opts: ExecuteOptions) => any;
} & ChatInputApplicationCommandData;

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}