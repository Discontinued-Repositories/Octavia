import { ContextMenuCommandInteraction, ApplicationCommandData } from "discord.js";
import { Noelly } from "../Client";

interface runOptions {
  client: Noelly;
  interaction: ContextMenuCommandInteraction
}

type Run = (options: runOptions) => any

export type ContextCommandType = {
  directory?: string
  /** Command configuration */
  config?: {
    /** Developer Command */
    developer?: boolean
    /** NSFW channel only command */
    nsfw?: boolean
    /** Server owner only command */
    owner?: boolean
  }
  /** Running the command */
  run: Run
} & ApplicationCommandData