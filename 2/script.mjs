import fs from "fs";

const fileContent = fs.readFileSync("input.txt", "utf-8");
const lines = fileContent.trim().split("\n");

let totalSafeReports = 0;

let array = lines.map((line) => line.trim().split(/\s+/).map(Number));

const checkArraySafety = (array) => {
  const results = [];

  for (const line of array) {
    let result = isSafe(line);
    results.push(result);

    // if result is false, at least one level must be removed
    if (result) {
      totalSafeReports++;
    } else {
      if (secondChance(line)) {
        totalSafeReports++;
      }
    }
  }

  return results;
};

const secondChance = (array) => {
  for (let i = 0; i < array.length; i++) {
    // create a copy of the array and remove one element
    let modifiedArray = array.filter((_, index) => index !== i);

    let result = isSafe(modifiedArray);
    if (result) {
      return true;
    }
  }
  return false;
};

const isSafe = (array) => {
  const isIncreasing = array.every(
    (value, index) => index === 0 || value > array[index - 1],
  );

  const isDecreasing = array.every(
    (value, index) => index === 0 || value < array[index - 1],
  );

  // if not always increasing or always decreasing, return false
  if (!isIncreasing && !isDecreasing) {
    // console.log("not always increasing or always decreasing");
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    const difference = Math.abs(array[i] - array[i - 1]);

    if (difference === 0 || difference > 3) {
      // console.log("difference is either 0 or greater than 3");
      return false;
    }
  }

  // console.log(`Array deemed safe: ${array}`);
  return true;
};

console.log(checkArraySafety(array));
console.log(`total safe reports: ${totalSafeReports}`);
