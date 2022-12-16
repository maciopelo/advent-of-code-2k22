const { readFile, sum } = require("../utils");
const Big = require("big-js");

const data = readFile("data.txt");

const MULTIPLY = "*";
const ADD = "+";

function mod(num, a) {
  let parsedNum = num;
  if (num.includes("+")) {
    const [number, numOfZeros] = num.split("e+");
    parsedNum = `${number.replace(".", "")}${"0".repeat(numOfZeros)}`;
  }

  let res = 0;

  for (let i = 0; i < parsedNum.length; i++) {
    res = (res * 10 + parseInt(parsedNum[i])) % a;
  }

  return res;
}

// lst - least common multiple
// gcd - greatest common divisor
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

class Monkey {
  constructor(id, items, operationObj, testObj, firstPart = true) {
    this.id = id;
    this.items = items;
    this.operationObj = operationObj;
    this.testObj = testObj;
    this.inspectedItems = 0;
    this.firstPart = firstPart;
  }

  addItem(item) {
    this.items.push(item);
  }

  clearItems() {
    this.items = [];
  }

  increaseInspectedItems() {
    this.inspectedItems += 1;
  }

  doOperation(val, lcd) {
    const item = isNaN(this.operationObj.value) ? val : this.operationObj.value;
    if (this.firstPart) {
      return this.operationObj.operator === ADD
        ? Math.floor((val + item) / 3)
        : Math.floor((val * item) / 3);
    }

    return this.operationObj.operator === ADD
      ? (val + item) % lcd
      : (val * item) % lcd;
  }

  inspectItems(monkeys, lcd) {
    for (const item of this.items) {
      const worryLevel = this.doOperation(item, lcd);
      this.increaseInspectedItems();

      const nextMonkeyId =
        worryLevel % this.testObj.divider === 0
          ? this.testObj.onTrue
          : this.testObj.onFalse;

      const nextMonkey = monkeys.find((m) => m.id === nextMonkeyId);

      nextMonkey.addItem(worryLevel);
    }
    this.clearItems();
  }
}

const generateMonkeys = (data, firstPart = true) => {
  const monkeys = data.split("\n\n");

  return monkeys.map((monkeyString) => {
    const [
      monkeyName,
      itemStr,
      operationStr,
      dividerStr,
      ifTrueStr,
      ifFalseStr,
    ] = monkeyString.split("\n");
    const id = +monkeyName.slice(-2, -1);
    const items = itemStr
      .slice(" Starting items: ".length)
      .split(",")
      .map((n) => +n);

    const operationObj = {
      operator: operationStr.includes(MULTIPLY) ? MULTIPLY : ADD,
      value: +operationStr.slice(-2),
    };

    const testObj = {
      divider: +dividerStr.slice(-2),
      onTrue: +ifTrueStr.slice(-2),
      onFalse: +ifFalseStr.slice(-2),
    };

    return new Monkey(id, items, operationObj, testObj, firstPart);
  });
};

// first part
// const monkeys = generateMonkeys(data);
// const rounds = 1000;
// for (let round = 0; round < rounds; round++) {
//   for (const monkey of monkeys) {
//     monkey.inspectItems(monkeys);
//   }
// }
// for (const m of monkeys) {
//   console.log(m.inspectedItems);
// }

// second part
const monkeys = generateMonkeys(data, false);
const rounds = 10_000;
const monkeysLcd = lcm(...monkeys.map((m) => m.testObj.divider));
for (let round = 0; round < rounds; round++) {
  for (const monkey of monkeys) {
    monkey.inspectItems(monkeys, monkeysLcd);
  }
}
for (const m of monkeys) {
  console.log(m.inspectedItems);
}
