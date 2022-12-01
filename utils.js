const fs = require("fs");

const readFile = (file) =>
  fs.readFileSync(file, {
    encoding: "utf8",
    flag: "r",
  });

const sum = (arr) => arr.reduce((acc, item) => acc + item, 0);

module.exports = {
  readFile,
  sum,
};
