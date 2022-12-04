const { readFile, sum } = require("../utils");

const data = readFile("data.txt");

// first half
const pairs = data.split("\n");
const sumOfWorkers = pairs.reduce((acc, pair) => {
  const [first, second] = pair.split(",");
  const [a, b] = first.split("-");
  const [c, d] = second.split("-");

  return (c - a >= 0 && b - d >= 0) || (c - a <= 0 && b - d <= 0)
    ? acc + 1
    : acc;
}, 0);
// console.log(sumOfWorkers);

// second half
const sumOfWorkers2 = pairs.reduce((acc, pair) => {
  const [first, second] = pair.split(",");
  const [a, b] = first.split("-");
  const [c, d] = second.split("-");

  return (+a <= +c && +c <= +b) || (+c <= +a && +a <= +d) ? acc + 1 : acc;
}, 0);
// console.log(sumOfWorkers2);
