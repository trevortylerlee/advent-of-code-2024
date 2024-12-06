import fs from "fs";

// 1. Get the two lists to compare

const fileContent = fs.readFileSync("input.txt", "utf-8");
const lines = fileContent.trim().split("\n");

let leftList = [];
let rightList = [];

lines.forEach((line) => {
  let parts = line.trim().split(/\s+/);
  let left = parts[0];
  let right = parts[1];
  leftList.push(left);
  rightList.push(right);
});

// console.log("leftList", leftList);
// console.log("rightList", rightList);

// 2. Order the two lists from small to large

const sortNumbers = (array) => {
  array.sort((a, b) => a - b);
  return array;
};

let sortedLeftList = sortNumbers(leftList);
let sortedRightList = sortNumbers(rightList);

// console.log("left", sortedLeftList);
// console.log("right", sortedRightList);

// 3. Get the absolute value between each pair

const getAbsoluteValue = (leftListNumber, rightListNumber) => {
  return Math.abs(leftListNumber - rightListNumber);
};

let totalDistance = 0;

for (let i = 0; i < sortedLeftList.length; i++) {
  let distance = getAbsoluteValue(sortedLeftList[i], sortedRightList[i]);
  totalDistance += distance;
  console.log(`added: ${distance}, total: ${totalDistance}`);
}

console.log("total distance: ", totalDistance);

// 4. Calculate the similarity score

let totalSimilarityScore = 0;

for (let i = 0; i < sortedLeftList.length; i++) {
  let currentLeftNumber = sortedLeftList[i];
  let numberOfOccurances = 0;

  for (let j = 0; j < sortedRightList.length; j++) {
    if (currentLeftNumber === sortedRightList[j]) {
      numberOfOccurances++;
    }
  }

  let similarityScore = currentLeftNumber * numberOfOccurances;
  totalSimilarityScore += similarityScore;
}

console.log(totalSimilarityScore);
