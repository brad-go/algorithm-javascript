const p = require("fs").readFileSync("./input.txt").toString().trim();

function Solution(p) {
  const reverse = (str) => {
    return str
      .slice(1, -1)
      .split("")
      .map((s) => (s === "(" ? ")" : "("))
      .join("");
  };

  const convert = (p) => {
    if (!p.length) return "";

    // 괄호 문자열의 문자를 하나씩 탐색하면서 균형잡힌 괄호인지 체크하기
    let balance = 0;
    let pivot = 0;

    do {
      balance += p[pivot++] === "(" ? 1 : -1;
    } while (balance !== 0);

    // 증가된 pivot을 이용해 문자열을 잘라서 균형잡힌 괄호로 분할
    const u = p.slice(0, pivot);
    const v = convert(p.slice(pivot, p.length));

    // 올바른 문자열인지 확인해서 값을 return
    if (u[0] === "(" && u[u.length - 1] === ")") return u + v;
    else return "(" + v + ")" + reverse(u);
  };

  const answer = convert(p);
  console.log(answer);
}

Solution(p);

// 내 코드

// function Solution(p) {
//   const brackets = {
//     open: "(",
//     close: ")",
//   };

//   // 균형잡힌 괄호인지 체크하는 함수
//   const isBalanced = (p) => {
//     let open = 0;
//     let close = 0;

//     for (let i = 0; i < p.length; i++) {
//       if (p[i] === brackets.open) open++;
//       else close++;
//     }

//     return open === close;
//   };

//   // 올바른 괄호인지 체크하는 함수
//   const isCorrect = (p) => {
//     const stack = [];

//     for (let i = 0; i < p.length; i++) {
//       if (p[i] === brackets.open) stack.push(p[i]);
//       else stack.pop();
//     }

//     return stack.length === 0;
//   };

//   // 괄호를 u, v로 나누기
//   const seperateBrakets = (p) => {
//     for (let i = 0; i < p.length; i++) {
//       if (isBalanced(p.slice(0, i + 1)) && isBalanced(p.slice(i + 1))) {
//         return [p.slice(0, i + 1), p.slice(i + 1)];
//       }
//     }
//     return [p, ""];
//   };

//   // 괄호가 올바르지 않다면 변환하기
//   const convertBrakets = (p) => {
//     if (isCorrect(p)) return p;

//     const [u, v] = seperateBrakets(p);

//     if (isCorrect(u)) {
//       return u + convertBrakets(v);
//     } else {
//       let u2 = u
//         .slice(1, -1)
//         .split("")
//         .map((el) => (el === brackets.open ? brackets.close : brackets.open))
//         .join("");

//       let string = brackets.open + convertBrakets(v) + brackets.close + u2;

//       return string;
//     }
//   };

//   const answer = convertBrakets(p);
//   console.log(answer);
// }

// Solution(p);
