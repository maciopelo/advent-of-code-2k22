"use strict";
const { readFile } = require("../utils");

const CD = "cd";
const DIR = "dir";
const LS = "ls";
const BACK = "..";

const data = readFile("data.txt");
const commands = data.split("\n");

const getCurrPath = (nextDir, currPath = []) => {
  if (nextDir === BACK) {
    currPath.pop();
  } else {
    currPath.push(nextDir);
  }
  return currPath;
};
// klucze jako path /a/e/
const createFileSystemTree = (commands) => {
  let currPath;
  const fileSystem = {};

  for (const command of commands) {
    const [fst, snd, trd] = command.split(" ");

    switch (snd) {
      case CD:
        currPath = getCurrPath(trd, currPath);

        if (!fileSystem[currPath.join("/")]) {
          fileSystem[currPath.join("/")] = {
            files: [],
            children: [],
          };
        }
        break;
      case LS:
        break;
      default: // results of ls
        if (fst === DIR) {
          fileSystem[currPath.join("/")].children.push(snd);
        } else {
          fileSystem[currPath.join("/")].files.push({ size: fst, fname: snd });
        }
    }
  }

  return fileSystem;
};

const countTreeSize = (fileSystem, path = "/", sum = 0) => {
  for (const { size } of fileSystem[path].files) {
    sum += +size;
  }

  for (const dir of fileSystem[path].children) {
    sum = countTreeSize(fileSystem, `${path}/${dir}`, sum);
  }

  return sum;
};

////////////////
// first part //
////////////////
let resultSum = 0;
const fileSystem = createFileSystemTree(commands);

for (const path in fileSystem) {
  const dirSize = countTreeSize(fileSystem, path);
  if (dirSize <= 100000) {
    resultSum += dirSize;
  }
}
// console.log(resultSum);

////////////////
// second part //
////////////////
const AT_LEAST = 30_000_000;
const TOTAL = 48_381_165;
const FREE_SPACE = 70_000_000 - TOTAL;
const NEEDED_SPACE = AT_LEAST - FREE_SPACE;

const potetnialDir = {
  name: "/",
  size: TOTAL,
};
for (const path in fileSystem) {
  const dirSize = countTreeSize(fileSystem, path);
  if (dirSize - NEEDED_SPACE >= 0 && dirSize < potetnialDir.size) {
    potetnialDir.name = path;
    potetnialDir.size = dirSize;
  }
}
// console.log(potetnialDir);
