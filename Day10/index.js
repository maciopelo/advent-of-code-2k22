const { readFile, sum } = require("../utils");

const data = readFile("data.txt");
const instructions = data.split("\n");

////////////////
// first part //
////////////////
// const NOOP = "noop";
// const cycles = [20, 60, 100, 140, 180, 220];
// const results = [];

// let cycle = 0;
// let X = 1;

// for (const instruction of instructions) {
//   const [program, arg] = instruction.split(" ");

//   if (program === NOOP) {
//     cycle += 1;

//     if (cycles.includes(cycle)) {
//       results.push(cycle * X);
//     }
//   } else {
//     // addx V
//     for (let c = 0; c < 2; c++) {
//       cycle += 1;

//       if (cycles.includes(cycle)) {
//         results.push(cycle * X);
//       }

//       if (c === 1) {
//         X += parseInt(arg);
//       }
//     }
//   }
// }

// console.log(cycle, sum(results));

/////////////////
// second part //
/////////////////
// const NOOP = "noop";
// const CRT = [
//   "........................................",
//   "........................................",
//   "........................................",
//   "........................................",
//   "........................................",
//   "........................................",
// ].map((item) => item.split(""));

// let sprite = 0; // column
// let cycle = 0;
// let X = 1;

// for (const instruction of instructions) {
//   const [program, arg] = instruction.split(" ");

//   if (program === NOOP) {
//     cycle += 1;
//     const row = Math.floor((cycle - 1) / 40);
//     const col = (cycle - 1) % 40;

//     if (sprite === col || sprite + 1 === col || sprite + 2 === col) {
//       CRT[row][col] = "#";
//     }
//   } else {
//     // addx V
//     for (let c = 0; c < 2; c++) {
//       cycle += 1;
//       const row = Math.floor((cycle - 1) / 40);
//       const col = (cycle - 1) % 40;

//       if (sprite === col || sprite + 1 === col || sprite + 2 === col) {
//         CRT[row][col] = "#";
//       }

//       if (c === 1) {
//         X += parseInt(arg);
//         sprite = X - 1;
//       }
//     }
//   }
// }

// for (const line of CRT) {
//   console.log(line.join(""));
// }
