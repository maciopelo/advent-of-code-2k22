const { readFile, sum } = require("../utils");

const data = readFile("data.txt");

// first half
const elves = data.split("\n\n").map((elf) => elf.split("\n"));

const summedCaloriesOfElves = elves.map((elf) => {
  const sumOfCalories = elf.reduce((acc, calorie) => acc + +calorie, 0);
  return sumOfCalories;
});

const max = Math.max(...summedCaloriesOfElves);
console.log(max);

// second half
summedCaloriesOfElves.sort((a, b) => a - b);
const maxThree = summedCaloriesOfElves.slice(-3);
console.log(sum(maxThree));
