const { readFile, sum } = require("../utils");

const data = readFile("data.txt");

const POINTS_MAP = { X: 0, Y: 1, Z: 2, A: 0, B: 1, C: 2 };

// first half
const GAME_RESULTS = [
  [3, 0, 6],
  [6, 3, 0],
  [0, 6, 3],
];

// possible results matrix
//      A  B  C  -->> oponent
//   0 [3, 1, 2],
//   1 [1, 2, 3],
//   2 [2, 3, 1],

const games = data
  .split("\n")
  .map((game) => game.replace(/[ABCXYZ]/g, (ch) => POINTS_MAP[ch]).split(" "));
const myResult = games.reduce((acc, [opponent, me]) => {
  const result = +GAME_RESULTS[me][opponent] + (+me + 1);
  return acc + result;
}, 0);

// console.log(myResult);

// second half
const GAME_RESULTS_2 = [
  [3, 1, 2],
  [1, 2, 3],
  [2, 3, 1],
];

// possible results matrix
//      A  B  C  -->> oponent
//   0 [3, 1, 2],
//   1 [1, 2, 3],
//   2 [2, 3, 1],

const games_2 = data
  .split("\n")
  .map((game) => game.replace(/[ABCXYZ]/g, (ch) => POINTS_MAP[ch]).split(" "));
const myResult_2 = games_2.reduce((acc, [opponent, me]) => {
  const result = +GAME_RESULTS_2[me][opponent] + me * 3;
  return acc + result;
}, 0);

console.log(myResult_2);
