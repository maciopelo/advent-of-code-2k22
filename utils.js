const fs = require("fs");

const readFile = (file) =>
  fs.readFileSync(file, {
    encoding: "utf8",
    flag: "r",
  });

const sum = (arr) => arr.reduce((acc, item) => acc + item, 0);

const shape = (arr) => [arr.length, arr[0].length];

const array2D = (rows, cols, item) =>
  [...Array(rows).keys()].map((_) =>
    [...Array(cols).keys()].map((_) => new item())
  );

module.exports = {
  readFile,
  sum,
  shape,
  array2D,
};
