const fs = require("fs");

const skip = "index.js";

const files = fs.readdirSync(__dirname);

/**
 * this expression will auto deploy all the routes in this path
 */
module.exports = (app) =>
  files.map((file) => file !== skip && require(`./${file}`)(app));
