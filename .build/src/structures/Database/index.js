var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  Database: () => Database
});
var import_mongoose = __toModule(require("mongoose"));
var import_chalk = __toModule(require("chalk"));
import_mongoose.default.set("strictQuery", true);
class Database {
  client;
  constructor(client) {
    this.client = client;
  }
  async start() {
    try {
      const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };
      await import_mongoose.default.connect(process.env.MONGODB, mongooseOptions);
      console.log(import_chalk.default.white.bold("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501[ Database ]"));
      console.log(`${import_chalk.default.whiteBright.bold(`[ ${import_chalk.default.blueBright.bold("Mongoose")} ]`)} Status: ${import_chalk.default.greenBright.bold("loaded")}`);
    } catch (err) {
      console.log(`Vixi deu erro na mongoDB
${err}`);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Database
});
//# sourceMappingURL=index.js.map
