var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  progressBar: () => progressBar
});
function progressBar(currentProgress, maxProgress, size) {
  let barArray = [];
  let fill = Math.round(size * (currentProgress / maxProgress > 1 ? 1 : currentProgress / maxProgress));
  let empty = size - fill > 0 ? size - fill : 0;
  for (let i = 1; i <= fill; i++)
    barArray.push("\u25B0");
  for (let i = 1; i <= empty; i++)
    barArray.push("\u25B1");
  barArray[0] = barArray[0] == "\u25B0" ? "\u25B0" : "\u25B1";
  barArray[barArray.length - 1] = barArray[barArray.length - 1] == "\u25B0" ? "\u25B0" : "\u25B1";
  return barArray.join("");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  progressBar
});
//# sourceMappingURL=progressBar.js.map
