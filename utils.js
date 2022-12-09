const fs = require("fs");

const readFile = (file) =>
  fs.readFileSync(file, {
    encoding: "utf8",
    flag: "r",
  });

const sum = (arr) => arr.reduce((acc, item) => acc + item, 0);

const shape = (arr) => [arr.length, arr[0].length];

module.exports = {
  readFile,
  sum,
  shape,
};
