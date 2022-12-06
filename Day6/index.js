const { readFile, sum } = require("../utils");

const buffer = readFile("data.txt");

const findMarker = (buffer, numOfDistinctChars) => {
  const _buffer = buffer.split("");
  for (let i = 0; i < _buffer.length; i++) {
    if (
      [...new Set(_buffer.slice(i, i + numOfDistinctChars))].length ===
      numOfDistinctChars
    ) {
      return i + numOfDistinctChars;
    }
  }
};

//first part
console.log(findMarker(buffer, 4));

//second part
console.log(findMarker(buffer, 14));
