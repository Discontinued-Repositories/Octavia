import { ActivityType, ApplicationCommandDataResolvable, Client as DiscordClient, ClientEvents, Collection, GatewayIntentBits, Options } from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import { Event } from "./Event";
import { client } from "..";
import { CommandType } from './Command';
import { Logger } from "./Logger";
import { Database } from "../../database/index";
const globPromise = promisify(glob);

export class Octavia extends DiscordClient {
  public commands: Collection<string, CommandType>;
  public logger: Logger;
  constructor() {
    super(
      {
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent],
        allowedMentions: {
          parse: ['users'],
          repliedUser: false
        }
      }
    );
    this.commands = new Collection()
    this.logger = new Logger()
  }

  async loadCommands() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);

        commandFiles.forEach(async file => {
            const command: CommandType = await this.importFile(file);
            if (!command.name) return;
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on('ready', () => {
            client.application.commands.set(slashCommands)
        })
    }

    async loadEvents() {
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async file => {
            const event: Event<keyof ClientEvents> = await this.importFile(file);
            this.on(event.name, event.exec);
        });
    }
  
  async importFile(file: string) {
    return (await import(file))?.default;
  }

  async start() {
    const database = new Database(this);
    await database.start();
    this.registerModules();
    await this.login(process.env.BOT_TOKEN);
  }

  registerModules() {
    this.loadCommands();
    this.loadEvents();
  }
}