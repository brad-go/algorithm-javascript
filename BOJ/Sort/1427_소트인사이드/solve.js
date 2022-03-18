// 내 제출 - 제일 빠름

// const input = require("fs")
//   // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
//   .readFileSync("./input4.txt")
//   .toString()
//   .trim();

// function Solution(input) {
//   if (!input) return;
//   const seperatedNums = input.split("").map((v) => +v);
//   const sortedNums = seperatedNums.sort((a, b) => b - a);
//   console.log(sortedNums.join(""));
// }

// Solution(input);

// 선택 정렬 - 내림차순이니까 최댓값을 찾는 방법으로 구현, 메모리 제일 적게 소모

// const input = require("fs")
//   .readFileSync("./input4.txt")
//   .toString()
//   .trim()
//   .split("")
//   .map((v) => +v);

// function Solution(input) {
//   for (let i = 0; i < input.length; i++) {
//     let maxIdx = i;

//     for (let j = i + 1; j < input.length; j++) {
//       if (input[maxIdx] < input[j]) {
//         maxIdx = j;
//       }
//     }

//     if (maxIdx !== i) {
//       const max = input[maxIdx];
//       input[maxIdx] = input[i];
//       input[i] = max;
//     }
//   }
//   console.log(input.join(""));
// }

// Solution(input);

// 버블 정렬

// const input = require("fs")
//   .readFileSync("./input4.txt")
//   .toString()
//   .trim()
//   .split("")
//   .map((v) => +v);

// function Solution(input) {
//   for (let i = 0; i < input.length - 1; i++) {
//     for (let j = input.length - 1; j > i; j--) {
//       if (input[j] > input[j - 1]) {
//         const temp = input[j - 1];
//         input[j - 1] = input[j];
//         input[j] = temp;
//       }
//     }
//   }
//   console.log(input.join(""));
// }

// Solution(input);

// 병합정렬 - 속도는 sort()와 같은나 메모리를 가장 많이 소모

const input = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("")
  .map((v) => +v);

function Solution(input) {
  const merge = (left, right) => {
    const result = [];

    while (left.length && right.length) {
      if (left[0] > right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    return [...result, ...left, ...right];
  };

  const mergeSort = (arr) => {
    if (arr.length === 1) return arr;

    const midIdx = Math.floor(arr.length / 2);
    const left = arr.slice(0, midIdx);
    const right = arr.slice(midIdx);

    return merge(mergeSort(left), mergeSort(right));
  };

  console.log(mergeSort(input).join(""));
}

Solution(input);
