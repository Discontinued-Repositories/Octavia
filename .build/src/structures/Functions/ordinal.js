var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  ordinal: () => ordinal
});
function ordinal(number) {
  const string = {
    1: "st",
    2: "nd",
    3: "rd"
  };
  return `${number}${string[number % 10] ? string[number % 10] : "th"}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ordinal
});
//# sourceMappingURL=ordinal.js.map
