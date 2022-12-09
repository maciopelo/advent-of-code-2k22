const { readFile, shape } = require("../utils");

const data = readFile("data.txt");

const trees = data.split("\n").map((row) => row.split(""));
const [ROWS, COLS] = shape(trees);

const checkIfTreeVisible = (row, col, trees) => {
  const tree = trees[row][col];
  const compass = {
    n: true,
    e: true,
    s: true,
    w: true,
  };

  //check along left and right
  for (let c = 0; c < COLS; c++) {
    const otherTree = trees[row][c];
    if (c < col && otherTree >= tree) {
      compass.w = false;
    } else if (c > col && otherTree >= tree) {
      compass.e = false;
    }
  }

  //check along top and bottom
  for (let r = 0; r < ROWS; r++) {
    const otherTree = trees[r][col];
    if (r < row && otherTree >= tree) {
      compass.n = false;
    } else if (r > row && otherTree >= tree) {
      compass.s = false;
    }
  }

  return Object.values(compass).some((v) => v);
};

////////////////
// first part //
////////////////
let sumOfVisible = 2 * ROWS + 2 * COLS - 4;
for (let r = 1; r < ROWS - 1; r++) {
  for (let c = 1; c < COLS - 1; c++) {
    sumOfVisible += checkIfTreeVisible(r, c, trees) ? 1 : 0;
  }
}
// console.log(sumOfVisible);

/////////////////
// second part //
/////////////////
const calculateTreeScore = (row, col, trees) => {
  const tree = trees[row][col];
  const compass = {
    n: { count: 0, stop: false },
    e: { count: 0, stop: false },
    s: { count: 0, stop: false },
    w: { count: 0, stop: false },
  };

  //check along left and right
  for (let c = 0; c < COLS; c++) {
    if (c < col) {
      const leftTree = trees[row][col - c - 1];

      if (!compass.w.stop) {
        compass.w.count += 1;
        if (tree <= leftTree) {
          compass.w.stop = true;
        }
      }
    } else if (c > col) {
      const righTree = trees[row][c];

      if (!compass.e.stop) {
        compass.e.count += 1;
        if (tree <= righTree) {
          compass.e.stop = true;
        }
      }
    }
  }

  //check along left and right
  for (let r = 0; r < ROWS; r++) {
    if (r < row) {
      const upTree = trees[row - r - 1][col];

      if (!compass.n.stop) {
        compass.n.count += 1;
        if (tree <= upTree) {
          compass.n.stop = true;
        }
      }
    } else if (r > row) {
      const downTree = trees[r][col];

      if (!compass.s.stop) {
        compass.s.count += 1;
        if (tree <= downTree) {
          compass.s.stop = true;
        }
      }
    }
  }

  return Object.values(compass).reduce(
    (acc, direction) => acc * direction.count,
    1
  );
};

let highestScore = 0;
for (let r = 1; r < ROWS - 1; r++) {
  for (let c = 1; c < COLS - 1; c++) {
    const treeScore = calculateTreeScore(r, c, trees);
    if (treeScore > highestScore) {
      highestScore = treeScore;
    }
  }
}
// console.log(highestScore);
