const { readFile, sum } = require("../utils");

const data = readFile("data.txt");

// first half
const rucksacks = data.split("\n");

const bothTypes = rucksacks.map((r) => {
  for (let i = 0; i < r.length / 2; i++) {
    const el1 = r[i];
    for (let j = r.length / 2; j < r.length; j++) {
      const el2 = r[j];
      if (el1 === el2) {
        return el1.toUpperCase() === el1
          ? el1.charCodeAt() - 38 // ascii upper case letter offset A-Z --> 65-90
          : el1.charCodeAt() - 96; // ascii lower case letter offset a-z --> 97-122
      }
    }
  }
});

const result = sum(bothTypes);
// console.log(result);

// second half
let secondResult = 0;
for (let i = 0; i < rucksacks.length; i++) {
  if (i % 3 === 0) {
    const countMap = [
      ...new Set(rucksacks[i].split("")),
      ...new Set(rucksacks[i + 1].split("")),
      ...new Set(rucksacks[i + 2].split("")),
    ].reduce((acc, letter) => {
      acc[letter] = ++acc[letter] || 1;
      if (acc[letter] === 3)
        secondResult +=
          letter.toUpperCase() === letter
            ? letter.charCodeAt() - 38
            : letter.charCodeAt() - 96;
      return acc;
    }, {});
  }
}
// console.log(secondResult);
