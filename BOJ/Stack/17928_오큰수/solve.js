const [n, input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

// function Solution(n, input) {
//   const numbers = input.split(" ").map((v) => +v);

//   const isBiggiest = (num) => {
//     const comparison = numbers.findIndex((compare) => compare > num);
//     return comparison !== -1 ? false : true;
//   };

//   let result = "";
//   numbers.forEach((num, idx) => {
//     if (isBiggiest(num)) return (result += "-1 ");

//     const arr = numbers.slice(idx + 1);
//     const ngm = arr.find((n) => n > num);

//     if (!ngm) return (result += "-1 ");
//     result += `${ngm} `;
//   });
//   console.log(result.trim());
// }

// Solution(n, input);

// 시간초과

// function Solution(n, input) {
//   const numbers = input.split(" ").map((v) => +v);

//   let result = "";
//   for (let i = 0; i < n; i++) {
//     const cur = numbers.shift();
//     const ngm = numbers.find((num) => num > cur);

//     if (!ngm) {
//       result += "-1 ";
//       continue;
//     }
//     result += `${ngm} `;
//   }
//   console.log(result.trim());
// }

// Solution(n, input);

function Solution(n, input) {
  const numbers = input.split(" ").map((v) => +v);
  const stack = [];
  const result = new Array(Number(n)).fill(-1);

  for (let i = 0; i < n; i++) {
    while (stack.length && numbers[i] > numbers[stack[stack.length - 1]]) {
      result[stack.pop()] = numbers[i];
    }
    stack.push(i);
  }
  console.log(result.join(" "));
}

Solution(n, input);
