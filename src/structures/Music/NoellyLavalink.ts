import type { TextChannel } from "discord.js";
import { Node, NodeOptions, Track, Vulkava } from "vulkava";
import { Noelly } from "../Client";
import chalk from "chalk";
const sleep = (ms: number): Promise<unknown> => new Promise(resolve => setTimeout(resolve, ms));

export class Manager extends Vulkava {
  client: Noelly;
  constructor(client: Noelly, nodes: NodeOptions[]) {
    super({
      nodes,
      sendWS: (guildId, payload) => client.guilds.cache.get(guildId)?.shard.send(payload)
    });
    this.client = client;

    this.on("nodeConnect", async(node: Node) => {
      console.log(chalk.white.bold("━━━━━━━━━━━━━━━━━━━━━[ Lavalink System ]"))
      console.log(`${chalk.whiteBright.bold(`[ ${chalk.blueBright.bold("Nodes")} ]`)} Connected to: ${chalk.greenBright.bold(`${node.options.id}`)}`)
      setInterval(() => {
        node.send({
          op: 'pong'
        });
      }, 45000);
    });
   this.on("nodeDisconnect", async(node: Node) => {
      console.log(`${chalk.whiteBright.bold(`[ ${chalk.blueBright.bold("Nodes")} ]`)} Was disconnected: ${chalk.greenBright.bold(`${node.options.id}`)}`)
    });
    
  }
  init() {
    super.start(this.client.user.id);
    this.client.on('raw', packet => this.handleVoiceUpdate(packet));
  }
}