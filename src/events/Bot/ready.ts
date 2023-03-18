import chalk from "chalk";
import { Event } from "../../structures/Classes/Event";

export default new Event({
  name: "ready",
  once: true,
  run(client) {
    console.log(`${chalk.whiteBright.bold(`[ ${chalk.blueBright.bold("Client")} ]`)} Logged in as: ${chalk.greenBright.bold(`${client.user.tag}`)}`)
  },
})