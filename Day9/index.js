const { readFile } = require("../utils");
const data = readFile("data.txt");
const tmp = readFile("test.txt");
// console.log(tmp.split("\n").length, tmp.split("\n")[0].length);

const moves = data
  .split("\n")
  .map((move) => [move.split(" ")[0], +move.split(" ")[1]]);

const head = {
  row: 15,
  col: 11,
};

const tail = {
  row: 100,
  col: 100,
};

const rope = [
  {
    row: 0,
    col: 0,
  },
  {
    row: 0,
    col: 0,
  },
  {
    row: 0,
    col: 0,
  },
];

const getDistance = (head, tail) => {
  return Math.sqrt((head.row - tail.row) ** 2 + (head.col - tail.col) ** 2);
};

const moveHead = (head, direction) => {
  switch (direction) {
    case "U":
      head.row -= 1;
      break;
    case "R":
      head.col += 1;
      break;
    case "D":
      head.row += 1;
      break;
    case "L":
      head.col -= 1;
      break;
    default:
      break;
  }
};

const moveTail = (head, tail, direction) => {
  if (getDistance(head, tail) >= 2) {
    switch (direction) {
      case "U":
        tail.col = head.col;
        tail.row = head.row + 1;
        break;
      case "R":
        tail.row = head.row;
        tail.col = head.col - 1;
        break;
      case "D":
        tail.col = head.col;
        tail.row = head.row - 1;
        break;
      case "L":
        tail.row = head.row;
        tail.col = head.col + 1;
        break;
      default:
        break;
    }
  }
};

// const simulateRopeMove = (move, head, tail, fields) => {
//   const [direction, amount] = move;

//   for (let step = 0; step < amount; step++) {
//     moveHead(head, direction);
//     moveTail(head, tail, direction);
//     fields.add(`${tail.row}${tail.col}`);
//   }
// };

const moveRope = (rope, direction, fields) => {
  moveHead(rope[0], direction);

  for (let i = 0; i < rope.length - 1; i++) {
    moveTail(rope[i], rope[i + 1], direction);
  }
};

const simulateRopeMove = (move, rope, fields) => {
  const [direction, amount] = move;

  for (let step = 0; step < amount; step++) {
    moveRope(rope, direction, fields);
  }
};

const visitedFields = new Set();
for (const move of moves) {
  simulateRopeMove(move, rope, visitedFields);
}
console.log(rope);
// console.log(visitedFields.size);
