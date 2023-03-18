var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  newClient: () => newClient
});
var import_discord = __toModule(require("discord.js"));
var import_botConfig = __toModule(require("./Config/botConfig"));
var import_link = __toModule(require("../webserver/link.ts"));
var import_glob = __toModule(require("glob"));
var import_chalk = __toModule(require("chalk"));
var import_util = __toModule(require("util"));
var import_Database = __toModule(require("./Database/index"));
let globPromise = (0, import_util.promisify)(import_glob.glob);
class newClient extends import_discord.Client {
  commands = new import_discord.Collection();
  aliases = new import_discord.Collection();
  slashCommands = new import_discord.Collection();
  config = import_botConfig.botConfig;
  constructor() {
    super({
      intents: [
        "DirectMessages",
        "GuildMembers",
        "GuildMessages",
        "GuildPresences",
        "Guilds",
        "MessageContent"
      ]
    });
  }
  async start() {
    console.clear();
    const database = new import_Database.Database(this);
    await database.start();
    this.login(process.env.TOKEN);
    this.loadFiles();
  }
  async registerCommands({ commands, guild }) {
    var _a;
    console.log(import_chalk.default.white.bold("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501[ Client ]"));
    if (guild) {
      let server = this.guilds.cache.get(guild);
      await (server == null ? void 0 : server.commands.set(commands));
      console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Client")} ]`)} Loaded to: ${import_chalk.default.greenBright.bold(`${server.name}`)}`);
    } else {
      (_a = this == null ? void 0 : this.application) == null ? void 0 : _a.commands.set(commands);
      console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Client")} ]`)} Loaded to: ${import_chalk.default.greenBright.bold("All")}`);
    }
  }
  async importFile(filePath) {
    var _a;
    return (_a = await import(filePath)) == null ? void 0 : _a.default;
  }
  async loadFiles() {
    let arrayCommands = [];
    let LegacyCommandFiles = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);
    console.log(import_chalk.default.white.bold("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501[ Legacy Commands ]"));
    if (LegacyCommandFiles.length == 0)
      console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Legacy Commands")} ]`)} Loaded: ${import_chalk.default.redBright.bold(`None Loaded`)}`);
    LegacyCommandFiles.forEach(async (filePath) => {
      let file = await this.importFile(filePath);
      let splitted = filePath.split("/");
      let directory = splitted[splitted.length - 2];
      if (!(file == null ? void 0 : file.name))
        console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Legacy Commands")} ]`)} Loaded: ${import_chalk.default.redBright.bold("No Name")}`);
      if (file.name) {
        let properties = __spreadProps(__spreadValues({}, file), { directory });
        this.commands.set(file.name, properties);
        console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Legacy Commands")} ]`)} Loaded: ${import_chalk.default.greenBright.bold(`${file.name}`)}`);
      }
      if (file.aliases) {
        file.aliases.forEach((alias) => this.aliases.set(alias, file.name));
      }
    });
    let SlashCommandFiles = await globPromise(`${__dirname}/../interactions/**/*{.ts,.js}`);
    console.log(import_chalk.default.white.bold("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501[ Slash Commands ]"));
    if (SlashCommandFiles.length == 0)
      console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Slash Commands")} ]`)} Loaded: ${import_chalk.default.redBright.bold(`None Loaded`)}`);
    SlashCommandFiles.forEach(async (filePath) => {
      let file = await this.importFile(filePath);
      let splitted = filePath.split("/");
      let directory = splitted[splitted.length - 2];
      if (!(file == null ? void 0 : file.name))
        console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Legacy Commands")} ]`)} Loaded: ${import_chalk.default.redBright.bold("No Name")}`);
      if (file.name) {
        let properties = __spreadProps(__spreadValues({}, file), { directory });
        this.slashCommands.set(file.name, properties);
        arrayCommands.push(file);
        console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Slash Commands")} ]`)} Loaded: ${import_chalk.default.greenBright.bold(`${file.name}`)}`);
      }
    });
    this.on("ready", async () => {
      await this.registerCommands({
        commands: arrayCommands
      });
    });
    let EventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
    console.log(import_chalk.default.white.bold("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501[ Events ]"));
    if (EventFiles.length == 0)
      console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Events")} ]`)} Loaded: ${import_chalk.default.redBright.bold(`None Loaded`)}`);
    EventFiles.forEach(async (filePath) => {
      let file = await this.importFile(filePath);
      if (file == null ? void 0 : file.options.name) {
        if (file.options.once) {
          this.once(file.options.name, file.options.run.bind(null, this));
        } else {
          this.on(file.options.name, file.options.run.bind(null, this));
        }
        console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Events")} ]`)} Loaded: ${import_chalk.default.greenBright.bold(`${file.options.name}`)}`);
      } else {
        await this.importFile(filePath);
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  newClient
});
//# sourceMappingURL=Client.js.map
