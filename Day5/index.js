const { readFile, sum } = require("../utils");

// test data
//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3
// const stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];

//             [M] [S] [S]
//         [M] [N] [L] [T] [Q]
// [G]     [P] [C] [F] [G] [T]
// [B]     [J] [D] [P] [V] [F] [F]
// [D]     [D] [G] [C] [Z] [H] [B] [G]
// [C] [G] [Q] [L] [N] [D] [M] [D] [Q]
// [P] [V] [S] [S] [B] [B] [Z] [M] [C]
// [R] [H] [N] [P] [J] [Q] [B] [C] [F]
//  1   2   3   4   5   6   7   8   9

const stacks = [
  ["R", "P", "C", "D", "B", "G"],
  ["H", "V", "G"],
  ["N", "S", "Q", "D", "J", "P", "M"],
  ["P", "S", "L", "G", "D", "C", "N", "M"],
  ["J", "B", "N", "C", "P", "F", "L", "S"],
  ["Q", "B", "D", "Z", "V", "G", "T", "S"],
  ["B", "Z", "M", "H", "F", "T", "Q"],
  ["C", "M", "D", "B", "F"],
  ["F", "C", "Q", "G"],
];

const data = readFile("data.txt");
const moves = data.split("\n");

////////////////
// first part //
////////////////

for (const move of moves) {
  const [, howMany, , fromStack, , toStack] = move.split(" ");
  const crates = stacks[fromStack - 1];
  for (let i = 0; i < howMany; i++) {
    stacks[toStack - 1].push(crates.pop());
  }
}
for (const stack of stacks) {
  console.log(stack[stack.length - 1]);
}

/////////////////
// second part //
/////////////////

// for (const move of moves) {
//   const [, howMany, , fromStack, , toStack] = move.split(" ");
//   const crates = stacks[fromStack - 1];
//   const newCrates = crates.slice(-1 * howMany);
//   stacks[toStack - 1] = stacks[toStack - 1].concat(newCrates);
//   for (let i = 0; i < howMany; i++) {
//     crates.pop();
//   }
// }
// for (const stack of stacks) {
//   console.log(stack[stack.length - 1]);
// }
