const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

// function Solution(input) {
//   let result = "";
//   for (let line of input) {
//     const parenthesis = line.split("");

//     const stack = [];
//     while (parenthesis.length > 0) {
//       const cur = parenthesis.pop();

//       if (cur === ")") {
//         stack.push(cur);
//         continue;
//       }
//       if (cur === "(" && stack[0] === ")") {
//         stack.pop();
//       } else {
//         stack.push(cur);
//       }
//     }
//     if (stack.length > 0) result += "NO\n";
//     else result += "YES\n";
//   }
//   console.log(result.trim());
// }

// Solution(input);

// Solution 2

// function Solution(n, input) {
//   let result = "";
//   for (let i = 0; i < n; i++) {
//     let stack = 0;

//     for (let parenthesis of input[i]) {
//       stack += parenthesis === "(" ? 1 : -1;

//       if (stack < 0) break;
//     }

//     result += stack === 0 ? "YES\n" : "NO\n";
//   }
//   console.log(result.trim());
// }

// Solution(n, input);

// Solution 3

function Solution(n, input) {
  const result = [];

  const validation = (parenthesis) => {
    const validateResult = parenthesis.replace(/\(\)/g, "");

    if (parenthesis.length !== validateResult.length) {
      return validation(validateResult);
    }

    return parenthesis[0] === ")" || parenthesis[parenthesis.length - 1] === "("
      ? "NO"
      : "YES";
  };

  for (let i = 0; i < n; i++) {
    result.push(validation(input[i]));
  }

  console.log(result.join("\n"));
}

Solution(n, input);
