import fs from "fs";

let fileContent = fs.readFileSync("input.txt", "utf-8");

// let partOneTestString =
//   "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

// let partTwoTestString =
//   "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

//   [
//     'do',
//     index: 20,
//     input: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
//     groups: undefined
//   ]

const checkIfDont = (match) => {
  let start = match["index"] + 2;
  let modifiedString = fileContent.slice(start, start + 3);
  if (modifiedString === "n't") {
    return true;
  }

  return false;
};

const createEnabledArray = (dontArray, doArray) => {
  return [
    { enabled: true, index: 0 },
    ...dontArray.map((item) => ({ enabled: false, index: item.index })),
    ...doArray.map((item) => ({ enabled: true, index: item.index })),
  ].sort((a, b) => a.index - b.index);
};

const shouldPointsCount = (match, enabledArray) => {
  const filteredArray = enabledArray
    .filter((state) => state.index <= match.index)
    .sort((a, b) => b.index - a.index);
  let lastStateChange = filteredArray[0];
  return lastStateChange.enabled;
};

const checkMemory = (memory) => {
  let total = 0;
  let mulPattern = /mul\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
  let doPattern = /do/g;
  let mulMatches = [...memory.matchAll(mulPattern)];
  let doMatches = [...memory.matchAll(doPattern)];
  let dontArray = [];
  let doArray = [];

  for (let match of doMatches) {
    let result = checkIfDont(match);

    if (result) {
      dontArray.push(match);
    } else {
      doArray.push(match);
    }
  }

  let enabledArray = createEnabledArray(dontArray, doArray);

  for (let match of mulMatches) {
    let countPoints = shouldPointsCount(match, enabledArray);

    if (countPoints) {
      let x = parseInt(match[1]);
      let y = parseInt(match[2]);
      let product = x * y;
      total += product;
    }
  }

  return total;
};

console.log(checkMemory(fileContent));
